import {
    FILTER_PERFORMANCES,
    LOAD_PERFORMANCES_BEGIN,
    LOAD_PERFORMANCES_SUCCESS,
    LOAD_PERFORMANCES_END
} from '../Actions/ScheduleActions/ScheduleActionTypes';

let currentDate = new Date();
let dateAfterWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);

const initialState = {
    performances: [
        { id: 1, title: "perf1", mainImage: "uri", startDate: '1', duration: 10, minPrice: 10, maxPrice: 100, },
        { id: 2, title: "perf2", mainImage: "uri", startDate: '2', duration: 20, minPrice: 20, maxPrice: 200, },
        { id: 3, title: "perf3", mainImage: "uri", startDate: '3', duration: 30, minPrice: 30, maxPrice: 300, },
        { id: 4, title: "perf4", mainImage: "uri", startDate: '4', duration: 40, minPrice: 40, maxPrice: 400, },
        { id: 5, title: "perf5", mainImage: "uri", startDate: '5', duration: 50, minPrice: 50, maxPrice: 500, },
        { id: 6, title: "perf6", mainImage: "uri", startDate: '6', duration: 60, minPrice: 60, maxPrice: 600, },
    ],
    data: {},
    startDate: currentDate,
    endDate: dateAfterWeek,
    loading: false,
    error: null,
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {
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
                data: action.payload.data,
            }
        }

        case LOAD_PERFORMANCES_END: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        }

        case FILTER_PERFORMANCES: {
            // let filteredPerfomances =
            //     fetch(`api/Schedule/FilterDate?startDate=${action.payload.startDate}&${action.payload.endDate}`)
            //         .then(response => response.json());

            // return {
            //     ...state,
            //     performances: filteredPerfomances,
            // };
            return { ...state }
        }

        default: {
            return state;
        }
    }
}
