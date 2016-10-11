import Immutable from 'immutable'

import { INIT_ACTIVE_LIST, ADD_ACTIVE_ITEM, DELETE_ACTIVE_ITEM } from '../actions'

let defaultState = Immutable.fromJS({});

export default function activeList(state = defaultState,action) {
    switch (action.type) {
        case INIT_ACTIVE_LIST: {
            return Immutable.fromJS(action.activeList);
        }
        case ADD_ACTIVE_ITEM: {
            let item = {};
            item[action.item.roomName] = action.item;
            item = Immutable.fromJS(item);
            return state.merge(item);
        }
        case DELETE_ACTIVE_ITEM: {
            let item = Immutable.fromJS(action.item);
            return state.filter((val) => {
                return !Immutable.is(val,item);
            })
        }
        default: {
            return state;
        }
    }
}