import {
    ADD_TO_WATCHLIST,
    DELETE_FROM_WATCHLIST
} from 'TheaterSchedule/Actions/WatchListActions/WatchListActionTypes';

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
                isChecked: true
            }]
            return { ...state, chosenperformances }
        }

        case DELETE_FROM_WATCHLIST: {
            let chosenperformances = state.chosenperformances;
            chosenperformances.splice(action.payload.index, 1);
            return { ...state, chosenperformances }
        }

        default: {
            return state;
        }
    }
}
