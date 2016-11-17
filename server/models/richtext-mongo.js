const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const richtext = new Schema({
    content: String,
    timestamp: Number,
    title: {
        type: String, 
        default: '无标题'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
});
module.exports = mongoose.model('richtext',richtext);
