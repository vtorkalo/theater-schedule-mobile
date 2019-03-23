import BASE_URL from 'TheaterSchedule/baseURL';

export const SET_SCHEDULE_SUCCESS = 'SET_SCHEDULE_SUCCESS';
export const SET_SCHEDULE_FAILURE = 'SET_FAILURE_SUCCESS';
export const LOAD_SCHEDULE_BEGIN = 'SET_SCHEDULE_BEGIN';

export function fetchSchedule(performanceId) {
    return (dispatch) => {
        dispatch(loadScheduleBegin());
        fetch(`${BASE_URL}PerformanceSchedule/${performanceId}`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            dispatch(setScheduleSuccess(responseJson));
        })
        .catch((error)=>{
            dispatch(setScheduleFailure(error));
        })
    }
}

export const loadScheduleBegin = () => ({
    type: LOAD_SCHEDULE_BEGIN,
});

export const setScheduleSuccess = (schedule) => ({
    type: SET_SCHEDULE_SUCCESS,
    payload: {schedule},
})

export const setScheduleFailure = (error) => ({
    type: SET_SCHEDULE_FAILURE,
    payload: {error},
})