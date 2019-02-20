import {
    SET_APP_READY,
    SET_LOGGED_IN,
    CHANGE_SCREEN,
} from './AppActionTypes';

export const setAppReady = () => ({
    type: SET_APP_READY,
})

export const setLoggedIn = isLoggedIn => ({
    type: SET_LOGGED_IN,
    payload: {
        isLoggedIn,
    }
})

export const changeScreen = screenName => ({
    type: CHANGE_SCREEN,
    payload: {
        screenName,
    }
})
