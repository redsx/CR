const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const private = new Schema({
    content: String,
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    to: String,    
    timestamp: Number,
    type: String
});
private.statics.findAll= function (op={}) {
    return new Promise((resolve,reject)=>{
        this.find(op).populate('owner').exec(function (err,rows) {
            if(err) reject(err);
            resolve(rows);
        })
    });
}
private.statics.findByRoom= function (op,limit) {
    return new Promise((resolve,reject)=>{
        this.find(op,null,limit).populate('owner').exec(function (err,rows) {
            if(err) reject(err);
            resolve(rows);
        })
    });
}
module.exports = mongoose.model('private',private);
