import {
    SET_APP_READY,
    SET_LOGGED_IN,
} from 'TheaterSchedule/Actions/AppActions/AppActionTypes';

const initialState = {
    isAppReady: false,
    isLoggedIn: false,
};

export default function defaultReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APP_READY: {
            return {
                ...state,
                isAppReady: true,
            }
        }

        case SET_LOGGED_IN: {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
            }
        }

        default:
            return state;
    }
}
