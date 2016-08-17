import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './containers/App.js'

import store from './store'

import {
    socket,
    getInitUserInfo, 
    getInitOnlineUser, 
    addOnlineUser, 
    deleteLogoutUser, 
    addMessage, 
    getHistoryMessage, 
    changeUserInfo, 
    addPrivateMessage, 
    addCount, 
    setAudioSrc, 
    setAudioState, 
    setNotificationState, 
    setShieldUser, 
    setSpecialUser, 
    initStorageExpression
} from './actions'

import notification from './actions/notification.js'
import favico from './actions/favicoNotification.js'

favico.resetWhenDocVisibility();
notification.requestPermission();

socket.on('privateMessage', (message) => {
    console.log('get private message:',message);
    const state = store.getState();
    if(state.setting.shield.indexOf(message.nickname) === -1){
        const audio = document.getElementById('audio1'),
              audioSpecial = document.getElementById('audio3'),
              avatar = state.onlineUsers[message.nickname].avatar;
        message.room = message.nickname;
        store.dispatch(addPrivateMessage(message));
        state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
        if(document.hidden){
            favico.addBage();            
            state.setting.h5Notification ? notification.showNotification(message.nickname,{
                body: message.content,
                icon: (store.getState()).onlineUsers[message.nickname].avatar,
            }) : null;
            if(!state.setting.audio.isClose){
                state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
            }
        } else if(!state.setting.audio.isClose && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
        }
    }
});
socket.on('newMessage', (message) => {
    console.log('get new message',message);
    const state = store.getState();
    if(state.setting.shield.indexOf(message.nickname) === -1){
        const audio = document.getElementById('audio1'),
              audioSpecial = document.getElementById('audio3'),
              avatar = state.onlineUsers[message.nickname].avatar,
              reg = eval('/'+'@'+state.userState.nickname+'/g');
        store.dispatch(addMessage(message));
        state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
        if(document.hidden){
            favico.addBage();
            state.setting.h5Notification && !(message.nickname === state.userState.nickname) ? notification.showNotification(message.nickname,{
                body: message.content,
                icon: (store.getState()).onlineUsers[message.nickname].avatar,
            }) : null;
            if(!state.setting.audio.isClose){
                state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play() ;
            }
        } else if(!(message.nickname === state.userState.nickname) && !state.setting.audio.isClose && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play();
        }
    }
});

socket.on('changeInfo', (info)=>{
    console.log('change info:',info);
    store.dispatch(changeUserInfo(info));
})
socket.on('user joined', (user) => {
    console.log('user joined:',user.nickname);
    // store.dispatch(addMessage({
    //     content: user.nickname+'加入了',
    //     room: 'MDZZ',
    //     type: 'systemMessage'
    // }));
    store.dispatch(addOnlineUser(user));
})
socket.on('user leaved', (user) => {
    console.log('user leaved:',user.nickname);
    // store.dispatch(addMessage({
    //     content: user.nickname+'离开了',
    //     room: 'MDZZ',
    //     type: 'systemMessage'
    // }));
    store.dispatch(deleteLogoutUser(user.nickname));
})
socket.on('connect', () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location = '/login';
    }
    getHistoryMessage('MDZZ')(store.dispatch).then((resault)=>{
        return getInitOnlineUser()(store.dispatch)
    }).then((resault)=>{
        return getInitUserInfo(token)(store.dispatch);
    }).then((resault)=>{
        let storage = localStorage.getItem(resault.nickname);
        storage = storage ? JSON.parse(storage) : {};
        let setting = storage.setting;
        if(setting){
            store.dispatch(setNotificationState(setting.h5Notification));
            if(setting.audio){
                store.dispatch(setAudioSrc(setting.audio.src));
                store.dispatch(setAudioState(!!(setting.audio.isClose)));
            }
            store.dispatch(setShieldUser({
                user: setting.shield,
                isAdd: true
            }));
            store.dispatch(setSpecialUser({
                user: setting.special,
                isAdd: true
            }));
        };
        if(storage.expressions){
            store.dispatch(initStorageExpression(storage.expressions));
        }
    })
})
socket.on('disconnect',()=>{
    console.log('disconnect');
    const state = store.getState();
    store.dispatch(addMessage({
        content: '掉线重连中...',
        room: state.userState.curRoom,
        type: 'systemMessage'
    }));
})
let reconnect = 0;
socket.on('reconnect_failed',()=>{
    console.log('重连失败');
})

socket.on('reconnect',()=>{
    console.log('断线重连成功');
    const token = localStorage.getItem('token');
    if(!token){
        window.location = '/login';
    }
    socket.emit('reconnect_success',token);
})
socket.on('reconnecting',()=>{
    reconnect++;
    console.log('重新连接#('+reconnect+')');
})

injectTapEventPlugin();
render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('App')
)
