import BASE_URL from '../baseURL';

export const ENTER_PASSWORD = "ENTER_PASSWORD";
export const VALIDATE_PASS = "VALIDATE_PASS";

export const SEND_PASSWORD_BEGIN = "SEND_PASSWORD_BEGIN";
export const SEND_PASSWORD_SUCCSESS = "SEND_PASSWORD_SUCCESS";
export const SEND_PASSWORD_FAILURE = "SEND_PASSWORD_FAILURE";

export const enterPassword = password => ({
    type: ENTER_PASSWORD,
    payload: {password}
});

export const validatePassword = () => ({
    type: VALIDATE_PASS
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

export const sendPassword = (Params) => {
    return (dispatch, getState) => {
        const {passwordError} = getState().forgotPassword;
        if (passwordError) return;
        let data = JSON.stringify(Params);
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
                throw new Error("Something went wrong. Try again.")
            }
            dispatch(sendPasswordSuccsess());
            return response;
        })
        .catch((error) => {
            dispatch(sendPasswordFailure(error));
        });
    };
};