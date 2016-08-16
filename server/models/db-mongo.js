const mongoose = require('mongoose');
const config = require('../config/mongo-config');

const db = mongoose.connect("mongodb://" + config.HOST + ":" + config.PORT + "/" + config.NAME);

module.exports = db;