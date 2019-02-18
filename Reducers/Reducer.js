import { SET_APP_READY } from 'TheaterSchedule/Actions/AppActions/AppActionTypes';

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
        default:
            return state;
    }
}
