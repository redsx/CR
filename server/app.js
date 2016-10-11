const app = require('koa')()
  , koa = require('koa-router')()
  , co = require('co')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')    
  , bluebird = require('bluebird')
  , onerror = require('koa-onerror');

const index = require('./routes/index')
   , db = require('./models/db-mongo')
   , Online = require('./models/online-mongo')
   , Room = require('./models/room-mongo')    
   , User = require('./models/user-mongo')
   , History = require('./models/history-mongo')
   , message = require('./controllers/message')
   , users = require('./routes/users')
   , login = require('./routes/login')
   , crConfig = require('./config/cr-config')
   , config = require('./config/config');



co(function *() {
    let initRoom = yield Room.findOne({name: crConfig.INIT_ROOM});
    if(!initRoom){
        let room = new Room({
            info: crConfig.INIT_ROOM_INFO,
            name: crConfig.INIT_ROOM
        })
        room.save();
    } else{
      console.log('初始房间已存在');
    }
    yield Online.removeAll();
}).catch((err)=>{
    console.log(err);
});


app.use(function *(next){
    if(!this.config){
        this.config = config;
    }
    yield next;
})
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
koa.use('/', index.routes(), index.allowedMethods());
// mount root routes  
// login(app,koa);
app.use(koa.routes());
onerror(app);
app.on('error', function(err, ctx){
  console.log('err message:',err.message);
  // logger.error('server error', err, ctx);
});

module.exports = app;
