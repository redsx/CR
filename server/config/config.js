//本地/开发环境配置
var local = require('./local');
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    //使用local.js中的配置覆盖config.js中的配置
    config = Object.assign({},this.config,local);
}