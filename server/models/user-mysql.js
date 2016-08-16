const db = require('./db-mysql');
module.exports = {
    find: function *() {
        yield user = db.query({
            sql:'select * from `user` where `id` = ?',
        },['123']);
        return user;
    }
}