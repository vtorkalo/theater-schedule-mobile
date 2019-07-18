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

const initialState = {
    Email: '',
    Code: '',
    EmailError: '',
    CodeError: '',
    isLoading: false,
    sendingError: null,
}

export default function forgotPasswordReducer(state = initialState, action){
    let error;
    switch (action.type){
        case ENTER_EMAIL:
            return {...state, Email: action.payload.email};
        case ENTER_CODE:
            return {...state, Code: action.payload.code};
        case VALIDATE_EMAIL: {
            emailNotSet = state.Email.trim() === "" ? "Please enter Login" : "";
            emailNotMatch = state.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? "" : "Set email that matches the pattern";
            if (emailNotSet){
                 return {...state, EmailError: emailNotSet};
            }
            else if (emailNotMatch) {
                return {...state, EmailError: emailNotMatch};
            }
            return {...state, EmailError: ""};
        }
        case VALIDATE_CODE: {
            codeNotSet = state.Code.trim() === "" ? "Please enter code" : "";
            if (codeNotSet){
                return {...state, CodeError: codeNotSet}
            }
            return {...state, CodeError: ""};
        }
        case SEND_EMAIL_BEGIN:
            return {...state, isLoading: true, sendingError: null};

        case SEND_EMAIL_FAILURE:
            return {...state, isLoading: false, sendingError: action.payload.error};

        case SEND_EMAIL_SUCCSESS:
            return {...state, isLoading: false, Email: ""};
        
        case SEND_CODE_BEGIN:
            return {...state, isLoading: true, sendingError: null};
        
        case SEND_CODE_FAILURE:
            return {...state, isLoading: false, sendingError: action.payload.error};
        
        case SEND_CODE_SUCCSESS:
            return {...state, isLoading: false, Code: ""};

        default:
            return state;
    }
}