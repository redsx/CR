import Immutable from 'immutable'

import { ADD_MESSAGE, ADD_HISTORY_MESSAGE, INIT_ROOM_HISTORIES, CLEAR_HISTORY, MERGE_MESSAGE } from '../actions'

let defaultState = Immutable.fromJS({});

export default function messages(state = defaultState,action) {
    switch (action.type) {
        case ADD_MESSAGE: {
            let roomMessage = state.get(action.message.room) || Immutable.fromJS([]);
            if(roomMessage.size > 200){
                roomMessage = roomMessage.slice(100);
            }
            roomMessage = roomMessage.push(Immutable.fromJS(action.message));
            return state.set(action.message.room,roomMessage);
        }
        case MERGE_MESSAGE: {
            if(action.message.type === 'imageMessage') delete action.message.content;
            let message = Immutable.fromJS([action.message]);
            return state;
        }
        case INIT_ROOM_HISTORIES: {
            return Immutable.fromJS(action.messages);
        }
        case ADD_HISTORY_MESSAGE: {
            let messages = Immutable.fromJS(action.messages);
            let oldMsg = state.get(action.room) || Immutable.fromJS([]);
            messages = messages.concat(oldMsg);
            return state.set(action.room,messages);
        }
        case CLEAR_HISTORY: {
            let roomMessage = state.get(action.room) || Immutable.fromJS([]);
            if(roomMessage.size > 20){
                roomMessage = roomMessage.slice(roomMessage.size-20);
            }
            return state.set(action.room,roomMessage);
        }
        default: {
            return state;
        }
    }
}