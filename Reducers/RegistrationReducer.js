import {
    ENTER_REGISTRATION_FIRSTNAME,
    ENTER_REGISTRATION_BirthDate,
    ENTER_REGISTRATION_CITY,
    ENTER_REGISTRATION_Email,
    ENTER_REGISTRATION_Password,
    ENTER_REGISTRATION_Telephone,
    VALIDATE_REGISTRATION_BirthDate,
    VALIDATE_REGISTRATION_CITY,
    VALIDATE_REGISTRATION_Email,
    VALIDATE_REGISTRATION_FIRSTNAME,
    VALIDATE_REGISTRATION_PASSWORD,
    VALIDATE_REGISTRATION_Telephone,
    SEND_REGISTRATION_BEGIN,
    SEND_REGISTRATION_FAILURE,
    SEND_REGISTRATION_SUCCESS
} from "../Actions/RegistrationActions";

const initialState = {
    FirstName: "",
    City: "",
    Telephone: "",
    BirthDate: "",
    Email: "",
    Password: "",
    FirstNameError: "",
    CityError: "",
    TelephoneError: "",
    BirthDateError: "",
    EmailError: "",
    PasswordError: "",
    sendingError: null,
    isSending: false,
    PhoneIdentifier:""
}

export default function registrationReducer(state = initialState, action) {
    let error;
    switch (action.type) {
        case ENTER_REGISTRATION_FIRSTNAME:
            return { ...state, FirstName: action.payload.firstname };

        case ENTER_REGISTRATION_BirthDate:
            return { ...state, BirthDate: action.payload.birthdate };

        case ENTER_REGISTRATION_CITY:
            return { ...state, City: action.payload.city }

        case ENTER_REGISTRATION_Email:
            return { ...state, Email: action.payload.email }

        case ENTER_REGISTRATION_Password:
            return { ...state, Password: action.payload.password }

        case ENTER_REGISTRATION_Telephone:
            return { ...state, Telephone: action.payload.telephone }

        case VALIDATE_REGISTRATION_BirthDate: {
            return { ...state, BirthDateError: error }
        }

        case VALIDATE_REGISTRATION_CITY: {
            error = state.City.trim() === "" ? "Please enter the City" : "";
            return { ...state, CityError: error }
        }

        case VALIDATE_REGISTRATION_Email: {
            emailNotSet = state.Email.trim() === "" ? "Please enter the Email" : "";
            emailNotMatch = state.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? "" : "Set email that match pattern";
            if (emailNotSet)
                return { ...state, EmailError: emailNotSet }
            else if (emailNotMatch)
                return { ...state, EmailError: emailNotMatch }

            return { ...state, EmailError: "" }
        }

        case VALIDATE_REGISTRATION_FIRSTNAME: {
            error = state.FirstName.trim() === "" ? "Please enter the FirstName" : "";
            return { ...state, FirstNameError: error }
        }

        case VALIDATE_REGISTRATION_PASSWORD: {
            error = state.Password.trim() === "" ? "Please enter the Password" : "";
            return { ...state, PasswordError: error }
        }

        case VALIDATE_REGISTRATION_Telephone: {
            numberNotSet = state.Telephone.trim() === "" ? "Please enter the Telephone" : "";
            numberNotMatch = state.Telephone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) ? "" : "Set phone number that match pattern";
            if (numberNotSet)
                return { ...state, TelephoneError: numberNotSet }
            else if (numberNotMatch)
                return { ...state, TelephoneError: numberNotMatch }

            return { ...state, TelephoneError: "" }
        }

        case SEND_REGISTRATION_BEGIN:
            return { ...state, isSending: true, sendingError: null }

        case SEND_REGISTRATION_FAILURE:
            return { ...state, isSending: false, sendingError: action.payload.error }

        case SEND_REGISTRATION_SUCCESS:
            return { ...state, isSending: false, FirstName: "", City: "", Telephone: "", BirthDate: "", Email: "", Password: "" }

        default:
            return state;
    }
}