import {
    SET_APP_READY,
    SET_LOGGED_IN,
    CHANGE_SCREEN,
    FONT_LOADING_BEGIN,
    FONT_LOADING_SUCCESS,
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

export const fontLoadingBegin = () => ({
    type: FONT_LOADING_BEGIN,
})

export const fontLoadingSuccess = () => ({
    type: FONT_LOADING_SUCCESS,
})
