import {
    LOAD_PERFORMANCE_BEGIN,
    LOAD_PERFORMANCE_SUCCESS,
    LOAD_PERFORMANCE_FAILURE,
} from "../Actions/PerformanceTypes";

import {
    CNANGE_STATUS_PERFORMANCE
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

const initialState = {
    performance: [],
    loading: false,
    error: null,
};


export default function performanceReducer(state = initialState, action) {
    switch (action.type) {
        case CNANGE_STATUS_PERFORMANCE:
            {
                state.performance.isChecked = !state.performance.isChecked;
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