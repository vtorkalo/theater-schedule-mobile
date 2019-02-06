import { SET_SLIDE } from '../Actions/ActionTypes';

const initialState = {
    sliderActiveSlide: 1
}

export default function sliderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SLIDE:
            {
                return { ...state, sliderActiveSlide: action.payload.index };

            }
        default:
            return state;
    }
}
