import R from 'ramda'

import { ADD_MESSAGE, ADD_HISTORY_MESSAGE } from '../actions'
export default function messages(state={},action) {
    let deepCopy = R.clone(state);
    switch (action.type) {
        case ADD_MESSAGE: {
            let roomMessage = deepCopy[action.message.room] || [];
            if(roomMessage.length > 200){
                roomMessage = roomMessage.slice(roomMessage.length-100);
            }
            roomMessage.push(action.message);
            deepCopy[action.message.room] = roomMessage;
            return deepCopy;
        }
        case ADD_HISTORY_MESSAGE: {
            deepCopy[action.room] = action.messages;
            return deepCopy;
        }
        default: {
            return state;
        }
    }
}