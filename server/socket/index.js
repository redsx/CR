const co = require('co')
    , online = require('../controllers/online')
    , user = require('../controllers/user')
    , message = require('../controllers/message')
    , connect = require('../controllers/connect');
module.exports = function (io) {
    io.on('connect',function (socket) {
        socket.on('getInfo',(token,cb) => {
            co(connect.init(token,socket,io,cb)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        });
        socket.on('getOnlineUsers',(cb) => {
            co(online.onlineUsers(cb)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        });
        socket.on('message',(msg,cb) => {
            co(message.getMessage(msg,socket,cb)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        });
        socket.on('privateMessage',(msg,cb)=>{
            co(message.getPrivateMessage(msg,socket,cb)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        });
        socket.on('history',(room,cb) => {
            co(message.getHistoryMessage(room,cb)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        });
        socket.on('getUserInfo',(nickname,cb) => {
            co(user.getUserInfo(nickname,cb)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        });
        socket.on('changeAvatar',(info,cb) => {
            co(user.changeUserInfo(info,io,cb)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        });
        socket.on('disconnect',() => {
            co(connect.leave(socket,io)).catch((err) =>{
                console.log(err);
            });
        })
        socket.on('reconnect_success',(token)=>{
            console.log('断线重连');
            co(connect.reconnect(token)).catch((err) =>{
                cb({isError:'服务器开了个小差'});
                console.log(err);
            });
        })
    })
}