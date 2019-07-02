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

export const updateUserPassword = (id, oldPassword, newPassword) => {
    return dispatch => {
        let dataJson = JSON.stringify({ id: id, oldPassword: oldPassword, newPassword: newPassword })
        dispatch(storePasswordUpdateBegin());
        fetch(`${BASE_URL}User/UpdatePassword`, {
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

export const updateUserProfile = (id, firstName, lastName, email, phone, birthDate, city, country) => {
    return dispatch => {
        let dataJson = JSON.stringify({
            Id: id,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneIdentifier: phone,
            DateOfBirth: birthDate,
            City: city,
            Country: country
        })
        dispatch(storeProfileUpdatesBegin);
        fetch(`${BASE_URL}User/UpdateProfile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: dataJson
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                dispatch(storeProfileUpdatesSuccess(responseJson));
            })
            .catch(error => {
                dispatch(storeProfileUpdatesFailure(error));
            });
    };
};

