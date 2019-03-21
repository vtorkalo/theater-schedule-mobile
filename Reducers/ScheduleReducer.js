import {
    LOAD_SCHEDULE_BEGIN,
    LOAD_SCHEDULE_SUCCESS,
    LOAD_SCHEDULE_FAILURE,
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

const getDateAfterWeek = () => {
    let currentDate = new Date();
    const DAYS_IN_WEEK = 7;
    let dateAfterWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + DAYS_IN_WEEK);
    return dateAfterWeek;
}

const initialState = {
    schedule: [],
    endDate: getDateAfterWeek(),
    loading: false,
    error: null,
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SCHEDULE_BEGIN: {
            return {
                ...state,
                loading: true,
            }
        }

        case LOAD_SCHEDULE_SUCCESS: {
            return {
                ...state,
                loading: false,
                schedule: action.payload.schedule,
                endDate: action.payload.endDate,
            }
        }

        case LOAD_SCHEDULE_FAILURE: {
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
