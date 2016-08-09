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
            if(deepCopy[action.user.nickname]){
                deepCopy[action.user.nickname].isOnline = deepCopy[action.user.nickname].isOnline + 1; 
            } else{
                deepCopy[action.user.nickname] = action.user;
            }
            return deepCopy;
        }
        case SET_LOGOUTUSER_INFO: {
            deepCopy[action.user].isOnline = deepCopy[action.user].isOnline - 1;
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