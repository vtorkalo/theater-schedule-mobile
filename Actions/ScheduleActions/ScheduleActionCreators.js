import BASE_URL from 'TheaterSchedule/baseURL';
import {
    LOAD_PERFORMANCES_BEGIN,
    LOAD_PERFORMANCES_SUCCESS,
    LOAD_PERFORMANCES_FAILURE,
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

export const loadPerformancesBegin = () => ({
    type: LOAD_PERFORMANCES_BEGIN,
});

export const loadPerformancesSuccess = (performances, startDate, endDate) => ({
    type: LOAD_PERFORMANCES_SUCCESS,
    payload: {
        performances,
        startDate,
        endDate,
    },
});

export const loadPerformancesFailure = error => ({
    type: LOAD_PERFORMANCES_FAILURE,
    payload: {
        error,
    },
});

export const loadPerformances = (startDate, endDate) => {
    return dispatch => {
        dispatch(loadPerformancesBegin());

        let dayAfterEndDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() + 1,
            0, 0, 0
        );
        let languageCode = 'uk';
        let url = `${BASE_URL}schedule/${languageCode}/FilterByDate?startDate=${startDate.toJSON()}&endDate=${dayAfterEndDate.toJSON()}`;

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                dispatch(loadPerformancesSuccess(responseJson, startDate, endDate));
            })
            .catch(error => {
                dispatch(loadPerformancesFailure(error));
            });
    };
};
