import Immutable from 'immutable'

import { SET_ROOM_CARD_INFO } from '../actions'

let defaultState = Immutable.fromJS({});

export default function roomCard(state = defaultState,action) {
    switch (action.type) {
        case SET_ROOM_CARD_INFO: {
            let info = Immutable.fromJS(action.info);
            return state.merge(info);
        }
        default: {
            return state;
        }
    }
}