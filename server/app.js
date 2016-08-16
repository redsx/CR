const app = require('koa')()
  , koa = require('koa-router')()
  , co = require('co')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

const index = require('./routes/index')
   , db = require('./models/db-mongo')
   , Online = require('./models/online-mongo')    
   , message = require('./controllers/message')
   , users = require('./routes/users')
   , login = require('./routes/login')
   , crConfig = require('./config/cr-config')
   , config = require('./config/config');


co(function *() {
  yield Online.removeAll();
  yield Online.createOnline({
    nickname:crConfig.ROBOT_NAME,
    socket:'robot',
    avatar:crConfig.ROBOT_AVATAR
  });
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
  // console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());
// mount root routes  
login(app,koa);
app.use(koa.routes());
onerror(app);
app.on('error', function(err, ctx){
  console.log('err message:',err.message);
  logger.error('server error', err, ctx);
});

module.exports = app;
