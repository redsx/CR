import Immutable from 'immutable'

import { SET_INITONLINEUSER_INFO, ADD_ONLINEUSER_INFO, SET_LOGOUTUSER_INFO, ADD_HISTORY_USER_INFO, CHANGE_USER_INFO } from '../actions'

let defaultState = Immutable.fromJS({});

export default function onlineUsers(state = defaultState,action) {
    switch (action.type) {
        case SET_INITONLINEUSER_INFO: {
            let onlineUsers = Immutable.fromJS(action.onlineUsers);
            return state.merge(onlineUsers);
        }
        case ADD_ONLINEUSER_INFO: {
            let user = state.get(action.user.nickname);
            if(user){
                return state.setIn([user.get('nickname'),'isOnline'],1);
            } else{
                let newUser = Immutable.fromJS(Object.assign({},action.user,{isOnline:1}));
                return state.set(action.user.nickname,newUser);
            }
        }
        case SET_LOGOUTUSER_INFO: {
            return state.setIn([action.user,'isOnline'],0);
        }
        case ADD_HISTORY_USER_INFO: {
            // 暂定解决方案
            return Immutable.fromJS(action.users);
        }
        case CHANGE_USER_INFO: {
            return state.setIn([action.user.nickname,'avatar'],action.user.avatar);
        }
        default: {
            return state;
        }
    }
}