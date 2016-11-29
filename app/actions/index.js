import io from 'socket.io-client'
import { browserHistory } from 'react-router'

// export const socket = io('http://mdzzapp.com:3000');
// export const socket = io('http://mdzzapp.com:3001');
export const socket = io('http://localhost:3000',{'force new connection': true});

export const LOAD_MESSAGE_LIMIT = 15;
// page UI state
export const SET_MENU_STATE = 'SET_MENU_STATE';
export const SET_EXPRESSION_STATE = 'SET_EXPRESSION_STATE';
export const ADD_EXPRESSION = 'ADD_EXPRESSION';
export const SET_LIST_STATE = 'SET_LIST_STATE';
export const SET_IMAGEEXP_STATE = 'SET_IMAGEEXP_STATE';
export const SET_SCROLL_STATE = 'SET_SCROLL_STATE';
export const SET_SNACKBAR_STATE = 'SET_SNACKBAR_STATE';
export const SET_SYS_SETTING_STATE = 'SET_SYS_SETTING_STATE';
export const SET_ROOM_INFO_STATE = 'SET_ROOM_INFO_STATE';
export const SET_CREATE_ROOM_STATE = 'SET_CREATE_ROOM_STATE';
export const SET_SEARCH_USER_STATE = 'SET_SEARCH_USER_STATE';
export const SET_MODAL_STATE = 'SET_MODAL_STATE';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';

//暂定编辑器显示方式，以后改异步加载
export const SET_RICHTEXT_STATE = 'SET_RICHTEXT_STATE';
export const setRichTextState = (richTextState) => {
    return {
        type: SET_RICHTEXT_STATE,
        richTextState
    }
}
//
export const setLoadingState = (loadingState) => {
    return {
        type: SET_LOADING_STATE,
        loadingState
    }
}
export const setModalState = (info) => {
    return {
        type: SET_MODAL_STATE,
        info
    }
}

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
            isShow: true
        }
    }
}
export const setExpressionHidden = () => {
    return {
        type: SET_EXPRESSION_STATE,
        expressionState:{
            isShow: false
        }
    }
}
export const  setExpressionState = (expressionState) => {
    return {
        type: SET_EXPRESSION_STATE,
        expressionState
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
export const setRoomInfoState = (state) => {
    return {
        type: SET_ROOM_INFO_STATE,
        state
    }
}
export const setCreateRoomState = (state) => {
    return {
        type: SET_CREATE_ROOM_STATE,
        state
    }
}
export const setSearchUserState = (state) => {
    return {
        type: SET_SEARCH_USER_STATE,
        state
    }
}
// init
export const SET_USER_INFO = 'SET_USER_INFO';
export const setUserInfo = (user) => {
    return {
        type: SET_USER_INFO,
        user
    }
}
export const getInitUserInfo = (info) => {
    return (dispatch,getState) => {
        return new Promise((resolve)=>{
            socket.emit('getInfo',info, (body) => {
                if(body.isError){
                    alert('用户已经在线');
                    browserHistory.push('/login');
                } else{
                    body.token = info.token;
                    dispatch(setUserInfo(body));
                    resolve(body);
                }
            })
        })
    }
}

// set personal info
export const LOGIN = 'LOGIN';
export const SET_USER_CURROOM = 'SET_USER_CURROOM';
export const SET_USER_STATE = 'SET_USER_STATE';
export const setUserState = (state) => {
    return {
        type: SET_USER_STATE,
        state
    }
}
export const setUserCurRoom = (roomInfo) => {
    return {
        type: SET_USER_CURROOM,
        roomInfo
    }
}

export const changeRoom = (roomInfo) => {
    return (dispatch,getState) => {
        const state = getState().toJS();
        let preRoom = state.userState.curRoom;
        dispatch(setUserCurRoom(roomInfo));
        if(roomInfo.isPrivate){
            if(!state['activeList'][roomInfo.curRoom]){
                //头像会有bug，暂时处理方式
                let privateUser = state['roomInfo']['active']?state['roomInfo']['active'][roomInfo.curRoom]:null;
                dispatch(addActiveItem({
                    roomName: roomInfo.curRoom,
                    avatar: privateUser ? privateUser.avatar : 'http://oajmk96un.bkt.clouddn.com/lolo.jpg',
                    isPrivate: true
                }));
            }
            let messages = state['privateMessages'][roomInfo.curRoom] || [];
            if(messages.length < 15){
                dispatch(setLoadingState(true));
                getPrivateHistory({
                    fromUser: roomInfo.curRoom,
                    toUser: state.userState.nickname,
                    messageCount: messages.length,
                    limit: LOAD_MESSAGE_LIMIT
                })(dispatch,getState)
                .then(
                    () => dispatch(setLoadingState(false))
                );
            }
        } else{
            if(!state['activeList'][roomInfo.curRoom]){
                let curRoom = state['roomList'][roomInfo.curRoom] || {};
                dispatch(addActiveItem({
                    roomName: roomInfo.curRoom,
                    avatar: curRoom.avatar,
                    isPrivate: false
                }));
            }
            let messages = state['messages'][roomInfo.curRoom] || [];
            dispatch(clearHistory(preRoom));
            dispatch(setLoadingState(true));
            getRoomActiveInfo(roomInfo.curRoom)(dispatch)
            .then((resault) => {
                if(messages.length < 15){
                    return getRoomHistory({
                        roomName: roomInfo.curRoom,
                        messageCount: messages.length,
                        limit: LOAD_MESSAGE_LIMIT
                    })(dispatch);
                }
                return ;
            })
            .then(
                () => dispatch(setLoadingState(false))
            )
        }
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
export const ADD_HISTORY_MESSAGE = 'ADD_HISTORY_MESSAGE';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';
export const ADD_PRIVATE_HISTORY_MESSAGE = 'ADD_PRIVATE_HISTORY_MESSAGE';

export const clearHistory = (room) => {
    return {
        type: CLEAR_HISTORY,
        room
    }
}
export const addMessage = (message) => {
    return {
        type:ADD_MESSAGE,
        message
    }
}
export const sendMessage = (message) => {
    return new Promise((resolve,reject)=>{
        socket.emit('message',message, (body) => {
            if(body.isError){
                 reject(body);
            } else{
                resolve(body);
            }
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
export const getRoomHistory = (info) => {
    return (dispatch,getState) => {
        return new Promise((resolve)=>{
            if(!info) {
                const state = getState().toJS();
                let roomName = state.userState.curRoom; 
                let messages = state['messages'][roomName] ? state['messages'][roomName] : [];
                info = {
                    roomName: roomName,
                    messageCount: messages.length,
                    limit: LOAD_MESSAGE_LIMIT
                }
            }
            socket.emit('getRoomHistory',info, (body,res) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    browserHistory.push('/login');
                } else{
                    let histories = body.histories || [];
                    let isloadAll = histories.length < LOAD_MESSAGE_LIMIT;
                    dispatch(addHistoryMessage(info.roomName,histories));
                    resolve(isloadAll);
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
export const addPrivateHistory = (room,messages) => {
    return {
        type: ADD_PRIVATE_HISTORY_MESSAGE,
        room,
        messages
    }
}
export const getPrivateHistory = (info) => {
    return (dispatch,getState) => {
        return new Promise((resolve) => {
            if(!info) {
                const state = getState().toJS();
                let fromUser = state.userState.curRoom; 
                let toUser = state.userState.nickname;
                let messages = state['privateMessages'][fromUser] ? state['privateMessages'][fromUser] : [];
                info = {
                    fromUser: fromUser,
                    toUser: toUser,
                    messageCount: messages.length,
                    limit: LOAD_MESSAGE_LIMIT
                }
            }
            socket.emit('getPrivateHistory',info,(body) =>{
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    reject(body);
                } else{
                    let histories = body.histories || [];
                    let isloadAll = histories.length < LOAD_MESSAGE_LIMIT;
                    dispatch(addPrivateHistory(info.fromUser,histories));
                    resolve(isloadAll);
                }
            })
        })
    }
}
// info card
export const SET_INFOCARD_STATE = 'SET_INFOCARD_STATE';
export const SHOW_INFO_CARD = 'SHOW_INFO_CARD';
export const SET_USER_CARD_INFO = 'SET_USER_CARD_INFO';
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
                    dispatch(setUserCardInfo(body));
                    dispatch(showInfoCard({
                        isShow: true,
                        mode: 'userCard'
                    }));
                    resolve();
                }
            })
        })
    }
}
export const setUserCardInfo = (info) => {
    return {
        type: SET_USER_CARD_INFO,
        info
    }
}
export const showInfoCard = (state) => {
    return {
        type: SHOW_INFO_CARD,
        state
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
export const addCount = (room, count = 1) => {
    return {
        type: ADD_BADGE_COUNT,
        count,
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
export const SET_BACKGROUND_IMAGE = 'SET_BACKGROUND_IMAGE';
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
export const setBgImage = (url) => {
    return {
        type: SET_BACKGROUND_IMAGE,
        url
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
    return (dispatch,getState) => {
        const state = getState().toJS();
        const token = state.userState.token;
        delete localStorage.token;
        socket.disconnect();
        socket.connect();
        browserHistory.push('/login');
    }
}
export const reconnert = (token) => {
    return new Promise((resolve, reject) => {
        socket.emit('reconnect success',token,(body) => {
            if(body.isError){
                reject(body);
            } else{
                resolve(body);
            }
        });
    });
}



//关于history的处理，action实在太长了，改起来太费劲，需要考虑如何解决
export const INIT_ROOM_HISTORIES = 'INIT_ROOM_HISTORIES';
export const INIT_PRIVATE_ROOM_HISTORIES = 'INIT_PRIVATE_ROOM_HISTORIES';
export const ADD_PRIVARE_HISTORY_MESSAGE = 'ADD_PRIVARE_HISTORY_MESSAGE';

export const initRoomHistory = (messages) => {
    return {
        type: INIT_ROOM_HISTORIES,
        messages
    }
}
export const initPrivateHistory = (messages) => {
    return {
        type: INIT_PRIVATE_ROOM_HISTORIES,
        messages
    }
}
// 初始化activeList
export const INIT_ACTIVE_LIST = 'INIT_ACTIVE_LIST';
export const ADD_ACTIVE_ITEM = 'ADD_ACTIVE_ITEM';
export const DELETE_ACTIVE_ITEM = 'DELETE_ACTIVE_ITEM';
export const initActiveList = (activeList) => {
    return {
        type: INIT_ACTIVE_LIST,
        activeList
    }
}
export const addActiveItem = (item) => {
    return {
        type: ADD_ACTIVE_ITEM,
        item
    }
}
export const deleteActiveItem = (item) => {
    return {
        type: DELETE_ACTIVE_ITEM,
        item
    }
}

const initBageCount = (dispatch,histories) => {
    for(let key in histories){
        if(key !== 'MDZZ'){
            dispatch(addCount(key,histories[key]['length']));
        }
    }
}
export const getActiveList = (token) => {
    return (dispatch) => {
        return new Promise((resolve,reject) => {
            socket.emit('getActiveList',token,(body)=>{
                if(body.isError){
                    browserHistory.push('/login');
                } else{
                    initBageCount(dispatch,body.roomHistories);
                    initBageCount(dispatch,body.privateHistories);
                    dispatch(initRoomHistory(body.roomHistories));
                    dispatch(initPrivateHistory(body.privateHistories));
                    dispatch(initActiveList(body.activeList));
                    resolve(body);
                }
            })
        })
    }
}
export const joinRoom = (info) => {
    return (dispatch) => {
        return new Promise((resolve) => {
            socket.emit('joinRoom',info,(body) => {
                resolve(body);
            })
        })
    }
    
}

export const SET_ROOM_CARD_INFO = 'SET_ROOM_CARD_INFO';
export const getRoomInfo = (roomName) => {
    return (dispatch) => {
        return new Promise((resolve) => {
            socket.emit('getRoomInfo',roomName,(body) => {
                dispatch(setRoomCardInfo(body));
                dispatch(showInfoCard({
                    isShow: true,
                    mode: 'roomCard'
                }));
            })
        })
    }
} 
export const setRoomCardInfo = (info) => {
    return {
        type: SET_ROOM_CARD_INFO,
        info
    }
}
export const updateRoomInfo = (info) => {
    return (dispatch) => {
        return new Promise((resolve) => {
            socket.emit('updateRoomInfo',info,(body) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    reject(body);
                } else{
                    if(body.isOk){
                        dispatch(setSnackbarState({
                            content: body.msg,
                            open: true
                        }));
                        getRoomList(info.token)(dispatch);
                        dispatch(addActiveItem(body.roomInfo,body.roomInfo.roomName));
                        resolve(body);
                    }
                }
            })
        })
    }
}
// roomList

export const SET_ROOM_LIST = 'SET_ROOM_LIST';
export const setRoomList = (roomList) => {
    return {
        type: SET_ROOM_LIST,
        roomList
    }
}
export const getRoomList = (token) => {
    return (dispatch) => {
        return new Promise((resolve,reject) => {
            socket.emit('getRoomList',token,(body)=>{
                if(body.isError){
                    reject(body);
                } else{
                    dispatch(setRoomList(body));
                    resolve(body);
                }
                
            })
        })
    }
}



//search room
export const INIT_SEARCH_ROOM = 'INIT_SEARCH_ROOM';
export const initSearchRoom = (list) => {
    return {
        type: INIT_SEARCH_ROOM,
        list
    }
}
export const searchRoom = (key) => {
    return (dispatch) => {
        return new Promise((resolve,reject) => {
            socket.emit('searchRoom',key,(body) => {
                dispatch(initSearchRoom(body));
            })
        })
    }
}

export const createRoom = (info) => {
    return (dispatch) =>{
        return new Promise((resolve,reject) => {
            socket.emit('createRoom',info,(body) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    reject(body);
                } else{
                    if(body.isOk){
                        dispatch(addActiveItem(body.roomInfo));
                        dispatch(setSnackbarState({
                            content: body.msg,
                            open: true
                        }));
                    }
                    resolve(body);
                }
            })
        })
    }
    
}

//
export const SET_ROOM_INFO = 'SET_ROOM_INFO'
export const refreshRoomActiveInfo = (info) => {
    return {
        type: SET_ROOM_INFO,
        info
    }
}
export const getRoomActiveInfo = (roomName) => {
    return (dispatch) => {
        return new Promise((resolve,reject) => {
            socket.emit('getRoomActiveInfo',roomName,(body) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    reject(body);
                } else{
                    dispatch(refreshRoomActiveInfo(body));
                    resolve(body);
                }
            })
        })
    }
}
export const SET_SEARCH_USER = 'SET_SEARCH_USER';
export const setSearchUserList = (list) => {
    return {
        type: 'SET_SEARCH_USER',
        list
    }
}

export const searchUser = (info) => {
    return (dispatch) => {
        return new Promise((resolve,reject) => {
            socket.emit('searchUser',info,(body) => {
                if(body.isError){
                    dispatch(setSnackbarState({
                        content: body.errMsg,
                        open: true
                    }));
                    reject(body);
                } else{
                    dispatch(setSearchUserList(body));
                }
            })
        })
    }
}

export const getRichTextContent = (info) => {
    return new Promise((resolve,reject) => {
        socket.emit('getRichTextContent',info,(body) => {
            if(body.isError){
                    reject(body);
                } else{
                    resolve(body);
                }
        })
    })
}