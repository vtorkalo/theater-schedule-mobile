import {
    LOAD_PERFORMANCE_BEGIN,
    LOAD_PERFORMANCE_SUCCESS,
    LOAD_PERFORMANCE_FAILURE,
    CNANGE_STATUS_PERFORMANCE,
    SET_STATUS_PERFORMANCE,
} from "../Actions/PerformanceTypes";

const initialState = {
    performance: {},
    loading: false,
    error: null,
    isChecked: null,
};


export default function performanceReducer(state = initialState, action) {
    switch (action.type) {

        case SET_STATUS_PERFORMANCE: {
            return {
                ...state,
                isChecked: state.performance.isChecked,
            };
        };

        case CNANGE_STATUS_PERFORMANCE:
            {
                if (action.payload.isChecked) {
                    return {
                        ...state,
                        isChecked: false,
                    };
                }
                else {
                    return {
                        ...state,
                        isChecked: true,
                    };

                }
            };

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