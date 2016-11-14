## 基于react的在线实时聊天室

在线地址：[http://cr.mdzzapp.com](http://cr.mdzzapp.com)

### 最新内容

- 新增插件系统（基于 [https://github.com/blackmiaool/jquery-image-explode](https://github.com/blackmiaool/jquery-image-explode)）

### 基础功能

- 创建用户、登入登出、群聊、私聊、历史纪录
- 创建群组、加入群组功能、用户搜索、群组搜索
- 图片发送、收藏表情、图片幻灯片浏览、下载图片
- 个人信息查看、修改
- 桌面提醒、声音提醒、title提醒
- 个人设置屏蔽、特别关注等
- 系统设置音效、全屏，自定义背景，桌面提醒等


### 效果展示

![x3](./app/images/show.jpeg)

### 安装

```
git clone https://github.com/redsx/CR.git
cd CR
npm install
npm run-script client-start //打包前端
npm start //开启server，访问 http://locahost:3000
```

#### tips:
1. 运行程序前先检查你是否安装mongodb、nodejs(v6.0以上)
1. 如果你mongodb端口号不是`54321`,请在`npm start` 之前修改文件`./server/config/mongo-config.js` PORT为你mongodb端口号
2. 如果遇到bcrypt无法install可用bcrypt-nodejs代替，替换后函数参数会有略微不同，在`./server/controller/user.js`文件中已注释说明
### 下版内容

- <del>准备使用RN开发安卓版</del>
- 代码发送功能
