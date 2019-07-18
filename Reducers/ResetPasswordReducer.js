import {
    ENTER_PASSWORD,
    VALIDATE_PASSWORD,
    SEND_PASSWORD_BEGIN,
    SEND_PASSWORD_SUCCSESS,
    SEND_PASSWORD_FAILURE
} from '../Actions/resetPasswordActions';

const initialState = {
    Password: '',
    PasswordError: '',
    isLoading: false,
    sendingError: null,
}

export default function resetPasswordReducer(state = initialState, action){
    let error;
    switch (action.type){
        case ENTER_PASSWORD:
            return {...state, Password: action.payload.password};
        case VALIDATE_PASSWORD: {
            passwordNotSet = state.Password.trim() === "" ? "Please enter the Password" : "";
            if (passwordNotSet){
                 return {...state, PasswordError: passwordNotSet};
            }
            return {...state, PasswordError: ""};
        }
        case SEND_PASSWORD_BEGIN:
            return {...state, isLoading: true, sendingError: null};

        case SEND_PASSWORD_FAILURE:
            return {...state, isLoading: false, sendingError: action.payload.error};

        case SEND_PASSWORD_SUCCSESS:
            return {...state, isLoading: false, Password: ""};
        
        default:
            return state;
    }
}