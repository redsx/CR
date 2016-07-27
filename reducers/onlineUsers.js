import R from 'ramda'

import { SET_INITONLINEUSER_INFO, ADD_ONLINEUSER_INFO, SET_LOGOUTUSER_INFO, ADD_HISTORY_USER_INFO, CHANGE_USER_INFO } from '../actions'
export default function onlineUsers(state={},action) {
    let deepCopy = R.clone(state);    
    switch (action.type) {
        case SET_INITONLINEUSER_INFO: {
            return Object.assign({},deepCopy,action.onlineUsers);
        }
        case ADD_ONLINEUSER_INFO: {
            let obj = {};
            obj[action.user.nickname] =  action.user;
            return Object.assign({},deepCopy,obj);
        }
        case SET_LOGOUTUSER_INFO: {
            deepCopy[action.user].isOnline = false;
            return deepCopy;
        }
        case ADD_HISTORY_USER_INFO: {
            let users = R.clone(action.users);
            return Object.assign({},users,deepCopy);
        }
        case CHANGE_USER_INFO: {
            (deepCopy[action.user.nickname]).avatar = action.user.avatar;
            return deepCopy;
        }
        default: {
            return state;
        }
    }
}