import {
    FILTER_PERFORMANCES_BEGIN,
    FILTER_PERFORMANCES_SUCCESS,
    FILTER_PERFORMANCES_FAILURE
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

let currentDate = new Date();
const initialState = {
    performances: [],
    startDate: currentDate,
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
    loading: false,
    error: null,
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER_PERFORMANCES_BEGIN: {
            return {
                ...state,
                loading: true,
            }
        }

        case FILTER_PERFORMANCES_SUCCESS: {
            return {
                ...state,
                loading: false,
                performances: action.payload.performances,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        }
        
        case FILTER_PERFORMANCES_FAILURE: {
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
