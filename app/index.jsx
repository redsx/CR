import 'babel-polyfill'

import React from 'react'
import { browserHistory, hashHistory, Router, Route, IndexRoute } from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import Index from './pages/index/'

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

//test Immutable
import Immutable from 'immutable'

favico.resetWhenDocVisibility();
notification.requestPermission();

const handleInit = (token) => {
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
            store.dispatch(setAudioState(!!(setting.audioNotification)));
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
}
const handleEnter = (nextState,replace) => {
    const token = localStorage.getItem('token');
    if(token){
        return handleInit(token);
    } else{
        replace({pathname: '/login'});
    }
}
const handleLeave = () => {
    const token = localStorage.getItem('token');
    if(token){
        socket.emit('reconnect success',token);
    }
}
socket.on('privateMessage', (message) => {
    const state = store.getState().toJS();
    if(state.setting.shield.indexOf(message.nickname) === -1){
        const audio = document.getElementById('audio1'),
              audioSpecial = document.getElementById('audio3'),
              avatar = state.onlineUsers[message.nickname].avatar;
        message.room = message.nickname;
        store.dispatch(addPrivateMessage(message));
        state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
        if(document.hidden){
            favico.addBage();        
            if(state.setting.audioNotification){
                state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
            }    
            state.setting.h5Notification ? notification.showNotification(message.nickname,{
                body: message.content,
                icon: state.onlineUsers[message.nickname].avatar,
            }) : null;
        } else if(state.setting.audioNotification && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
        }
    }
});
socket.on('newMessage', (message) => {
    const state = store.getState().toJS();
    if(state.setting.shield.indexOf(message.nickname) === -1){
        const audio = document.getElementById('audio1'),
              audioSpecial = document.getElementById('audio3'),
              avatar = state.onlineUsers[message.nickname].avatar,
              reg = eval('/'+'@'+state.userState.nickname+'/g');
        store.dispatch(addMessage(message));
        state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
        if(document.hidden){
            favico.addBage();
            if(state.setting.audioNotification){
                state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play() ;
            }
            state.setting.h5Notification && !(message.nickname === state.userState.nickname) ? notification.showNotification(message.nickname,{
                body: message.content,
                icon: state.onlineUsers[message.nickname].avatar,
            }) : null;
        } else if(!(message.nickname === state.userState.nickname) && state.setting.audioNotification && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play();
        }
    }
});

socket.on('changeInfo', (info)=>{
    store.dispatch(changeUserInfo(info));
})
socket.on('user joined', (user) => {
    const state = store.getState().toJS();
    const audio = document.getElementById('audio2');
    store.dispatch(addOnlineUser(user));
    if(document.hidden){
        if(state.setting.audioNotification){
            audio.play() ;
        }
    } 
})
socket.on('user leaved', (user) => {
    store.dispatch(deleteLogoutUser(user.nickname));
})
socket.on('connect', () => {
    
})
socket.on('disconnect',()=>{
    console.log('disconnect');
    const state = store.getState().toJS();
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
        return browserHistory.push('/login')
    }
    socket.emit('reconnect success',token);
    handleInit(token);
})
socket.on('reconnecting',()=>{
    reconnect++;
    console.log('重新连接#('+reconnect+')');
})

injectTapEventPlugin();
render(
    <Provider store={store}>
        <div>
            <Router history = {browserHistory}>
                <Route path = '/' component = {App} >
                    <IndexRoute component= {Index} onEnter = {(nextState,replace)=>handleEnter(nextState,replace)} onLeave = {()=>handleLeave()}/>
                    <Route path= 'login' component= {Login} />
                    <Route path= 'signUp' component= {SignUp} />
                </Route>
            </Router>
        </div>
    </Provider>
    ,
    document.getElementById('App')
)
