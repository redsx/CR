const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    nickname: String,
    password: String,
    info: String,
    email: String,
    sex: String,
    onlineState: String,
    lastOnlineTime: {
        type: Number,
        default: Date.now()
    },   
    device: {
        type: String,
        default: 'PC'
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'room'
    }],
    avatar: {
        type: String, 
        default: 'http://oajmk96un.bkt.clouddn.com/lolo.jpg'
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    online: {
        type: Schema.Types.ObjectId,
        ref: 'online'
    },
})

user.statics.findOneUser = function (op) {
    return new Promise((resolve,reject) => {
        this.find(op, (err,rows) => {
            if(err) reject(err);
            resolve(rows[0]);
        })
    })
}
user.statics.findAll = function (op={}) {
    return new Promise((resolve,reject) => {
        this.find(op, (err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}
user.statics.createUser = function (user) {
    return new Promise((resolve,reject) => {
        this.create(user, (err,resault) => {
            if(err) reject(err);
            resolve(resault);
        })
    })
}
user.statics.updateAvatar = function (info) {
    return new Promise((resolve,reject) => {
        this.update({nickname:info.nickname},{avatar:info.avatar}, (err,resault)=>{
            if(err) reject(err);
            resolve(resault);
        })
    })
}
user.statics.updateInfo = function (info) {
    return new Promise((resolve,reject) => {
        this.update({nickname:info.nickname},info, (err,resault)=>{
            if(err) reject(err);
            resolve(resault);
        })
    })
}
module.exports = mongoose.model('user',user);