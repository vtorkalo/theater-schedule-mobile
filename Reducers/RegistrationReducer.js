import {
    ENTER_REGISTRATION_FIRSTNAME,
    ENTER_REGISTRATION_BIRTHDATE,
    ENTER_REGISTRATION_CITY,
    ENTER_REGISTRATION_EMAIL,
    ENTER_REGISTRATION_PASSWORD,
    ENTER_REGISTRATION_CONFIRM_PASSWORD,
    ENTER_REGISTRATION_TELEPHONE,
    ENTER_REGISTRATION_COUNTRY,
    ENTER_REGISTRATION_LASTNAME,
    VALIDATE_REGISTRATION_COUNTRY,
    VALIDATE_REGISTRATION_LASTNAME,
    VALIDATE_REGISTRATION_BIRTHDATE,
    VALIDATE_REGISTRATION_CITY,
    VALIDATE_REGISTRATION_EMAIL,
    VALIDATE_REGISTRATION_FIRSTNAME,
    VALIDATE_REGISTRATION_PASSWORD,
    VALIDATE_REGISTRATION_CONFIRM_PASSWORD,
    VALIDATE_REGISTRATION_TELEPHONE,
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
    LastName: "",
    Country: "",
    LastNameError: "",
    CountryError: "",
    ConfirmPassword: "",
    LastName:"",
    Country:"",
    LastNameError:"",
    CountryError:"",
    FirstNameError: "",
    CityError: "",
    TelephoneError: "",
    BirthDateError: "",
    EmailError: "",
    PasswordError: "",
    ConfirmPasswordError: "",
    sendingError: null,
    isSending: false,
    PhoneIdentifier: "",
}

export default function registrationReducer(state = initialState, action) {
    let error;
    switch (action.type) {
        case ENTER_REGISTRATION_FIRSTNAME:
            return { ...state, FirstName: action.payload.firstname.trim() };

        case ENTER_REGISTRATION_COUNTRY:
            return { ...state, Country: action.payload.country.trim() }

        case ENTER_REGISTRATION_LASTNAME:
            return { ...state, LastName: action.payload.lastname.trim() }

        case ENTER_REGISTRATION_BIRTHDATE:
            return { ...state, BirthDate: action.payload.birthdate };

        case ENTER_REGISTRATION_CITY:
            return { ...state, City: action.payload.city.trim() }

        case ENTER_REGISTRATION_EMAIL:
            return { ...state, Email: action.payload.email.trim() }

        case ENTER_REGISTRATION_PASSWORD:
            return { ...state, Password: action.payload.password }

        case ENTER_REGISTRATION_TELEPHONE:
            return { ...state, Telephone: action.payload.telephone }

        case ENTER_REGISTRATION_CONFIRM_PASSWORD:
            return {...state, ConfirmPassword:action.payload.confirmPassword}

        case VALIDATE_REGISTRATION_BIRTHDATE: {
            return { ...state, BirthDateError: "" }
        }

        case VALIDATE_REGISTRATION_CITY: {
            error = state.City.trim() === "" ? "Please enter the City" : "";
            return { ...state, CityError: error }
        }

        case VALIDATE_REGISTRATION_EMAIL: {
            emailNotSet = state.Email.trim() === "" ? "Please enter the Email" : "";
            emailNotMatch = state.Email.trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? "" : "Set email that matches the pattern";
            if (emailNotSet)
                return { ...state, EmailError: emailNotSet }
            else if (emailNotMatch)
                return { ...state, EmailError: emailNotMatch }

            return { ...state, EmailError: "" }
        }
        case VALIDATE_REGISTRATION_CONFIRM_PASSWORD:{
            confirmPasswordNotSet = state.ConfirmPassword === "" ? "Please enter Confirm Password" : "";
            passwordsDoNotMatch = state.ConfirmPassword === state.Password ? "" : "Passwords do not match";
            if(confirmPasswordNotSet)
                return {...state, ConfirmPasswordError:confirmPasswordNotSet}
            else if (passwordsDoNotMatch)
                return {...state, ConfirmPasswordError: passwordsDoNotMatch}

            return {...state, ConfirmPasswordError: ""}
        }
        
        case VALIDATE_REGISTRATION_LASTNAME:{
            lastnameNotSet = state.LastName.trim() === "" ? "Please enter the LastName" : "";
            return { ...state, LastNameError: lastnameNotSet }
        }

        case VALIDATE_REGISTRATION_COUNTRY: {
            countryNotSet = state.Country.trim() === "" ? "Please enter the Country" : "";
            return { ...state, CountryError: countryNotSet }
        }

        case VALIDATE_REGISTRATION_FIRSTNAME: {
            error = state.FirstName.trim() === "" ? "Please enter the FirstName" : "";
            return { ...state, FirstNameError: error }
        }

        case VALIDATE_REGISTRATION_PASSWORD: {
            passwordNotSet = state.Password.trim() === "" ? "Please enter the Password" : "";
            passwordTooShort = state.Password.length < 6 ? "Too short" : "";

            if (passwordNotSet)
                return { ...state, PasswordError: passwordNotSet }
            else if (passwordTooShort)
                return { ...state, PasswordError: passwordTooShort }

            return { ...state, PasswordError: "" }
        }

        case VALIDATE_REGISTRATION_TELEPHONE: {
            numberNotSet = state.Telephone.trim() === "" ? "Please enter the Phone number" : "";
            numberNotMatch = state.Telephone.trim().match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) ? "" : "Invalid phone number";
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
            return { ...state, isSending: false, FirstName: "", City: "", Telephone: "", BirthDate: "", Email: "", Password: "", LastName: "", Country: "" }

        default:
            return state;
    }
}