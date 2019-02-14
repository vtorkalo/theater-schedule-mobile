import BASE_URL from 'TheaterSchedule/baseURL';
import {
    LOAD_SCHEDULE_BEGIN,
    LOAD_SCHEDULE_SUCCESS,
    LOAD_SCHEDULE_FAILURE,
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

export const loadScheduleBegin = () => ({
    type: LOAD_SCHEDULE_BEGIN,
});

export const loadScheduleSuccess = (schedule, startDate, endDate) => ({
    type: LOAD_SCHEDULE_SUCCESS,
    payload: {
        schedule,
        startDate,
        endDate,
    },
});

export const loadScheduleFailure = error => ({
    type: LOAD_SCHEDULE_FAILURE,
    payload: {
        error,
    },
});

export const loadSchedule = (startDate, endDate, deviceId, languageCode) => {
    return dispatch => {
        dispatch(loadScheduleBegin());

        let dayAfterEndDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() + 1,
            0, 0, 0
        );
        let url = `${BASE_URL}schedule/${deviceId}/${languageCode}/FilterByDate?startDate=${startDate.toJSON()}&endDate=${dayAfterEndDate.toJSON()}`;
        
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                dispatch(loadScheduleSuccess(responseJson, startDate, endDate));
            })
            .catch(error => {
                dispatch(loadScheduleFailure(error));
            });
    };
};
