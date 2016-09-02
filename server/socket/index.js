const co = require('co')
    , online = require('../controllers/online')
    , user = require('../controllers/user')
    , message = require('../controllers/message')
    , connect = require('../controllers/connect');
module.exports = function (io) {
    io.on('connect',function (socket) {
        //设置TCP连接超时时间
        socket.on('login',(info,cb) => {
            console.log(info.nickname + 'login');
            co(user.verifyUser(info.nickname,info.password,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        })
        socket.on('signUp',(info,cb) => {
            co(user.createUser(info.nickname,info.password,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        })
        socket.on('getInfo',(token,cb) => {
            co(connect.init(token,socket,io,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('getOnlineUsers',(cb) => {
            co(online.onlineUsers(cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('message',(msg,cb) => {
            co(message.getMessage(msg,socket,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('privateMessage',(msg,cb)=>{
            co(message.getPrivateMessage(msg,socket,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('history',(room,cb) => {
            co(message.getHistoryMessage(room,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('getUserInfo',(nickname,cb) => {
            co(user.getUserInfo(nickname,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('updateUserInfo',(userInfo,cb) => {
            co(user.updateUserInfo(userInfo,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('changeAvatar',(info,cb) => {
            co(user.updateUserAvatar(info,io,cb)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        });
        socket.on('disconnect',() => {
            co(connect.leave(socket,io)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        })
        socket.on('reconnect success',(token)=>{
            co(connect.reconnect(token,io)).catch((err) =>{
                cb({
                    isError:true,
                    errMsg: '服务器开了个小差'
                });
                console.log(err);
            });
        })
    })
}