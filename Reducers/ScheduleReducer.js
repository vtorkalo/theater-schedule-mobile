import {
    LOAD_SCHEDULE_BEGIN,
    LOAD_SCHEDULE_SUCCESS,
    LOAD_SCHEDULE_FAILURE,
    CNANGE_STATUS_FROM_WATCHLIST,
    CNANGE_STATUS_FROM_SCHEDULE,
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

let currentDate = new Date();
const initialState = {
    schedule: [],
    startDate: currentDate,
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7),
    loading: false,
    error: null,
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case CNANGE_STATUS_FROM_SCHEDULE:
        {
            let schedule = state.schedule.map((performance, index) => {
                if (index == action.payload.index) {
                    return {
                        ...performance,
                        isChecked: !performance.isChecked
                    }
                }
                else {
                    return state.schedule[index];
                }
            })
            return { ...state, schedule };
        }
        case CNANGE_STATUS_FROM_WATCHLIST:
        {
            let schedule = state.schedule.map((performance, index) => {
                if (performance.scheduleId == action.payload.index && performance.isChecked) {
                    return {
                        ...performance,
                        isChecked: !performance.isChecked
                    }
                }
                else {
                    return state.schedule[index];
                }
            })
            return { ...state, schedule };
        }
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
                startDate: action.payload.startDate,
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
