import {
    ADD_TO_WATCHLIST,
    DELETE_FROM_WATCHLIST
} from 'TheaterSchedule/Actions/WatchListActions/WatchListActionTypes';

export const addToWatchlist = (item) => ({
    type: ADD_TO_WATCHLIST,
    payload: {
        item
    },
});

export const deleteFromWatchlist = (index) => ({
    type: DELETE_FROM_WATCHLIST,
    payload: {
        index,
    },
});
