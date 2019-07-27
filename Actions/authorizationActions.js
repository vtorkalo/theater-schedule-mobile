import BASE_URL from '../baseURL';

export const ENTER_LOGIN = "ENTER_LOGIN";
export const ENTER_PASSWORD = "ENTER_PASSWORD";

export const VALIDATE_LOGIN = "VALIDATE_LOGIN";
export const VALIDATE_PASSWORD = "VALIDATE_PASSWORD";

export const SEND_AUTHORIZATION_BEGIN = "SEND_AUTHORIZATION_BEGIN";
export const SEND_AUTHORIZATION_SUCCESS = "SEND_AUTHORIZATION_SUCCESS";
export const SEND_AUTHORIZATION_FAILURE = "SEND_AUTHORIZATION_FAILURE";

export const enterAuthLogin = login => ({
    type: ENTER_LOGIN,
    payload: {login}
})

export const enterAuthPass = pass => ({
    type: ENTER_PASSWORD,
    payload: {pass}
})

export const validateLogin = () => ({
    type: VALIDATE_LOGIN
})

export const validatePassword = () => ({
    type: VALIDATE_PASSWORD
})

export const sendAuthBegin = () => ({
    type: SEND_AUTHORIZATION_BEGIN
})

export const sendAuthSuccess = () => ({
    type: SEND_AUTHORIZATION_SUCCESS
})

export const sendAuthFailure = (error) => ({
    type: SEND_AUTHORIZATION_FAILURE,
    payload: {error}
})

export const sendAuthorization = (Params) => {
    return (dispatch, getState) => {
        const {loginError, passwordError} = getState().authorization;
        if (loginError || passwordError) return;
        let dataJson = JSON.stringify(Params);
        dispatch(sendAuthBegin());
        return fetch(`${BASE_URL}Authorization`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: dataJson
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Something went wrong. Try again.");
                }
                dispatch(sendAuthSuccess());
                return response.json();
            })
            .catch(error => {
                dispatch(sendAuthFailure(error));
            });
    };
};