const User = require('../models/user-mongo')
    , Online = require('../models/online-mongo')
    , bcrypt = require('bcrypt')
    , bluebird = require('bluebird')
    , moment = require('moment')
    , jwt = require('jsonwebtoken')
    , config = require('../config/cr-config');
module.exports = {
    renderLongin: function *() {
        yield this.render('login',{
            login: true
        })
    },
    renderSignUp: function *(next) {
        yield this.render('login',{
            login: false
        })
    },
    createUser: function *() {
        let body = this.request.body;
        let salt = yield bluebird.promisify(bcrypt.genSalt)(10);
        body.password = yield bluebird.promisify(bcrypt.hash)(body.password,salt);
        let user = yield User.findOneUser({nickname:body.nickname});
        if(user) return this.body = {isNicknameErr:true}
        let resault  = yield User.create(body);
        if(resault){ 
            let verify = jwt.sign({
                    user:body.nickname,
                    exp:Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30
                },'nsmdzz');
            return this.body = {jwt:verify};
        }
        return this.body = {isNicknameErr:true};
    },
    verifyUser: function *() {
        let body = this.request.body;
        let user = yield User.findOneUser({nickname:body.nickname});
        if(!user) return this.body = {isNicknameErr:true};
        let resault = yield bluebird.promisify(bcrypt.compare)(body.password,user.password);
        if(resault){ 
            let verify = jwt.sign({
                    user:body.nickname,
                    exp:Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30
                },'nsmdzz');
            return this.body = {jwt:verify};
        }
        return this.body = {isPasswordErr:true};
    },
    getUserInfo: function *(nickname,cb) {
        if(nickname === config.ROBOT_NAME){
            cb({
                nickname: config.ROBOT_NAME,
                avatar: config.ROBOT_AVATAR,
                time: '传说中的zz机器人'
            })
        } else{
            let user = yield User.findOneUser({nickname:nickname});
            if(user){
                cb({
                    nickname: user.nickname,
                    avatar: user.avatar,
                    time: moment(user.createdAt).format('lll')
                })
            } else{
                console.log('查找的玩家不存在');
                cb({isError:'查找的玩家不存在'});
            }
        }
    },
    changeUserInfo: function *(info,io,cb) {
        let resault = yield User.updateAvatar(info);
        if(resault.ok){
            yield Online.updateAvatar(info);
            io.emit('changeInfo',info);
            cb(info);
        } else{
            console.log('更改信息出错！');
            cb({isError:'更改信息出错！'});
        }
    }
}