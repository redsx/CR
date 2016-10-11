import Immutable from 'immutable'

import { SET_ROOM_LIST } from '../actions'

let defaultState = Immutable.fromJS({});

export default function roomList(state = defaultState,action) {
    switch (action.type) {
        case SET_ROOM_LIST: {
            return Immutable.fromJS(action.roomList);
        }
        default: {
            return state;
        }
    }
}


