import R from 'ramda'

import { SET_SLIDE_STATE, SET_SLIDE_ARR } from '../actions'
const defaultState = {
    isShowSlide: false,
    slideArr: []
}

export default function imageSlide(state=defaultState,action) {
    let deepCopy = R.clone(state);
    switch (action.type) {
        case SET_SLIDE_STATE: {
            deepCopy.isShowSlide = action.isShow;
            return deepCopy;
        }
        case SET_SLIDE_ARR: {
            deepCopy.slideArr = action.slideArr;
            return deepCopy;
        }
        default: {
            return state;
        }
    }
}