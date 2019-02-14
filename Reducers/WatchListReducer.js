import {
    ADD_TO_WATCHLIST,
    DELETE_FROM_WATCHLIST
} from 'TheaterSchedule/Actions/WatchListActions/WatchListActionTypes';

import {
    DELETE_FROM_SCHEDULE
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

const initialState = {
    chosenperformances: [
    ],
    loading: false,
}

export default function watchlistReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_WATCHLIST: {
            let chosenperformances = [...state.chosenperformances,
            {
                scheduleId: action.payload.item.scheduleId,
                title: action.payload.item.title,
                beginning: action.payload.item.beginning,
                mainImage: action.payload.item.mainImage,
                performanceId: action.payload.item.performanceId,
                isChecked: true
            }]
            return { ...state, chosenperformances }
        }

        case DELETE_FROM_WATCHLIST: {
            
            let chosenperformances = state.chosenperformances;
            chosenperformances.splice(action.payload.index, 1);
            return { ...state, chosenperformances }
        }

        case DELETE_FROM_SCHEDULE: {

            let chosenperformances = state.chosenperformances;
            let index = chosenperformances.findIndex(item => item.scheduleId == index);
            chosenperformances.splice(index, 1);
            return { ...state, chosenperformances }
        }

        default: {
            return state;
        }
    }
}
