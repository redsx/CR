const request = require('request')
    , bluebird = require('bluebird')
    , User = require('../models/user-mongo')
    , Online = require('../models/online-mongo')
    , History = require('../models/history-mongo')
    , config = require('../config/cr-config');
module.exports = {
    getMessage: function *(message,socket,cb) {
        let history = {
            room:message.room,
            content:message.content,
            type:message.type
        };
        history.timestamp = new Date().getTime();
        message.timestamp = history.timestamp;
        let user = yield User.findOneUser({nickname:message.nickname});
        if(user){
            history.owner = user._id;
            let newHistory = new History(history);
            newHistory.save();
            socket.broadcast.to(message.room).emit('newMessage',message);
            console.log('成功存入消息');
            cb(message);
        } else{
            console.log('玩家不存在！');
            cb({isError:'玩家不存在！'});
        }
    },
    getPrivateMessage: function *(message,socket,cb) {
        let send = {
            nickname: message.nickname,
            content: message.content,
            timestamp: new Date().getTime(),
            room: message.room,
            type: message.type
        }
        if(message.room === config.ROBOT_NAME){
            cb(send);
            let post = JSON.stringify({
                key: config.ROBOT_KEY,
                info:message.content,
                userid:message.nickname
            });
            let reply = yield bluebird.promisify(request)({
                url: config.ROBOT_URL,
                method: 'post',
                body: post
            });
            reply = JSON.parse(reply.body);
            socket.emit('privateMessage',{
                nickname: config.ROBOT_NAME,
                content: reply.text,
                timestamp: new Date().getTime(),
                type: message.type
            });
        } else{
            let online = yield Online.findOneOnline({nickname:message.room});
            if(online){
                cb(send);
                socket.broadcast.to(online.socket).emit('privateMessage',send);
            } else{
                cb({isNotOnline:true});
            }
            
        }
    },
    getHistoryMessage: function *(room,cb){
        let histories = yield History.findByRoom({room:room},{sort:'-timestamp',limit:20});
        let messages = [],
            users = {};
        for(var i = 0; i < histories.length; i++){
            if(histories[i].owner){
                if(!users[histories[i].owner.nickname]){
                    users[histories[i].owner.nickname] = {
                        nickname: histories[i].owner.nickname,
                        avatar: histories[i].owner.avatar,
                        isOnline: 0
                    }
                }
                messages.unshift({
                    content: histories[i].content,
                    nickname: histories[i].owner.nickname,
                    room: histories[i].room,
                    timestamp: histories[i].timestamp,
                    type: histories[i].type
                });
            }
        }
        cb({
            messages: messages,
            users: users
        });
    }
}