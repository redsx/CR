const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const room = new Schema({
    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String, 
        default: 'http://oajmk96un.bkt.clouddn.com/lolo.jpg'
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    creater: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    histories: [{
        type: Schema.Types.ObjectId,
        ref: 'history'
    }],
    lastMessage: Number,
    info: {
        type: String,
        default: '群主没有留下任何公告'
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    }
});
// room.statics.createRoom = function (room) {
//     return new Promise((resolve,reject) => {
//         this.create(room, (err,resault) => {
//             if(err) reject(err);
//             resolve(resault);
//         })
//     })
// }
room.statics.findAll= function (op = {}) {
    return new Promise((resolve,reject)=>{
        this.find(op).populate('owner').exec(function (err,rows) {
            if(err) reject(err);
            resolve(rows);
        })
    });
}
room.statics.findByRoom= function (op,limit) {
    return new Promise((resolve,reject)=>{
        this.find(op,null,limit).populate('owner').exec(function (err,rows) {
            if(err) reject(err);
            resolve(rows);
        })
    });
}
module.exports = mongoose.model('room',room);
