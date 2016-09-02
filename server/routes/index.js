const router = require('koa-router')();

router.get('*', function *(next) {
  yield this.render('index');
});

module.exports = router;
