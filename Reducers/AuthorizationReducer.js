import {ENTER_LOGIN,
        ENTER_PASSWORD,
        VALIDATE_LOGIN,
        VALIDATE_PASSWORD,
        SEND_AUTHORIZATION_BEGIN,
        SEND_AUTHORIZATION_SUCCESS,
        SEND_AUTHORIZATION_FAILURE
    } from '../Actions/authorizationActions';

const initialState = {
    Login: '',
    PasswordHash: '',
    isLoading: false,
    LoginError: '',
    PasswordError: '',
    sendingError: null,
}

export default function authorizationReducer(state = initialState, action) {
    let error;
    switch (action.type) {
        case ENTER_LOGIN:
            return {...state, Login: action.payload.login};

        case ENTER_PASSWORD:
            return {...state, PasswordHash: action.payload.pass};

        case VALIDATE_LOGIN: {
            loginNotSet = state.Login.trim() === "" ? "Please enter Login" : "";
            loginNotMatch = state.Login.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? "" : "Set email that matches the pattern";
            if (loginNotSet){
                return {...state, LoginError: loginNotSet};
            }
            else if (loginNotMatch) {
                return {...state, LoginError: loginNotMatch};
            }
            return {...state, LoginError: ""};
        }

        case VALIDATE_PASSWORD: {
            passwordNotSet = state.PasswordHash.trim() === "" ? "Please enter the Password" : "";

            if (passwordNotSet)
                return { ...state, PasswordError: passwordNotSet }

            return { ...state, PasswordError: "" }
        }

        case SEND_AUTHORIZATION_BEGIN:
            return {...state, isLoading: true, sendingError: null};

        case SEND_AUTHORIZATION_FAILURE:
            return {...state, isLoading: false, sendingError: action.payload.error};

        case SEND_AUTHORIZATION_SUCCESS:
            return {...state, isLoading: false, Login: "", PasswordHash: ""};

        default:
            return state;
    }
}