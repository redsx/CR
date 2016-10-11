const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const online = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    socket: String,
    createdAt: {
        type: Date, 
        default: Date.now()
    }
})
online.statics.findOneOnline = function (op) {
    return new Promise((resolve,reject) => {
        this.find(op,(err,rows) => {
            if(err) reject(err);
            resolve(rows[0]);
        })
    })
}
online.statics.findAll = function (op = {}) {
    return new Promise((resolve,reject) => {
        this.find(op,(err,rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}
online.statics.removeAll = function () {
    return new Promise((resolve,reject) => {
        this.remove({},function (err) {
            if(err) reject(err);
            resolve(null);
        })
    })
}
online.statics.removeOnline = function (op) {
    return new Promise((resolve,reject) => {
        this.remove(op,function (err,resault) {
            if(err) reject(err);
            resolve(resault);
        })
    })
}
online.statics.createOnline = function (user) {
    return new Promise((resolve,reject) => {
        this.create(user, (err,resault) => {
            if(err) reject(err);
            resolve(resault);
        })
    })
}
online.statics.updateAvatar = function (info) {
    return new Promise((resolve,reject) => {
        this.update({nickname:info.nickname},{avatar:info.avatar}, (err,resault)=>{
            if(err) reject(err);
            resolve(resault);
        })
    })
}
module.exports = mongoose.model('online',online);
