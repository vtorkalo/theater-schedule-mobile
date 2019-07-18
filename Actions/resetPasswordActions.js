import BASE_URL from '../baseURL';

export const ENTER_PASSWORD = "ENTER_EMAIL";
export const VALIDATE_PASSWORD = "VALIDATE_EMAIL";

export const SEND_PASSWORD_BEGIN = "SEND_EMAIL_BEGIN";
export const SEND_PASSWORD_SUCCSESS = "SEND_EMAIL_SUCCESS";
export const SEND_PASSWORD_FAILURE = "SEND_EMAIL_FAILURE";

export const enterPassword = password => ({
    type: ENTER_PASSWORD,
    payload: {password}
});

export const validatePassword = () => ({
    type: VALIDATE_PASSWORD
});

export const sendPasswordBegin = () => ({
    type: SEND_PASSWORD_BEGIN
});

export const sendPasswordSuccsess = () => ({
    type: SEND_PASSWORD_SUCCSESS
});

export const sendPasswordFailure = error => ({
    type: SEND_PASSWORD_FAILURE,
    payload: {error}
});

export const sendPassword = (password) => {
    return (dispatch, getState) => {
        const {passwordError} = getState().resetPassword;
        if (passwordError) return;
        let data = JSON.stringify(password);
        dispatch(sendPasswordBegin());
        return fetch(`${BASE_URL}ForgotPassword/ResetPassword`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: data
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response;
        })
        .catch((error) => {
            dispatch(sendPasswordFailure(error));
        });
    };
};