import Immutable from 'immutable'

import { SET_NOTIFICATION_STATE, SET_AUDIO_STATE, SET_SHIELD_USER, SET_SPECIAL_USER } from '../actions'

let defaultState = {
    h5Notification: true,
    audioNotification: false,
    special: [],
    shield: []
}
defaultState = Immutable.fromJS(defaultState);

export default function setting(state = defaultState,action) {
    switch(action.type){
        case SET_AUDIO_STATE: {
            return state.set('audioNotification',action.state);
        }
        case SET_NOTIFICATION_STATE: {
            return state.set('h5Notification',action.state);
        }
        case SET_SHIELD_USER: {
            let setting = Immutable.fromJS(action.setting.user),
                shield = state.get('shield');
            if(action.setting.isAdd){
                shield = shield.concat(setting);
            } else{
                shield = shield.filter((val)=>{
                    return !Immutable.is(val,setting)
                });
            }
            return state.set('shield',shield);
        }
        case SET_SPECIAL_USER: {
            let setting = Immutable.fromJS(action.setting.user),
                special = state.get('special');
            if(action.setting.isAdd){
                special = special.concat(setting);
            } else{
                special = special.filter((val)=>{
                    return !Immutable.is(val,setting)
                });
            }
            return state.set('special',special);
        }
        default: {
            return state;
        }
    }
}
