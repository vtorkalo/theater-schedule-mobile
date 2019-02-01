import { FILTER_PERFORMANCES } from './ScheduleActionTypes';

export const filterPerformances = (startDate, endDate) => {
    return {
        type: FILTER_PERFORMANCES,
        payload: {
            startDate: startDate,
            endDate: endDate,
        },
    };
}
