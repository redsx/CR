import Immutable from 'immutable'

import { ADD_MESSAGE, ADD_HISTORY_MESSAGE } from '../actions'

let defaultState = Immutable.fromJS({});

export default function messages(state = defaultState,action) {
    switch (action.type) {
        case ADD_MESSAGE: {
            let roomMessage = state.get(action.message.room) || Immutable.fromJS([]);
            if(roomMessage.size > 200){
                roomMessage = roomMessage.setSize(100);
            }
            roomMessage = roomMessage.push(Immutable.fromJS(action.message));
            return state.set(action.message.room,roomMessage);
        }
        case ADD_HISTORY_MESSAGE: {
            let messages = Immutable.fromJS(action.messages);
            return state.set(action.room,messages);
        }
        default: {
            return state;
        }
    }
}