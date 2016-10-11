import Immutable from 'immutable'

import { SET_USER_CARD_INFO } from '../actions'

let defaultState = Immutable.fromJS({});

export default function userCard(state = defaultState,action) {
    switch (action.type) {
        case SET_USER_CARD_INFO: {
            return Immutable.fromJS(action.info);
        }
        default: {
            return state;
        }
    }
}