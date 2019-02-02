import { FILTER_PERFORMANCES } from '../Actions/ScheduleActions/ScheduleActionTypes';

const initialState = {
    performances: [
        { id: 1, title: "perf1", mainImage: "uri", startDate: '1', duration: 10, minPrice: 10, maxPrice: 100, },
        { id: 2, title: "perf2", mainImage: "uri", startDate: '2', duration: 20, minPrice: 20, maxPrice: 200, },
        { id: 3, title: "perf3", mainImage: "uri", startDate: '3', duration: 30, minPrice: 30, maxPrice: 300, },
        { id: 4, title: "perf4", mainImage: "uri", startDate: '4', duration: 40, minPrice: 40, maxPrice: 400, },
        { id: 5, title: "perf5", mainImage: "uri", startDate: '5', duration: 50, minPrice: 50, maxPrice: 500, },
        { id: 6, title: "perf6", mainImage: "uri", startDate: '6', duration: 60, minPrice: 60, maxPrice: 600, },
    ],
    startDate: new Date(),
    endDate: new Date(),
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER_PERFORMANCES: {
            return {
                ...state,
                performances: state.performances.filter(performance => {
                    // return performance.startDate >= action.payload.startDate &&
                    //     performance.startDate <= action.payload.endDate;
                    return performance.startDate >= 2 &&
                        performance.startDate <= 5;
                }),
            };
        }

        default: {
            return state;
        }
    }
}
