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
        { id: 1, title: "Курочка ряба", mainImage: "uri", startDate: '2019/02/9', beggining: '10:00' },
        { id: 2, title: "Коза Дереза", mainImage: "uri", startDate: '2019/03/9', beggining: '10:00' },
        { id: 3, title: "Колобок", mainImage: "uri", startDate: '2019/04/9', beggining: '10:00' },
        { id: 4, title: "Семеро козенят", mainImage: "uri", startDate: '2019/02/5', beggining: '10:00' },
        { id: 5, title: "Котигорошко", mainImage: "uri", startDate: '2019/02/3', beggining: '10:00' },
        { id: 6, title: "Івасик-Телесик", mainImage: "uri", startDate: '2019/02/10', beggining: '10:00' },
    ],
    performancesBackup: [
        { id: 1, title: "Курочка ряба", mainImage: "uri", startDate: '2019/02/9', beggining: '10:00' },
        { id: 2, title: "Коза Дереза", mainImage: "uri", startDate: '2019/03/9', beggining: '10:00' },
        { id: 3, title: "Колобок", mainImage: "uri", startDate: '2019/04/9', beggining: '10:00' },
        { id: 4, title: "Семеро козенят", mainImage: "uri", startDate: '2019/02/5', beggining: '10:00' },
        { id: 5, title: "Котигорошко", mainImage: "uri", startDate: '2019/02/3', beggining: '10:00' },
        { id: 6, title: "Івасик-Телесик", mainImage: "uri", startDate: '2019/02/10', beggining: '10:00' },
    ],
    startDate: currentDate,
    endDate: dateAfterWeek,
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
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                performances: state.performancesBackup.filter(performance => {
                    return new Date(performance.startDate) >= action.payload.startDate && new Date(performance.startDate) <= action.payload.endDate;
                })
            }

            // let endDate = new Date(
            //     action.payload.endDate.getFullYear(),
            //     action.payload.endDate.getMonth(),
            //     action.payload.endDate.getDate() + 1,
            //     action.payload.endDate.getMinutes(),
            //     0, 0, 0
            // );

            // let filteredPerfomances =
            //     fetch(`api/Schedule/FilterByDate?startDate=${action.payload.startDate}&${endDate}`)
            //         .then(response => response.json())
            //         .catch(error => console.log(error));

            // return {
            //     ...state,
            //     startDate: action.payload.startDate,
            //     endDate: action.payload.endDate,
            //     performances: filteredPerfomances,
            // };

        }

        default: {
            return state;
        }
    }
}
