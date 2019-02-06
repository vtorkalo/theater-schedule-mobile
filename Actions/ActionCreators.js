import {SET_SLIDE} from './ActionTypes';

export function setSliderActiveSlide(index) {
    return{
        type: SET_SLIDE,
        payload: {index}
    }
}