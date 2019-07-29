import BASE_URL from '../baseURL';

export const ENTER_EMAIL = "ENTER_EMAIL";
export const ENTER_CODE = "ENTER_CODE";
export const VALIDATE_EMAIL = "VALIDATE_EMAIL";
export const VALIDATE_CODE = "VALIDATE_CODE";

export const SEND_EMAIL_BEGIN = "SEND_EMAIL_BEGIN";
export const SEND_EMAIL_SUCCSESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";

export const SEND_CODE_BEGIN = "SEND_CODE_BEGIN";
export const SEND_CODE_SUCCSESS = "SEND_CODE_SUCCESS";
export const SEND_CODE_FAILURE = "SEND_CODE_FAILURE";

export const enterEmail = email => ({
    type: ENTER_EMAIL,
    payload: {email}
});

export const enterCode = code => ({
    type: ENTER_CODE,
    payload: {code}
});

export const validateEmail = () => ({
    type: VALIDATE_EMAIL
});

export const validateCode = () => ({
    type: VALIDATE_CODE
});

export const sendEmailBegin = () => ({
    type: SEND_EMAIL_BEGIN
});

export const sendEmailSuccsess = () => ({
    type: SEND_EMAIL_SUCCSESS
});

export const sendEmailFailure = error => ({
    type: SEND_EMAIL_FAILURE,
    payload: {error}
});

export const sendCodeBegin = () => ({
    type: SEND_CODE_BEGIN
});

export const sendCodeSuccsess = () => ({
    type: SEND_CODE_SUCCSESS
});

export const sendCodeFailure = (error) => ({
    type: SEND_CODE_FAILURE,
    payload: {error}
});

export const sendEmail = (email) => {
    return (dispatch, getState) => {
        const {emailError} = getState().forgotPassword;
        if (emailError) return;
        let data = JSON.stringify(email);
        dispatch(sendEmailBegin());
        return fetch(`${BASE_URL}ForgotPassword/GenerateResetCode`, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: data
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Something went wrong. Try again.")
            }
            dispatch(sendEmailSuccsess());
            return response.json();
        })
        .catch((error) => {
            dispatch(sendEmailFailure(error));
        });
    };
};

export const sendCode = (Params) => {
    return (dispatch, getState) => {
        const {codeError} = getState().forgotPassword;
        if (codeError) return;
        let data = JSON.stringify(Params);
        dispatch(sendCodeBegin());
        return fetch(`${BASE_URL}ForgotPassword/ValidateResetCode`, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: data
        })
        .then((response) =>{
            if (response.status == 410) {
                throw new Error("This validation code timeout expired!")
            }
            else if (!response.ok) {
                throw new Error("Something went wrong. Try again.")
            }
            dispatch(sendCodeSuccsess());
            return response;
        })
        .catch((error) => {
            dispatch(sendCodeFailure(error));
        });
    };
};