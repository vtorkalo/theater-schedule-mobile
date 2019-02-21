import {
    ADD_TO_WATCHLIST,
} from 'TheaterSchedule/Actions/WatchListActions/WatchListActionTypes';

export const addToWatchlist = (performanceId,item) => ({
    type: ADD_TO_WATCHLIST,
    payload: {
        performanceId,
        item
    },
});
