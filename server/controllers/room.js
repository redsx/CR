const Room = require('../models/room-mongo')
    , jwt = require('jsonwebtoken')
    , moment = require('moment')
    , User = require('../models/user-mongo')
    , listUtil = require('../util/list.js')
    , config = require('../config/cr-config')
    , JWT_KEY = require('../config/cr-config').JWT_KEY;
module.exports = {
    createRoom: function *(socket,info,cb) {
        let user = yield User.findOne({nickname: info.user});
        let room = yield Room.findOne({name: info.roomName});
        let count = yield Room.count({creater: user._id});
        if(count >= 3){
            return cb({
                isError: true,
                errMsg: '超出限制，用户最多能创建3个房间'
            })
        }
        if(user && !room){
            let room = new Room(Object.assign(
                {},
                {name: info.roomName},
                {creater: user._id, users:[user._id]},
                {avatar: 'http://cr.mdzzapp.com/images/expressions/' + config.AVATAR_ARR[parseInt(Math.random()*39)] + '.png'}
            ));
            user.rooms.push(room._id);
            user.save();
            room.save();
            socket.join(room.name);
            cb({
                isOk: true,
                msg: '成功创建房间',
                roomInfo: {
                    roomName: info.roomName,
                    avatar: room.avatar,
                    isPrivate: false
                }
            })
        } else{
            cb({
                isError: true,
                errMsg: '该房间已存在'
            })
        }
    },
    getRoomInfo: function *(roomName,cb){
        let room = yield Room.findOne({name: roomName}).populate('creater');
        if(room){
            cb({
                name: room.name,
                info: room.info,
                creater: room.creater.nickname,
                time: moment(room.createdAt).format('lll'),
                avatar: room.avatar
            })
        } else{
            cb({
                isError: true,
                errMsg: '没找到房间'
            })
        }
    },
    joinRoom: function *(socket,info,cb) {
        let user = yield User.findOne({nickname: info.nickname});
        let room = yield Room.findOne({name: info.roomName}) || [];
        if(user.rooms.indexOf(room._id) !== -1){
            return cb({
                ok: true,
                msg: '你已经加入' + info.roomName
            })
        } else if(room && user){
            user.rooms.push(room._id);
            room.users.push(user._id);
            yield room.save();
            yield user.save();
            socket.join(room.name)
            cb({
                ok: true,
                msg: '成功加入房间'
            })
        } else {
            return cb({
                isError: true,
                errMsg: '出错了，你加入的房间不存在' 
            })
        }
    },
    updateRoomInfo: function *(roomInfo,cb){
        let decode = jwt.verify(roomInfo.token,JWT_KEY);
        if(decode.user){
            let room = yield Room.findOne({name: roomInfo.name}).populate('creater');
            if(room){
                if(room.creater.nickname === decode.user){
                    roomInfo.info ? room.info = roomInfo.info : null;
                    roomInfo.avatar ? room.avatar = roomInfo.avatar : null; 
                    yield room.save();
                    cb({
                        isOk: true,
                        msg: '修改成功',
                        roomInfo: {
                            roomName: room.name,
                            avatar: room.avatar,
                            isPrivate: false
                        },
                    })
                } else{
                    cb({
                        isError: true,
                        errMsg: '权限不足'
                    })
                }
            } else{
                cb({
                    isError: true,
                    errMsg: '房间不存在'
                })
            }
        } else{
            cb({
                isError: true,
                errMsg: 'token解析错误' 
            })
        }
    },
    getRoomList: function *(token,cb){
        let decode = jwt.verify(token,JWT_KEY);
        if(decode){
            let user = yield User.findOne({nickname: decode.user}).populate('rooms');
            if(user){
                let userList = listUtil.getRoomList(user.rooms,'name');
                cb(userList);
            }
        } else{
            console.log('解析错误');
            cb({
                isError: true,
                errMsg:'token解析错误'
            });
        }
    },
    searchRoom: function *(key,cb){
        let list = yield Room.find({'name': new RegExp(key,'i')},null,{limit:20});
        if(list){
            list = listUtil.getRoomList(list,'name');
            cb(list);
        } else{
            cb({});
        }
    },
    getRoomHistory: function *(info,cb){
        let room = yield Room.findOne({name: info.roomName})
        .populate({
            path: 'histories', 
            populate: { path: 'owner' }, 
            match: {timestamp: {'$lt': info.timestamp}},
            options: {sort:'-timestamp',limit: info.limit}
        });
        if(room){
            let roomInfo = listUtil.getHistoryList(room.histories,'owner','room');
            cb({
                histories: roomInfo[info.roomName]
            })
        }
    },
    getRoomActiveInfo: function *(roomName,cb){
        //房间活跃用户设定为房间当前在线用户
        let room = yield Room.findOne({name: roomName}).populate('creater');
        let online = yield Room.findOne({name: roomName}).populate({path: 'users', populate: {path: 'online'}, options: {sort:'-lastOnlineTime',limit:30}});
        if(room && online){
            let onlineUsers = listUtil.selectOnlineUser(online.users);
            cb({
                active: onlineUsers,
                info: room.info,
                name: room.name,
                creater: room.creater ? room.creater.nickname : ''
            })
        }
    }
}