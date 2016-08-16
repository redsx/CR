const Online = require('../models/online-mongo');
module.exports = {
    onlineUsers: function *(cb) {
        let users = yield Online.findAll();
        if(users){
            let onlineUsers = {};
            for(var i = 0; i < users.length ; i++){
                onlineUsers[users[i].nickname] = {
                    nickname: users[i].nickname,
                    avatar: users[i].avatar,
                    isOnline: 1
                }
            }
            cb(onlineUsers);
        } else{
            console.log('获取在线玩家列表错误');
            cb({isError:'获取在线玩家列表错误'});
        }
    }
}