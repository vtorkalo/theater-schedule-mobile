import {
    LOAD_SCHEDULE_BEGIN,
    LOAD_SCHEDULE_SUCCESS,
    LOAD_SCHEDULE_FAILURE,
    CNANGE_PERFORMANCE_STATUS,
    CNANGE_CHOSENPERFORMANCE_STATUS
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
        case CNANGE_CHOSENPERFORMANCE_STATUS:
        {
            let performances = state.performances.map((item, index) => {
                console.log("index 1: "+ item.scheduleId);
                console.log("index 2: "+ action.payload.index);
                if (index == action.payload.index) { 
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                else {
                    return state.performances[index];
                }
            })
            return { ...state, performances };
        }
        case CNANGE_PERFORMANCE_STATUS:
        {
            let performances = state.performances.map((item, index) => {
                console.log("index 1: "+ item.scheduleId);
                console.log("index 2: "+ action.payload.index);
                if (index == action.payload.index) { 
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                else {
                    return state.performances[index];
                }
            })
            return { ...state, performances };
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
