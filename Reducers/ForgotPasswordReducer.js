import {
    ENTER_EMAIL,
    ENTER_CODE,
    VALIDATE_EMAIL,
    VALIDATE_CODE,
    SEND_EMAIL_BEGIN,
    SEND_EMAIL_SUCCSESS,
    SEND_EMAIL_FAILURE,
    SEND_CODE_BEGIN,
    SEND_CODE_SUCCSESS,
    SEND_CODE_FAILURE,
} from '../Actions/forgotPasswordActions';

import {
    ENTER_PASSWORD,
    VALIDATE_PASS,
    SEND_PASSWORD_BEGIN,
    SEND_PASSWORD_SUCCSESS,
    SEND_PASSWORD_FAILURE
} from '../Actions/resetPasswordActions';

const initialState = {
    Email: '',
    Code: '',
    Password: '',
    EmailError: '',
    CodeError: '',
    PasswordError: '',
    isLoaded: false,
    emailSendingError: null,
    codeSendingError: null,
    passSendingError: null
}

export default function forgotPasswordReducer(state = initialState, action){
    let error;
    switch (action.type){
        case ENTER_EMAIL:
            return {...state, Email: action.payload.email};
        case ENTER_CODE:
            return {...state, Code: action.payload.code};
        case ENTER_PASSWORD:
            return {...state, Password: action.payload.password};
        case VALIDATE_EMAIL: {
            emailNotSet = state.Email.trim() === "" ? "Please enter Login" : "";
            mailNotMatch = state.Email.trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? "" : "Invalid email address";
            if (emailNotSet){
                 return {...state, EmailError: emailNotSet};
            }
            else if (mailNotMatch) {
                return {...state, EmailError: mailNotMatch};
            }
            return {...state, EmailError: ""};
        }
        case VALIDATE_CODE: {
            codeNotSet = state.Code.trim() === "" ? "Please enter code" : "";
            codeNotValid = state.Code.length > 4 || state.Code.length < 4 ? "Code must have only 4 numbers" : "";
            if (codeNotSet){
                return {...state, CodeError: codeNotSet}
            } else if (codeNotValid){
                return {...state, CodeError: codeNotValid}
            }
            return {...state, CodeError: ""};
        }
        case VALIDATE_PASS: {
            passNotSet = state.Password.trim() === "" ? "Please enter the Password" : "";
            passTooShort = state.Password.length < 6 ? "Too short" : "";

            if (passNotSet) {
                return {...state, PasswordError: passNotSet}
            } else if (passTooShort){
                return {...state, PasswordError: passTooShort}
            }
            return {...state, PasswordError: ""};
        }
        case SEND_EMAIL_BEGIN:
            return {...state, isLoaded: true, emailSendingError: null};

        case SEND_EMAIL_FAILURE:
            return {...state, isLoaded: false, emailSendingError: action.payload.error};

        case SEND_EMAIL_SUCCSESS:
            return {...state, isLoaded: false, Email: ""};
        
        case SEND_CODE_BEGIN:
            return {...state, isLoaded: true, codeSendingError: null};
        
        case SEND_CODE_FAILURE:
            return {...state, isLoaded: false, codeSendingError: action.payload.error};
        
        case SEND_CODE_SUCCSESS:
            return {...state, isLoaded: false, Code: ""};
        case SEND_PASSWORD_BEGIN:
            return {...state, isLoaded: true, passSendingError: null};
        case SEND_PASSWORD_FAILURE:
            return {...state, isLoaded: false, passSendingError: action.payload.error};
        case SEND_PASSWORD_SUCCSESS:
            return {...state, isLoaded: false, Password: ""};

        default:
            return state;
    }
}