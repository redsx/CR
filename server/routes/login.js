const user = require('../controllers/user');
module.exports = function (app,router) {
    router.get('/login',user.renderLongin);
    router.get('/signUp',user.renderSignUp);
    router.post('/login',user.verifyUser);
    router.post('/signUp',user.createUser)
    app.use(router.allowedMethods());
    app.use(router.routes())
}
