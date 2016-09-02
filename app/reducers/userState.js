import Immutable from 'immutable'


import { SET_USER_INFO, SET_USER_CURROOM } from '../actions'

let defaultState = Immutable.fromJS({});

export default function userState(state = defaultState,action) {
    switch (action.type) {
        case SET_USER_INFO: {
            let userInfo = Immutable.fromJS(action.user);
            return state.merge(userInfo);
        }
        case SET_USER_CURROOM: {
            let roomInfo = Immutable.fromJS(action.roomInfo);
            return state.merge(roomInfo);
        }
        default: {
            return state;
        }
    }
}