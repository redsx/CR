import Immutable from 'immutable'

import { ADD__PRIVATE_MESSAGE, INIT_PRIVATE_ROOM_HISTORIES, ADD_PRIVARE_HISTORY_MESSAGE, ADD_PRIVATE_HISTORY_MESSAGE } from '../actions'

let defaultState = Immutable.fromJS({});


export default function privateMessages(state = defaultState,action) {

    switch (action.type) {
        case ADD__PRIVATE_MESSAGE: {
            let message = state.get(action.message.room);
            message ? null : message = Immutable.fromJS([]);
            message = message.push(action.message);
            return state.set(action.message.room,message);
        }
        case INIT_PRIVATE_ROOM_HISTORIES: {
            return Immutable.fromJS(action.messages);
        }
        case ADD_PRIVATE_HISTORY_MESSAGE: {
            let messages = Immutable.fromJS(action.messages);
            let oldMsg = state.get(action.room) || Immutable.fromJS([]);
            messages = messages.concat(oldMsg);
            return state.set(action.room,messages);
        }
        case ADD_PRIVARE_HISTORY_MESSAGE: {
            let messages = Immutable.fromJS(action.messages);
            if(!state.get(action.room)){
                return state.set(action.room,messages);
            } else{
                return state.mergeIn([action.room],state.messages);
            }
        }
        default: {
            return state;
        }
    }
}