import {SET_SCHEDULE_SUCCESS, SET_SCHEDULE_FAILURE, LOAD_SCHEDULE_BEGIN} from '../Actions/performanceScheduleActions';

const initialState = {
    schedule: [],
    loading: false
}

export default function performanceScheduleReducer(state=initialState, action){
    switch(action.type){
        case LOAD_SCHEDULE_BEGIN: {
            return {...state, loading:true}
        }
        case SET_SCHEDULE_SUCCESS: {
            return {...state, loading:false, schedule: action.payload.schedule}
        }
        case SET_SCHEDULE_FAILURE: {
            return {...state, loading: false, schedule:[]}
        }
        default: 
            return state;
    }
}