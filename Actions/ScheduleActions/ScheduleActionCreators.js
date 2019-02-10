import BASE_URL from 'TheaterSchedule/baseURL';
import {
    FILTER_PERFORMANCES_BEGIN,
    FILTER_PERFORMANCES_SUCCESS,
    FILTER_PERFORMANCES_FAILURE
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

export const filterPerformancesBegin = () => ({
    type: FILTER_PERFORMANCES_BEGIN
});

export const filterPerformancesSuccess = (performances, startDate, endDate) => ({
    type: FILTER_PERFORMANCES_SUCCESS,
    payload: {
        performances,
        startDate,
        endDate,
    },
});

export const filterPerformancesFailure = error => ({
    type: FILTER_PERFORMANCES_FAILURE,
    payload: {
        error,
    },
});

export const filterPerformances = (startDate, endDate) => {
    return dispatch => {
        dispatch(filterPerformancesBegin());

        let dayAfterEndDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() + 1,
            0, 0, 0
        );
        let url = `${BASE_URL}schedule/uk/FilterByDate?startDate=${startDate.toJSON()}&endDate=${dayAfterEndDate.toJSON()}`;

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                dispatch(filterPerformancesSuccess(responseJson, startDate, endDate));
            })
            .catch(error => {
                dispatch(filterPerformancesFailure(error));
            });
    };
};
