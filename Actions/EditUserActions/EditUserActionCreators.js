import BASE_URL from 'TheaterSchedule/baseURL';
import {
    STORE_PROFILE_UPDATES_BEGIN,
    STORE_PROFILE_UPDATES_SUCCESS,
    STORE_PROFILE_UPDATES_FAILURE,
    STORE_PASSWORD_UPDATE_BEGIN,
    STORE_PASSWORD_UPDATE_SUCCESS,
    STORE_PASSWORD_UPDATE_FAILURE,
} from 'TheaterSchedule/Actions/EditUserActions/EditUserActionTypes';

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
    return dispatch => {
        let dataJson = JSON.stringify(params);
        dispatch(storePasswordUpdateBegin());
        return fetch(`${BASE_URL}User/UpdatePassword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: dataJson
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('Wrong user password');
                    }
                    
                    if (response.status === 404)
                        throw new Error('Wrong user id');
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
    return dispatch => {
        let dataJson = JSON.stringify(params);
        dispatch(storeProfileUpdatesBegin);
        return fetch(`${BASE_URL}User/UpdateProfile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: dataJson
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => {
                dispatch(storeProfileUpdatesFailure(error));
            });
    };
};

