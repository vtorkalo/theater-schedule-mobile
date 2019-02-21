import {
    ADD_TO_WATCHLIST
} from 'TheaterSchedule/Actions/WatchListActions/WatchListActionTypes';
import {
    DELETE_PERFORMANCE,
} from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionTypes';

const initialState = {
    chosenperformances: [
    ],
}

export default function watchlistReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_WATCHLIST: {
            let chosenperformances = [...state.chosenperformances,
            {
                performanceId: action.payload.performanceId,
                title: action.payload.item.title,
                mainImage: action.payload.item.mainImage,
                isChecked: true,
            }]
            return { ...state, chosenperformances }
        }
        
        case DELETE_PERFORMANCE: {
            let chosenperformances = state.chosenperformances;
            let index = chosenperformances.findIndex(item => item.performanceId == action.payload.index);
            chosenperformances.splice(index, 1);
            return { ...state, chosenperformances }
        }

        default: {
            return state;
        }
    }
}
