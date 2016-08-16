const wrapper = require('co-mysql'),
    mysql = require('mysql'),
    options = require('../config/mysql-config');

const pool = mysql.createPool(options),
    p = wrapper(pool);
p.query({
            sql:'select * from `user` where `nickname` = ?',
        }
        ,['123']).then(function (res) {
            console.log(res);
        })
module.exports = p;