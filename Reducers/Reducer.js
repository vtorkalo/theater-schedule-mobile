import {
    SET_APP_READY,
    SET_LOGGED_IN,
    FONT_LOADING_BEGIN,
    FONT_LOADING_SUCCESS,
} from 'TheaterSchedule/Actions/AppActions/AppActionTypes';

const initialState = {
    isAppReady: false,
    isLoggedIn: false,
    isFontLoading: false,
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

        case FONT_LOADING_BEGIN: {
            return {
                ...state,
                isFontLoading: true,
            }
        }

        case FONT_LOADING_SUCCESS: {
            return {
                ...state,
                isFontLoading: false,
            }
        }

        default:
            return state;
    }
}
