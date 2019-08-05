import BASE_URL from 'TheaterSchedule/baseURL';
import {
    STORE_PROFILE_UPDATES_BEGIN,
    STORE_PROFILE_UPDATES_SUCCESS,
    STORE_PROFILE_UPDATES_FAILURE,
    STORE_PASSWORD_UPDATE_BEGIN,
    STORE_PASSWORD_UPDATE_SUCCESS,
    STORE_PASSWORD_UPDATE_FAILURE,
} from 'TheaterSchedule/Actions/EditUserActions/EditUserActionTypes';
import { AsyncStorage } from "react-native";

export const storeProfileUpdatesBegin = () => ({
    type: STORE_PROFILE_UPDATES_BEGIN
});

export const storeProfileUpdatesSuccess = updatedUser => ({
    type: STORE_PROFILE_UPDATES_SUCCESS,
    payload: { updatedUser }
});

export const storeProfileUpdatesFailure = error => ({
    type: STORE_PROFILE_UPDATES_FAILURE,
    payload: { error }
});

export const storePasswordUpdateBegin = () => ({
    type: STORE_PASSWORD_UPDATE_BEGIN
})

export const storePasswordUpdateSuccess = () => ({
    type: STORE_PASSWORD_UPDATE_SUCCESS
})

export const storePasswordUpdateFailure = error => ({
    type: STORE_PASSWORD_UPDATE_FAILURE,
    payload: { error }
})

export const updateUserPassword = (params) => {
    return async dispatch => {
        let dataJson = JSON.stringify(params);
        let token = await AsyncStorage.getItem('AccessToken');
        dispatch(storePasswordUpdateBegin());
        return fetch(`${BASE_URL}User/UpdatePassword`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: dataJson
        })
            .then(async response => {
                let headersAccessToken = response.headers.get('newaccess_token');
                if (headersAccessToken != null) {
                    await AsyncStorage.setItem('AccessToken', headersAccessToken);
                }
                if (!response.ok) {
                    if (response.status === 400)
                        throw new Error('Wrong user password');
                    if (response.status === 404)
                        throw new Error('Wrong user id');
                    if (response.status === 401)
                        throw new Error('Unauthorized');
                }
                return response;
            })
            .then(() => {
                dispatch(storePasswordUpdateSuccess());
            })
            .catch(error => {
                dispatch(storePasswordUpdateFailure(error));
            });
    };
};

export const updateUserProfile = (params) => {
    return async dispatch => {
        let dataJson = JSON.stringify(params);
        let token = await AsyncStorage.getItem('AccessToken');
        dispatch(storeProfileUpdatesBegin());
        return fetch(`${BASE_URL}User/UpdateProfile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: dataJson
        })
            .then(async response => {
                console.log(response);
                let headersAccessToken = response.headers.get('newaccess_token');
                if (headersAccessToken != null) {
                    await AsyncStorage.setItem('AccessToken', headersAccessToken);
                }
                if (!response.ok) {
                    if (response.status === 400)
                        throw new Error('Not valid model');
                    if (response.status === 404)
                        throw new Error('Wrong user');
                    if (response.status === 401)
                        throw new Error('Unauthorized');
                }
                return response.json();
            })
            .catch(error => {
                dispatch(storeProfileUpdatesFailure(error));
            });
    };
};

