import {
    LOAD_PERFORMANCES_BEGIN,
    LOAD_PERFORMANCES_SUCCESS,
    LOAD_PERFORMANCES_FAILURE,
    CNANGE_PERFORMANCE_STATUS,
    CNANGE_CHOSENPERFORMANCE_STATUS
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

let currentDate = new Date();
const initialState = {
    performances: [],
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
