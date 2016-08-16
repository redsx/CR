import R from 'ramda'

import { ADD__PRIVATE_MESSAGE } from '../actions'
export default function privateMessages(state={},action) {
    let deepCopy = R.clone(state);
    switch (action.type) {
        case ADD__PRIVATE_MESSAGE: {
            let roomMessage = deepCopy[action.message.room] || [];
            roomMessage.push(action.message);
            deepCopy[action.message.room] = roomMessage;
            return deepCopy;
        }
        default: {
            return state;
        }
    }
}