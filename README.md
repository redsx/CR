## CHATROOM—CR

在线地址：[http://cr.mdzzapp.com](http://cr.mdzzapp.com)

### 最新内容

- 上传新版koa后端代码
- 前端改用socket.io
- 优化拖拽组件
- 解决移动端声音无法播放问题

### 下版内容预告
- 使用immutable.js
- 增加设置界面
- login与signup整合到react中

### 功能列表

- 实现群聊私聊
- 实现图片表情包
- 实现机器人陪聊
- 实现桌面提醒，音效提醒
- 实现特别关注
- 实现屏蔽功能
- 实现图片黏贴发送功能

### 技术栈
- react
- redux
- bable
- webpack

### store结构说明

```
|--pageState // 控制页面ui状态
|--userState // 存放用户登录信息
|--onlineUsers // 存放在线用户信息
|--messages // 存放消息
|--privateMessages // 存放私聊消息
|--setting // 存放设置
|--imageSlide //存放图片信息，查看图片使用
|--storageExpressions //存放表情包
```
### 移动端效果展示

机器人：

![x1](./app/images/x1.jpg)

登录&注册界面：

![x2](./app/images/x2.png)

菜单栏：

![x3](./app/images/x3.png)

好友设置：

![x4](./app/images/x4.png)

个人设置：

![x5](./app/images/x5.png)

图片查看

![x6](./app/images/news-1.png)

图片表情包

 ![x7](./app/images/news-2.png)

title提醒

 ![x8](./app/images/news-0.png)


### 安装

1. cd CR
2. npm install
3. npm client-start 打包前端
4. npm start 开启server，访问 http://localost:3000

** tips:

1. 在安装使用之前先修改数据库信息 mongodb：`server/config/mongo-config.js`，mysql暂不支持
2. 如果遇到bcrypt无法install可用bcrypt-nodejs代替


