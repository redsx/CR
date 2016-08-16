import R from 'ramda'

import { SET_AUDIO_SRC, SET_NOTIFICATION_STATE, SET_AUDIO_STATE, SET_SHIELD_USER, SET_SPECIAL_USER } from '../actions'
const defaultState = {
    h5Notification: true,
    audio: {
        src:{},
        isClose: true
    },
    special: [],
    shield: []
}
export default function pageState(state = defaultState,action) {
    let deepCopy = R.clone(state);
    switch(action.type){
        case SET_AUDIO_SRC: {
            deepCopy.audio.src = Object.assign({},deepCopy.audio.src,action.src);
            return deepCopy;
        }
        case SET_AUDIO_STATE: {
            deepCopy.audio.isClose = action.state;
            return deepCopy;
        }
        case SET_NOTIFICATION_STATE: {
            deepCopy.h5Notification = action.state;
            return deepCopy;
        }
        case SET_SHIELD_USER: {
            if(action.setting.isAdd){
                deepCopy.shield =  deepCopy.shield.concat(action.setting.user);
                return deepCopy
            }
            let index = deepCopy.shield.indexOf(action.setting.user)
            index === -1 ? null : deepCopy.shield.splice(index,1);
            return deepCopy;
        }
        case SET_SPECIAL_USER: {
            if(action.setting.isAdd){
                deepCopy.special = deepCopy.special.concat(action.setting.user);
                return deepCopy
            }
            let index = deepCopy.special.indexOf(action.setting.user)
            index === -1 ? null : deepCopy.special.splice(index,1);
            return deepCopy;
        }
        default: {
            return state;
        }
    }
}
