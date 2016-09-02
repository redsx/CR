import io from 'socket.io-client'
import { browserHistory } from 'react-router'

// export const socket = io('http://mdzzapp.com:3000');
// export const socket = io('http://mdzzapp.com:3001');
export const socket = io('http://localhost:3000');

// page UI state
export const SET_MENU_STATE = 'SET_MENU_STATE';
export const SET_EXPRESSION_STATE = 'SET_EXPRESSION_STATE';
export const ADD_EXPRESSION = 'ADD_EXPRESSION';
export const SET_LIST_STATE = 'SET_LIST_STATE';
export const SET_IMAGEEXP_STATE = 'SET_IMAGEEXP_STATE';
export const SET_SCROLL_STATE = 'SET_SCROLL_STATE';
export const SET_SNACKBAR_STATE = 'SET_SNACKBAR_STATE';
export const SET_SYS_SETTING_STATE = 'SET_SYS_SETTING_STATE';
export const setMenuState = (menuState) => {
    return {
        type: SET_MENU_STATE,
        menuState
    }
}
export const setExpressionShow = () => {
    return {
        type: SET_EXPRESSION_STATE,
        expressionState:{
            moment: 0,
            paused: false,
            reverse: false,
            isShow: true
        }
    }
}
export const setExpressionHidden = () => {
    return {
        type: SET_EXPRESSION_STATE,
        expressionState:{
            moment: 0,
            paused: false,
            reverse: true,
            isShow: false
        }
    }
}

export const addExpression = (emoji) => {
    return {
        type: ADD_EXPRESSION,
        expression: {
            timestamp: new Date().getTime(),
            emoji
        }
    }
}
export const setListShow = (isShow) => {
    return {
        type: SET_LIST_STATE,
        isShow
    }
}
export const setImageExpState = (isShow) => {
    return {
        type: SET_IMAGEEXP_STATE,
        isShow
    }
}
export const setScrollState = (isNeedScroll) => {
    return {
        type: SET_SCROLL_STATE,
        isNeedScroll
    }
}
export const setSnackbarState = (state) => {
    return {
        type: SET_SNACKBAR_STATE,
        state
    }
}
export const setSystemSettingState = (state) => {
    return {
        type: SET_SYS_SETTING_STATE,
        state
    }
}
// init
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_INITONLINEUSER_INFO = 'SET_INITONLINEUSER_INFO';
export const setUserInfo = (user) => {
    return {
        type: SET_USER_INFO,
        user
    }
}
export const getInitUserInfo = (token) => {
    return (dispatch,getState) => {
        return new Promise((resolve)=>{
            socket.emit('getInfo',token, (body) => {
                if(body.isError){
                    alert('用户已经在线');
                    browserHistory.push('/login');
                } else{
                    body.isPrivate = false; 
                    dispatch(setUserInfo(body));
                    resolve(body);
                }
            })
        })
    }
}
export const setInitOnlineUser = (onlineUsers) => {
    return {
        type: SET_INITONLINEUSER_INFO,
        onlineUsers
    }
}
export const getInitOnlineUser = () => {
    return (dispatch) => {
        return new Promise((resolve)=>{
            socket.emit('getOnlineUsers',(body) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    browserHistory.push('/login');
                } else{
                    dispatch(setInitOnlineUser(body));
                }
                resolve();
            })
        })
    }
}
// set users info
export const ADD_ONLINEUSER_INFO = 'ADD_ONLINEUSER_INFO';
export const SET_LOGOUTUSER_INFO = 'SET_LOGOUTUSER_INFO';
export const ADD_HISTORY_USER_INFO = 'ADD_HISTORY_USER_INFO';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
export const addOnlineUser = (user) => {
    return {
        type: ADD_ONLINEUSER_INFO,
        user
    }
}
export const changeUserInfo = (user)=>{
    return {
        type: CHANGE_USER_INFO,
        user
    }
}
export const deleteLogoutUser = (user) => {
    return {
        type: SET_LOGOUTUSER_INFO,
        user
    }
}
export const addHistoryUser = (users) => {
    return {
        type: ADD_HISTORY_USER_INFO,
        users
    }
}
// set personal info
export const LOGIN = 'LOGIN';
export const SET_USER_CURROOM = 'SET_USER_CURROOM';

export const setUserCurRoom = (roomInfo) => {
    document.title = roomInfo.curRoom;
    return {
        type: SET_USER_CURROOM,
        roomInfo
    }
}
export const updateUserInfo = (userInfo) => {
    return new Promise((resolve) => {
        socket.emit('updateUserInfo',userInfo,(resault) => {
            if(resault.isError){
                setSnackbarState({
                    open: true,
                    content: res.errMsg
                })
            } else{
                resolve(resault);
            }
        })
    })
}
//message
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD__PRIVATE_MESSAGE = 'ADD_PRIVATE_MESSAGE';
export const GET_HISTORY_MESSAGE = 'GET_HISTORY_MESSAGE';
export const ADD_HISTORY_MESSAGE ='ADD_HISTORY_MESSAGE';
export const addMessage = (message) => {
    return {
        type:ADD_MESSAGE,
        message
    }
}
export const sendMessage = (message) => {
    return new Promise((resolve)=>{
        socket.emit('message',message, (body) => {
            // dispatch(addMessage(body));
            resolve(body);
        })
    })
}

export const addHistoryMessage = (room,messages) => {
    return {
        type: ADD_HISTORY_MESSAGE,
        room,
        messages
    }
}
export const getHistoryMessage = (room) => {
    return (dispatch,getState) => {
        return new Promise((resolve)=>{
            socket.emit('history',room, (body,res) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    browserHistory.push('/login');
                } else{
                    dispatch(addHistoryUser(body.users))
                    dispatch(addHistoryMessage(room,body.messages))
                    resolve('get history');
                }
                
            })
        })
    }
}

export const addPrivateMessage = (message) => {
    return {
        type:ADD__PRIVATE_MESSAGE,
        message
    }
}
export const sendPrivateMessage = (message) => {
    return new Promise((resolve)=>{
        socket.emit('privateMessage',message, (body) => {
            if(!body.isNotOnline && !body.isError){
                resolve(body);
            } else{
                alert('玩家不在线，离线消息即将上线，敬请期待');
            }
        })
    })
}


// info card
export const SET_INFOCARD_STATE = 'SET_INFOCARD_STATE';
export const SHOW_INFO_CARD = 'SHOW_INFO_CARD';
export const HIDDEN_INFO_CARD = 'HIDDEN_INFO_CARD';
export const GET_USER_INFO = 'GET_USER_INFO';
export const getUserInfo = (nickname) => {
    return (dispatch,getState) => {
        const state = getState().toJS();
        dispatch(setSnackbarState({
            content: '获取'+nickname+'信息中',
            autoHideDuration: 1000,
            open: true
        }));
        return new Promise((resolve)=>{
            socket.emit('getUserInfo',nickname, (body) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                } else{
                    body.isShow = true;
                    dispatch(showInfoCard(body));
                    resolve();
                }
            })
        })
    }
}
export const showInfoCard = (user) => {
    return {
        type: SHOW_INFO_CARD,
        user
    }
}
export const hiddenInfoCard = () => {
    return {
        type: HIDDEN_INFO_CARD,
    }
}
export const changeAvatar = (info) => {
    return new Promise((resolve)=>{
        socket.emit('changeAvatar', info, (body)=>{
            resolve(body);
        })
    })
}
// badge
export const ADD_BADGE_COUNT = 'ADD_BADGE_COUNT';
export const CLEAR_BADGE_COUNT = 'CLEAR_BADGE_COUNT';
export const addCount = (room) => {
    return {
        type: ADD_BADGE_COUNT,
        room
    }
}
export const clearCount = (room) => {
    return {
        type: CLEAR_BADGE_COUNT,
        room
    }
}
//setting
export const SET_AUDIO_STATE = 'SET_AUDIO_STATE';
export const SET_NOTIFICATION_STATE = 'SET_NOTIFICATION_STATE';
export const SET_SPECIAL_USER = 'SET_SPECIAL_USER';
export const SET_SHIELD_USER = 'SET_SHIELD_USER';
export const setAudioState =  (state) => {
    return {
        type: SET_AUDIO_STATE,
        state
    }
}
export const setNotificationState = (state) => {
    return {
        type: SET_NOTIFICATION_STATE,
        state
    }
}
export const setSpecialUser = (setting) => {
    return {
        type: SET_SPECIAL_USER,
        setting
    }
}

export const setShieldUser = (setting) => {
    return {
        type: SET_SHIELD_USER,
        setting
    }
}
export const storageSetting = () => {
    return (dispatch,getState) => {
        const state = getState().toJS();
        if( typeof localStorage === 'object'){
            let storage = {};
            storage.setting = state.setting;
            storage.expressions = state.storageExpressions;
            storage = JSON.stringify(storage);
            localStorage.setItem(state.userState.nickname,storage);
        }
    }
}

// image Slide
export const SET_SLIDE_STATE = 'SET_SLIDE_STATE';
export const SET_SLIDE_ARR = 'SET_SLIDE_ARR';
export const setSlideState = (isShow) => {
    return {
        type: SET_SLIDE_STATE,
        isShow
    }
}
export const setSlideArr = (slideArr) => {
    return {
        type: SET_SLIDE_ARR,
        slideArr
    }
}
export const findSlideArr = (index) => {
    return (dispatch,getState) => {
        let arr = [-1,-1,-1];
        const state = getState().toJS();
        const history = state.userState.isPrivate ? state.privateMessages[state.userState.curRoom] : state.messages[state.userState.curRoom];
        arr[1] = {
            index:index,
            image: history[index].content
        };
        for(let i = index - 1; i > -1; i--){
            if(history[i].type === 'imageMessage'){
                arr[0] = {
                    index:i,
                    image: history[i].content
                };
                break;
            }
        }
        for(let j = index + 1; j < history.length; j++){
            if(history[j].type === 'imageMessage'){
                arr[2] = {
                    index:j,
                    image: history[j].content
                };
                break;
            }
        }
        dispatch(setSlideArr(arr));
    }
}
export const switchImage = (btn) => {
    return (dispatch,getState) => {
        const state = getState().toJS();
        const history = state.userState.isPrivate ? state.privateMessages[state.userState.curRoom] : state.messages[state.userState.curRoom];
        let arr = state.imageSlide.slideArr;
        if(btn === 'pre'){
            arr.pop();
            for(let i = arr[0].index - 1; i > -1; i--){
                if(history[i].type === 'imageMessage'){
                    arr.unshift({
                        index:i,
                        image: history[i].content
                    });
                    break;
                }
            }
            arr.length < 3? arr.unshift(-1):null;
        } else{
            arr.shift();
            for(let j = arr[1].index + 1; j < history.length; j++){
                if(history[j].type === 'imageMessage'){
                    arr.push({
                        index: j,
                        image: history[j].content
                    });
                    break;
                }
            }
            arr.length < 3? arr.push(-1):null;
        }
        dispatch(setSlideArr(arr));
    }
}
//  expression store
export const ADD_STORAGE_EXPRESSION = 'ADD_STORAGE_EXPRESSION';
export const DELETE_STORAGE_EXPRESSION = 'DELETE_STORAGE_EXPRESSION';
export const INIT_STORAGE_EXPRESSION = 'INIT_STORAGE_EXPRESSION';
export const initStorageExpression = (expressions) => {
    return {
        type: INIT_STORAGE_EXPRESSION,
        expressions
    }
}
export const addStorageExpression = (expression) => {
    return {
        type: ADD_STORAGE_EXPRESSION,
        expression
    }
}
export const deleteStorageExpression = (expression) => {
    return {
        type: DELETE_STORAGE_EXPRESSION,
        expression
    }
}

//登录&注册&登出处理
export const login = (nickname,password)=>{
    return new Promise((resolve,reject) => {
        socket.emit('login',{nickname,password},(info)=>{
            resolve(info);
        })
    })
}
export const signUp = (nickname,password)=>{
    return new Promise((resolve,reject) => {
        socket.emit('signUp',{nickname,password},(info)=>{
            resolve(info);
        })
    })
}
export const logout = () => {
    //  借用重连事件将online表中的用户删除达到离线效果，socket并未断开
    socket.emit('reconnect success',localStorage.token); 
    delete localStorage.token;
    browserHistory.push('/login');
}
