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
    createUser: function *(nickname,password,cb) {
        let salt = yield bluebird.promisify(bcrypt.genSalt)(10);
        password = yield bluebird.promisify(bcrypt.hash)(password,salt);
        let user = yield User.findOneUser({nickname: nickname});
        if(user) {
            return cb({
                isError: true,
                isNicErr: true,
                errMsg: '用户已存在'
            });
        }
        let resault  = yield User.create({
            nickname: nickname,
            password: password
        });
        if(resault){ 
            let verify = jwt.sign({
                    user: nickname,
                    exp:Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30
                },'nsmdzz');
            return cb({jwt:verify});
        }
        return cb({
            isError: true,
            errMsg: '服务器开了个小差'
        });
    },
    verifyUser: function *(nickname,password,cb) {
        let user = yield User.findOneUser({nickname: nickname});
        if(!user) {
            return cb({
                isError: true,
                isNicErr: true,
                errMsg: '用户不存在'
            });
        }
        let resault = yield bluebird.promisify(bcrypt.compare)(password,user.password);
        if(resault){ 
            let verify = jwt.sign({
                    user: nickname,
                    exp:Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30
                },'nsmdzz');
            return cb({jwt:verify});
        }
        return cb({
            isError: true,
            isPwdErr: true,
            errMsg: '密码错误'
        });
    },
    getUserInfo: function *(nickname,cb) {
        if(nickname === config.ROBOT_NAME){
            cb({
                nickname: config.ROBOT_NAME,
                avatar: config.ROBOT_AVATAR,
                email: '10086@mdzz.com',
                time: '传说中的zz机器人',
                info: '传说中的zz机器人',
                sex: '男'
            })
        } else{
            let user = yield User.findOneUser({nickname:nickname});
            if(user){
                cb({
                    nickname: user.nickname,
                    avatar: user.avatar,
                    time: moment(user.createdAt).format('lll'),
                    email: user.email || '未知',
                    info: user.info || '...',
                    sex: user.sex || '未知'
                })
            } else{
                console.log('查找的玩家不存在');
                cb({
                    isError:true,
                    errMsg: '查找的玩家不存在'
                });
            }
        }
    },
    updateUserInfo: function *(userInfo,cb){
        let resault = yield User.updateInfo(userInfo);
        if(resault.ok){
            cb({ok:1});
        } else{
            console.log('更改信息出错！');
            cb({
                isError:true,
                errMsg: '更改信息出错！'
            });
        }
    },
    updateUserAvatar: function *(info,io,cb) {
        let resault = yield User.updateAvatar(info);
        if(resault.ok){
            yield Online.updateAvatar(info);
            io.emit('changeInfo',info);
            cb(info);
        } else{
            console.log('更改信息出错！');
            cb({
                isError:true,
                errMsg: '更改信息出错！'
            });
        }
    }
}