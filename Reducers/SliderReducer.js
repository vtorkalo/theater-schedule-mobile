import { SET_SLIDE, SET_POSTERS_FAILURE, SET_POSTERS_SUCCESS } from '../Actions/sliderActions';

const initialState = {
    sliderActiveSlide: 0,
    posters: [],
}

export default function sliderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SLIDE: {
            return { ...state, sliderActiveSlide: action.payload.index };
        }
        case SET_POSTERS_SUCCESS: {
            return { ...state, posters: action.payload.posters };
        }
        case SET_POSTERS_FAILURE: {
            return { ...state, error: action.payload.error, posters: [] }
        }
        default:
            return state;
    }
}
