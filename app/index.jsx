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
    getRoomHistory, 
    changeUserInfo, 
    addPrivateMessage, 
    addCount, 
    setAudioSrc, 
    setAudioState, 
    setNotificationState, 
    setShieldUser, 
    setSpecialUser, 
    initStorageExpression,
    getActiveList,
    getRoomList,
    setListShow,
    searchRoom,
    changeRoom,
    addActiveItem,
    setBgImage,
    getRoomActiveInfo,
    searchUser,
    setLoadingState,
    setUserState,
    reconnect,
    logout
} from './actions'

import notification from './util/notification.js'
import favico from './util/favicoNotification.js'
import browser from './util/browser.js'
import api from './util/api.js'
import config from './plugins/config.js'
import Immutable from 'immutable'

favico.resetWhenDocVisibility();
notification.requestPermission();

const handleReadLocalSetting = (nickname) => {
    let storage = localStorage.getItem(nickname);
        storage = storage ? JSON.parse(storage) : {};
    let setting = storage.setting;
    if(setting){
        store.dispatch(setNotificationState(setting.h5Notification));
        store.dispatch(setAudioState(!!(setting.audioNotification)));
        store.dispatch(setShieldUser({
            user: setting.shield,
            isAdd: true
        }));
        store.dispatch(setBgImage(setting.bgImage));
        store.dispatch(setSpecialUser({
            user: setting.special,
            isAdd: true
        }));
    };
    if(storage.expressions){
        store.dispatch(initStorageExpression(storage.expressions));
    }
}
const handleInit = (info) => {
    store.dispatch(setLoadingState(true));
    getActiveList(info.token)(store.dispatch).then((res)=>{
        return getRoomList(info.token)(store.dispatch);
    }).then(() => {
        return getInitUserInfo(info)(store.dispatch);
    }).then((resault)=>{
        handleReadLocalSetting(resault.nickname);
        window.cr = new api(resault.nickname,function(message){store.dispatch(addMessage(message))});
        return changeRoom({curRoom: resault.curRoom,isPrivate: resault.isPrivate})(store.dispatch,store.getState);
    }).then(() => {
        store.dispatch(setLoadingState(false));
    }).catch((err) => {
        console.log(err);
        browserHistory.push('/login');
    })
}
const handleEnter = (nextState,replace) => {
    const token = localStorage.getItem('token');
    const device = browser.versions.mobile ? 'mobile' : 'PC';
    if(token){
        return handleInit({token,device});
    } else{
        replace({pathname: '/login'});
    }
}

socket.on('privateMessage', (message) => {
    const state = store.getState().toJS();
    if(message.type === 'textMessage'){
        if(!cr.filterMsg(message.content)){
            return;
        }
        message.content = cr.filterMsg(message.content);
    }
    if(state.setting.shield.indexOf(message.nickname) === -1){
        const audio = document.getElementById('audio1'),
              audioSpecial = document.getElementById('audio3'),
              avatar = message.avatar;
        message.room = message.nickname;
        if(state.pageState.listState !== 'activeList'){
            store.dispatch(setListShow('activeList'));
        }
        store.dispatch(addPrivateMessage(message));
        state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
        if(!state['activeList'][message.room]){
            store.dispatch(addActiveItem({
                roomName: message.room,
                avatar: message.avatar,
                isPrivate: true
            }))
        }
        if(document.hidden){
            favico.addBage();        
            if(state.setting.audioNotification){
                state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
            }    
            state.setting.h5Notification ? notification.showNotification(message.nickname,{
                body: message.type === 'pluginMessage' ? '[plugin]' : message.content,
                icon: message.avatar,
            }) : null;
        } else if(state.setting.audioNotification && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) === -1 ? audio.play() : audioSpecial.play();
        }
    }
});
socket.on('newMessage', (message) => {
    const state = store.getState().toJS();
    if(message.type === 'textMessage'){
        if(!cr.filterMsg(message.content)){
            return;
        }
        message.content = cr.filterMsg(message.content);
    }
    if(state.setting.shield.indexOf(message.nickname) === -1){
        const audio = document.getElementById('audio1'),
              audioSpecial = document.getElementById('audio3'),
              avatar = message.avatar,
              reg = new RegExp('@'+state.userState.nickname,'g');
        store.dispatch(addMessage(message));
        state.userState.curRoom === message.room ? null : store.dispatch(addCount(message.room));
        if(!state['activeList'][message.room]){
            store.dispatch(addActiveItem({
                roomName: message.room,
                avatar: state['roomList'][message.room]['avatar'],
                isPrivate: false
            }))
        }
        if(document.hidden){
            favico.addBage();
            if(state.setting.audioNotification){
                state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play() ;
            }
            state.setting.h5Notification && !(message.nickname === state.userState.nickname) ? notification.showNotification(message.nickname,{
                body:  message.type === 'pluginMessage' || message.nickname === config.PLUGIN_ROBOT ? '[plugin]' : message.content,
                icon: message.avatar,
            }) : null;
        } else if(!(message.nickname === state.userState.nickname) && state.setting.audioNotification && state.userState.curRoom !== message.room){
            state.setting.special.indexOf(message.nickname) !== -1 || reg.test(message.content) ? audioSpecial.play() : audio.play();
        }
    }
});
socket.on('forcedOffline',()=>{
    store.dispatch(logout());
    alert('账号在其他设备登录');
});
socket.on('disconnect',()=>{
    console.log('disconnect');
    const state = store.getState().toJS();
    store.dispatch(addMessage({
        content: '掉线重连中...',
        room: state.userState.curRoom,
        type: 'systemMessage'
    }));
})


// socket.on('connect', () => {
//     const state = store.getState().toJS();
//     // 用户状态暂定为logout、enter、offline、online，其中offline为断线重连时需要重新init，并标记为online状态
//         console.log('connect: ',state.userState.nickname);
// })

socket.on('reconnect_failed',()=>{
    console.log('重连失败');
})

socket.on('reconnect',()=>{
    const state = store.getState().toJS();
    console.log('断线重连成功');
    // offline为断线重连，需要重新init
    if(state.userState.state === 'offline'){
        const token = state.userState.token;  
        if(!token){
            return browserHistory.push('/login');
        }
        reconnect(token).then((() => {
            store.dispatch(setUserState('online'));
            return handleInit({token});
        })).catch((err) => {
            console.log(err);
            return browserHistory.push('/login');
        })
        
    }
    
})
socket.on('reconnecting',()=>{
    const userState = store.getState().get('userState').toJS();
    if(userState.state !== 'logout'){
        store.dispatch(setUserState('offline'));
    }
    console.log('重新连接...');
})

injectTapEventPlugin();
render(
    <Provider store={store}>
        <div>
            <Router history = {browserHistory}>
                <Route path = '/' component = {App} >
                    <IndexRoute component= {Index} onEnter = {(nextState,replace)=>handleEnter(nextState,replace)} />
                    <Route path= 'login' component= {Login} />
                    <Route path= 'signUp' component= {SignUp} />
                </Route>
            </Router>
        </div>
    </Provider>
    ,
    document.getElementById('App')
)
