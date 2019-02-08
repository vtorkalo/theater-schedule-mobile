import BASE_URL from '../../baseURL';
import {
    FILTER_PERFORMANCES_BEGIN,
    FILTER_PERFORMANCES_SUCCESS,
    FILTER_PERFORMANCES_FAILURE
} from './ScheduleActionTypes';

export const filterPerformancesBegin = () => ({
    type: FILTER_PERFORMANCES_BEGIN
});

export const filterPerformancesSuccess = (performances, startDate, endDate) => ({
    type: FILTER_PERFORMANCES_SUCCESS,
    payload: {
        performances: { performances },
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

        let end = new Date(
            endDate.getFullYear() + 1,
            endDate.getMonth(),
            endDate.getDate() + 1,
            0, 0, 0
        );

        let url = `${BASE_URL}schedule/pl/FilterByDate?startDate=${startDate.toJSON()}&endDate=${end.toJSON()}`;
        
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                dispatch(filterPerformancesSuccess(responseJson, startDate, endDate));
            })
            .catch(error => {
                console.log(error);
                dispatch(filterPerformancesFailure(error));
            });
    };
};
