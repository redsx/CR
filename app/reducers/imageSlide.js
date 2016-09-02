import Immutable from 'immutable'

import { SET_SLIDE_STATE, SET_SLIDE_ARR } from '../actions'

let defaultState = {
    isShowSlide: false,
    slideArr: []
}
defaultState = Immutable.fromJS(defaultState);

export default function imageSlide(state = defaultState,action) {
    switch (action.type) {
        case SET_SLIDE_STATE: {
            return state.set('isShowSlide',action.isShow);
        }
        case SET_SLIDE_ARR: {
            return state.set('slideArr',Immutable.fromJS(action.slideArr));
        }
        default: {
            return state;
        }
    }
}