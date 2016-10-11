const co = require('co')
    , online = require('../controllers/online')
    , user = require('../controllers/user')
    , message = require('../controllers/message')
    , room = require('../controllers/room')
    , private = require('../controllers/private')
    , connect = require('../controllers/connect');
const callbackError = function(cb,err){
    cb({
        isError:true,
        errMsg: '服务器开了个小差'
    });
    console.log(err);
}
module.exports = function (io) {
    io.on('connect',function (socket) {
        //设置TCP连接超时时间
        socket.on('login',(info,cb) => {
            console.log(info.nickname + 'login');
            co(user.verifyUser(info.nickname,info.password,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('signUp',(info,cb) => {
            co(user.createUser(info.nickname,info.password,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('getInfo',(info,cb) => {
            co(connect.init(info,socket,io,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        });
        socket.on('getOnlineUsers',(cb) => {
            co(online.onlineUsers(cb)).catch((err) =>{
               callbackError(cb,err);
            });
        });
        socket.on('getActiveList',(token,cb) => {
            co(connect.getActive(token,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('getRoomList',(token,cb) => {
            co(room.getRoomList(token,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('searchRoom',(key,cb) => {
            co(room.searchRoom(key,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('getRoomInfo',(roomName,cb) => {
            co(room.getRoomInfo(roomName,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('getRoomHistory',(info,cb) => {
            co(room.getRoomHistory(info,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('getPrivateHistory',(info,cb) => {
            // info{fromUser: String,toUser:String}
            co(private.getPrivateHistory(info,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('getRoomActiveInfo',(roomName,cb) => {
            co(room.getRoomActiveInfo(roomName,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('message',(msg,cb) => {
            co(message.saveMessage(msg,socket,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        });
        socket.on('privateMessage',(msg,cb)=>{
            co(message.savePrivateMessage(msg,socket,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        });
        socket.on('history',(room,cb) => {
            co(message.getHistoryMessage(room,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        });
        socket.on('getUserInfo',(nickname,cb) => {
            co(user.getUserInfo(nickname,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        });
        socket.on('updateUserInfo',(userInfo,cb) => {
            co(user.updateUserInfo(userInfo,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        });
        socket.on('changeAvatar',(info,cb) => {
            co(user.updateUserAvatar(info,io,cb)).catch((err) =>{
                callbackError(cb,err);
            });
        });
        socket.on('disconnect',() => {
            co(connect.leave(socket,io)).catch((err) => {
                callbackError(cb,err);
            });
        })
        socket.on('reconnect success',(token) => {
            co(connect.reconnect(token,io)).catch((err) =>{
                callbackError(cb,err);
            });
        })
        socket.on('createRoom',(roomInfo,cb) => {
            co(room.createRoom(socket,roomInfo,cb)).catch((err) => {
                callbackError(cb,err);
            })
        })
        socket.on('joinRoom',(info,cb) => {
            co(room.joinRoom(socket,info,cb)).catch((err) => {
                callbackError(cb,err);
            })
        })
        socket.on('updateRoomInfo',(info,cb) => {
            co(room.updateRoomInfo(info,cb)).catch((err) => {
                callbackError(cb,err);
            })
        })
        socket.on('searchUser',(info,cb) => {
            co(user.searchUser(info,cb)).catch((err) => {
                callbackError(cb,err);
            })
        })
    })
}