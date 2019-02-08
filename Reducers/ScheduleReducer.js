import {
    FILTER_PERFORMANCES_BEGIN,
    FILTER_PERFORMANCES_SUCCESS,
    FILTER_PERFORMANCES_FAILURE
} from '../Actions/ScheduleActions/ScheduleActionTypes';

const initialState = {
    performances: [],
    startDate: null,
    endDate: null,
    loading: false,
    error: null,
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER_PERFORMANCES_BEGIN: {
            console.log("begin");

            return {
                ...state,
                loading: true,
            }
        }

        case FILTER_PERFORMANCES_SUCCESS: {
            console.log("success");
            console.log(action.payload.performances);
            return {
                ...state,
                loading: false,
                performances: action.payload.performances,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        }
        
        case FILTER_PERFORMANCES_FAILURE: {
            console.log("failure");

            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        }

        default: {
            return state;
        }
    }
}
