const jwt = require('jsonwebtoken')
    , User = require('../models/user-mongo')
    , Online = require('../models/online-mongo')
    , bluebird = require('bluebird');

module.exports = {
    init: function *(token,socket,io,cb) {
        let decode = jwt.verify(token,'nsmdzz');
        if(decode){
            let online = yield Online.findOneOnline({nickname:decode.user});
            if(online){
                console.log('玩家已经在线');
                cb({isError:'玩家已经在线'});
            } else{
                let user = yield User.findOneUser({nickname:decode.user});
                if(user){
                    let resault = yield Online.createOnline({
                        nickname: user.nickname,
                        avatar: user.avatar,
                        socket: socket.id
                    });
                    console.log('创建在线用户：',user.nickname);
                    socket.join(socket.id);
                    socket.join('MDZZ');
                    let userInfo = {
                        nickname: user.nickname,
                        id: socket.id,
                        avatar: user.avatar,
                        curRoom: 'MDZZ'
                    };
                    io.emit('user joined',userInfo);
                    cb(userInfo);
                } else{
                    console.log('不存在的玩家');
                    cb({isError:'不存在的玩家'});
                }
            }
        } else{
            console.log('解析错误');
            cb({isError:'解析错误'});
        }
    },
    leave: function *(socket,io) {
        let online = yield Online.findOneOnline({socket:socket.id});
        if(online){
            console.log(online.nickname,'离线');
            io.emit('user leaved',{nickname:online.nickname});
        }
        let res = yield Online.removeOnline({socket:socket.id});
    },
    reconnect: function *(token) {
        let decode = jwt.verify(token,'nsmdzz');
        if(decode){
            yield Online.removeOnline({nickname:decode.user});
        }
    }
}