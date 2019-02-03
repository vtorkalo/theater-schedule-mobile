import {
    FILTER_PERFORMANCES,
    LOAD_PERFORMANCES_BEGIN,
    LOAD_PERFORMANCES_SUCCESS,
    LOAD_PERFORMANCES_END
} from './ScheduleActionTypes';

export const filterPerformances = (startDate, endDate) => {
    return {
        type: FILTER_PERFORMANCES,
        payload: {
            startDate: startDate,
            endDate: endDate,
        },
    };
}

export const loadPerformancesBegin = () => {
    return {
        type: LOAD_PERFORMANCES_BEGIN,
    };
}

export const loadPerformancesSuccess = data => {
    return {
        type: LOAD_PERFORMANCES_SUCCESS,
        payload: {
            data: data,
        }
    };
}

export const loadPerformancesBeginEnd = error => {
    return {
        type: LOAD_PERFORMANCES_END,
        payload: {
            error: error,
        }
    };
}
