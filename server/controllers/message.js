const request = require('request')
    , bluebird = require('bluebird')
    , User = require('../models/user-mongo')
    , Online = require('../models/online-mongo')
    , History = require('../models/history-mongo')
    , Private = require('../models/private-mongo')
    , RichText = require('../models/richtext-mongo')
    , Room = require('../models/room-mongo')
    , config = require('../config/cr-config');
module.exports = {
    saveMessage: function *(message,socket,cb) {
        // if(message.type === 'richTextMessage')
        let history = {
            room: message.room,
            content: message.content.slice(0,150),
            type: message.type
        };
        history.timestamp = new Date().getTime();
        message.timestamp = history.timestamp;
        let user = yield User.findOneUser({nickname:message.nickname});
        if(user){
            message.avatar = user.avatar;
            history.owner = user._id;
            //用timestamp＋userId确定唯一的richtext
            if(message.type === 'richTextMessage') {
                let title = message.title || '无标题';
                let richtext = new RichText({
                    content: message.content,
                    title: title,
                    owner: user._id,
                    timestamp: message.timestamp,
                });
                yield richtext.save();
                history.content = title;
                message.content = title;              
            }
            let newHistory = new History(history);
            let room = yield Room.findOne({name: message.room});
            if(room){
                room.histories.push(newHistory._id);
                room.lastMessage = history.timestamp;
                yield newHistory.save();
                yield room.save();
                socket.broadcast.to(message.room).emit('newMessage',message);
                console.log('成功存入消息');
                cb(message);
            } else{
                console.log('房间不存在！');
                cb({
                    isError: true,
                    errMsg:'房间不存在！'
                });
            }
        } else{
            console.log('玩家不存在！');
            cb({
                isError: true,
                errMsg:'玩家不存在！'
            });
        }
    },
    savePrivateMessage: function *(message,socket,cb) {
        let send = {
            nickname: message.nickname,
            content: message.content,
            timestamp: new Date().getTime(),
            room: message.room,
            type: message.type
        }
        
        if(message.room === config.ROBOT_NAME){
            this.robotMessage(send,cb);
        } else{
            let toUser = yield User.findOne({nickname: message.room}).populate('online');
            let fromUser = yield User.findOne({nickname: message.nickname});
            send.avatar = fromUser.avatar;
            if(message.type === 'richTextMessage') {
                let title = message.title || '无标题';
                let richtext = new RichText({
                    content: send.content,
                    title: message.title,
                    owner: fromUser._id,
                    timestamp: send.timestamp,
                });
                yield richtext.save();
                send.content = title;
            }
            if(toUser.online){
                console.log('message.js toUser 63:',toUser);
                socket.broadcast.to(toUser.online.socket).emit('privateMessage',send);
            }
            let privateMessage = new Private({
                content: message.content,
                from: fromUser._id,
                to: send.room,    
                timestamp: send.timestamp,
                type: send.type
            });

            yield privateMessage.save();
            cb(send);
        }
    },
    robotMessage: function *(send,cb){
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
            avatar: config.ROBOT_AVATAR,
            content: reply.text,
            timestamp: new Date().getTime(),
            type: message.type
        });
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
                    avatar: histories[i].owner.avatar,
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