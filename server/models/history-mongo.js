const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const history = new Schema({
    content: String,
    timestamp: Number,
    room: String,
    type: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    }
});
history.statics.findAll= function (op={}) {
    return new Promise((resolve,reject)=>{
        this.find(op).populate('owner').exec(function (err,rows) {
            if(err) reject(err);
            resolve(rows);
        })
    });
}
history.statics.findByRoom= function (op,limit) {
    return new Promise((resolve,reject)=>{
        this.find(op,null,limit).populate('owner').exec(function (err,rows) {
            if(err) reject(err);
            resolve(rows);
        })
    });
}
module.exports = mongoose.model('history',history);
