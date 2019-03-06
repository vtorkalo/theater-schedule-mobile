import { SET_SLIDE, SET_POSTERS_FAILURE, SET_POSTERS_SUCCESS,LOAD_POSTERS_BEGIN } from '../Actions/sliderActions';

const initialState = {
    sliderActiveSlide: 0,
    posters: [],
    loading:false,
}

export default function sliderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SLIDE: {
            return { ...state, sliderActiveSlide: action.payload.index };
        }
        case LOAD_POSTERS_BEGIN: {
            return {...state, loading:true};
        }
        case SET_POSTERS_SUCCESS: {
            return { ...state, posters: action.payload.posters, loading:false };
        }
        case SET_POSTERS_FAILURE: {
            return { ...state, error: action.payload.error, posters: [], loading:false }
        }
        default:
            return state;
    }
}
