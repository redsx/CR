import Immutable from 'immutable'

import { ADD__PRIVATE_MESSAGE } from '../actions'

let defaultState = Immutable.fromJS({});


export default function privateMessages(state = defaultState,action) {

    switch (action.type) {
        case ADD__PRIVATE_MESSAGE: {
            let message = state.get(action.message.room);
            message ? null : message = Immutable.fromJS([]);
            message = message.push(action.message);
            return state.set(action.message.room,message);
        }
        default: {
            return state;
        }
    }
}