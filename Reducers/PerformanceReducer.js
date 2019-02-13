import {
    LOAD_PERFORMANCE_BEGIN,
    LOAD_PERFORMANCE_SUCCESS,
    LOAD_PERFORMANCE_FAILURE,
} from "../Actions/PerformanceTypes";

const initialState = {
    performance: [],
    loading: false,
    error: null,
};


export default function performanceReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PERFORMANCE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOAD_PERFORMANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                performance: action.payload.performance,
            };

        case LOAD_PERFORMANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            {
                return state;
            }

    }
}