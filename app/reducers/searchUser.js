import Immutable from 'immutable'

import { SET_SEARCH_USER } from '../actions'

let defaultState = Immutable.fromJS({});

export default function searchList(state = defaultState,action) {
    switch (action.type) {
        case SET_SEARCH_USER: {
            return Immutable.fromJS(action.list);
        }
        default: {
            return state;
        }
    }
}


