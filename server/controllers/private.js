const User = require('../models/user-mongo')
    , Private = require('../models/private-mongo');
module.exports = {
    getPrivateHistory: function *(info,cb) {
        let privateHistories = [];
        let fromUser = yield User.findOne({nickname: info.fromUser});
        let toUser = yield User.findOne({nickname: info.toUser});
        if(fromUser && toUser){
            let privateMessage = yield Private.find({
                $or: [{from: fromUser._id, to: toUser.nickname},{from: toUser._id, to: fromUser.nickname}],
                timestamp: {'$lt': info.timestamp}
            },null, {sort:'-timestamp',limit: info.limit}).populate('from');
            if(privateMessage){
                for(let i = 0; i < privateMessage.length; i++){
                    privateHistories.unshift({
                        avatar: privateMessage[i]['from']['avatar'],
                        content: privateMessage[i]['content'],
                        nickname: privateMessage[i]['from']['nickname'],
                        timestamp: privateMessage[i]['timestamp'],
                        type: privateMessage[i]['type']
                    })
                }
            }
        }
        cb({histories: privateHistories});
    } 
}