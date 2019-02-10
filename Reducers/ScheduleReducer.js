import {
    LOAD_PERFORMANCES_BEGIN,
    LOAD_PERFORMANCES_SUCCESS,
    LOAD_PERFORMANCES_FAILURE
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
        case LOAD_PERFORMANCES_BEGIN: {
            return {
                ...state,
                loading: true,
            }
        }

        case LOAD_PERFORMANCES_SUCCESS: {
            return {
                ...state,
                loading: false,
                performances: action.payload.performances,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        }
        
        case LOAD_PERFORMANCES_FAILURE: {
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
