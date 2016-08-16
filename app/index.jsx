import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './containers/App.js'

import store from './store'

import {
    io,
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

io.socket.on('privateMessage', (message) => {
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
            state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
        } else if(!state.setting.audio.isClose && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
        }
    }
});
io.socket.on('message', (message) => {
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
            state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play() ;
        } else if(!(message.nickname === state.userState.nickname) && !state.setting.audio.isClose && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play();
        }
    }
});

io.socket.on('changeInfo', (info)=>{
    store.dispatch(changeUserInfo(info));
})
io.socket.on('login', (user) => {
    // console.log('login:',user.nickname);
    store.dispatch(addOnlineUser(user));
})
io.socket.on('logout', (user) => {
    // console.log('logout:',user.nickname);
    store.dispatch(deleteLogoutUser(user.nickname));
})
io.socket.on('connect', () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location = '/login';
    }
    getHistoryMessage('MDZZ')(store.dispatch).then((resault)=>{
        return getInitOnlineUser()(store.dispatch);
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
io.socket.on('disconnect', () => {
    console.log('disconnect');
})
injectTapEventPlugin();
render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('App')
)
