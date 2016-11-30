const jwt = require('jsonwebtoken')
    , moment = require('moment')
    , User = require('../models/user-mongo')
    , crConfig = require('../config/cr-config')
    , Online = require('../models/online-mongo')
    , Room = require('../models/room-mongo')
    , History = require('../models/history-mongo')
    , Private = require('../models/private-mongo')
    , bluebird = require('bluebird')
    , listUtil = require('../util/list.js')
    , JWT_KEY = require('../config/cr-config').JWT_KEY;

module.exports = {
    init: function *(info,socket,io,cb) {
        let decode = jwt.verify(info.token,JWT_KEY);
        if(decode){
            let user = yield User.findOne({nickname: decode.user}).populate('online').populate('rooms');
            // v2.2 修改上线方式
            if(user.online){
                console.log('forcedOffline: ',user.nickname);
                socket.broadcast.to(user.online.socket).emit('forcedOffline');
            }
            let roomList = listUtil.getRoomNameArr(user.rooms);
            let onliner = new Online({socket: socket.id,user: user._id});
            user.device = info.device;
            user.online = onliner._id;
            let saveOnline = yield onliner.save();
            let saveUser = yield user.save();
            if(saveOnline && saveUser){
                socket.join(socket.id);
                listUtil.joinRooms(socket,roomList);
                let userInfo = {
                    nickname: user.nickname,
                    id: socket.id,
                    avatar: user.avatar,
                    isOnline: 1,
                    curRoom: user.lastRoom || crConfig.INIT_ROOM,
                    isPrivate: user.isPrivate
                };
                cb(userInfo);
            } else {
                console.log('不存在的用户');
                cb({
                    isError: true,
                    errMsg:'不存在的用户'
                });
            }
        } else{
            console.log('解析错误');
            cb({
                isError: true,
                errMsg:'token解析错误'
            });
        }
    },
    getActive: function *(token,cb){
        let decode = jwt.verify(token,JWT_KEY);
        if(decode){
            let user = yield User.findOne({nickname:decode.user});
            if(user){
                let lastOnlineTime = user.lastOnlineTime;
                let userList = yield Private.find({timestamp: {$gt: lastOnlineTime},to: user.nickname},null,{sort:'-timestamp'}).populate('from');
                let roomList = yield User.findOne({nickname: user.nickname}).populate({path: 'rooms',match: {lastMessage: {$gt: lastOnlineTime}}});
                roomList = roomList.rooms;
                let roomNameArr = listUtil.getRoomNameArr(roomList);
                let histories = yield History.find({timestamp: {$gt: lastOnlineTime}, room: {$in: roomNameArr}},null,{sort:'-timestamp',limit:20}).populate('owner');
                let activeRoom  = listUtil.getRoomList(roomList);
                let activeUser = listUtil.getUserList(userList);
                let activeList = Object.assign({},activeRoom,activeUser);
                let roomHistories = listUtil.getHistoryList(histories,'owner','room');
                let privateHistories = listUtil.getPrivateList(userList,'from','from');
                cb({
                    activeList: activeList || {},
                    roomHistories: roomHistories || {},
                    privateHistories: privateHistories || {}
                });
            } else{
                cb({
                    isError: true,
                    errMsg: '用户不存在'
                });
            }
        } else{
            console.log('token解析错误');
            cb({
                isError: true,
                errMsg:'token解析错误'
            });
        }
        
    },
    leave: function *(socket,io) {
        let online = yield Online.findOne({socket:socket.id}).populate('user','nickname');
        if(online){
            console.log(online.user.nickname,'离线');
            User.updateInfo({
                nickname: online.user.nickname,
                onlineState: 'offline',
                lastOnlineTime: new Date().getTime()
            });
            io.emit('user leaved',{nickname:online.user.nickname});
        }
        let res = yield Online.removeOnline({socket:socket.id});
    },
    reconnect: function *(token,cb) {
        let decode = jwt.verify(token,JWT_KEY);
        if(decode){
            let user = yield User.findOne({nickname: decode.user}).populate('online');
            if(user.online){
                yield user.online.remove()
                user.onlineState = 'offline';
                user.lastOnlineTime = new Date().getTime();
            }
                let userSave =  yield user.save();
                if(userSave){
                    console.log('[reconnect]user leave:',user.nickname);
                    return cb({isSuccess: true});
                } else{
                    console.log('[reconnect]user leave error:',user.nickname);
                    return cb({isError: true});
                }
            }
    }
}