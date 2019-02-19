import {
    SET_APP_READY,
    CHANGE_SCREEN,
} from './AppActionTypes';

export const setAppReady = () => ({
    type: SET_APP_READY,
})

export const changeScreen = screenName => ({
    type: CHANGE_SCREEN,
    payload: {
        screenName,
    }
})
