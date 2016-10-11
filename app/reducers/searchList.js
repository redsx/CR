import Immutable from 'immutable'

import { INIT_SEARCH_ROOM } from '../actions'

let defaultState = Immutable.fromJS({});

export default function searchList(state = defaultState,action) {
    switch (action.type) {
        case INIT_SEARCH_ROOM: {
            return Immutable.fromJS(action.list);
        }
        default: {
            return state;
        }
    }
}


