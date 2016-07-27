import R from 'ramda'

import { SET_USER_INFO, SET_USER_CURROOM } from '../actions'
export default function userState(state={},action) {
    let deepCopy = R.clone(state);
    switch (action.type) {
        case SET_USER_INFO: {
            return Object.assign({},deepCopy,action.user);
        }
        case SET_USER_CURROOM: {
            return Object.assign({},deepCopy,action.roomInfo);
        }
        default: {
            return state;
        }
    }
}