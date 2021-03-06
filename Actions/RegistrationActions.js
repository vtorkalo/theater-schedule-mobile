import BASE_URL from 'TheaterSchedule/baseURL';

export const ENTER_REGISTRATION_FIRSTNAME = "ENTER_REGISTRATION_FIRSTNAME";
export const ENTER_REGISTRATION_CITY = "ENTER_REGISTRATION_CITY";
export const ENTER_REGISTRATION_TELEPHONE = "ENTER_REGISTRATION_TELEPHONE";
export const ENTER_REGISTRATION_BIRTHDATE = "ENTER_REGISTRATION_BIRTHDATE";
export const ENTER_REGISTRATION_EMAIL = "ENTER_REGISTRATION_EMAIL";
export const ENTER_REGISTRATION_PASSWORD = "ENTER_REGISTRATION_PASSWORD";
export const ENTER_REGISTRATION_LASTNAME = "ENTER_REGISTRATION_LASTNAME";
export const ENTER_REGISTRATION_COUNTRY = "ENTER_REGISTRATION_COUNTRY";
export const ENTER_REGISTRATION_CONFIRM_PASSWORD = "ENTER_REGISTRATION_CONFIRM_PASSWORD";

export const VALIDATE_REGISTRATION_LASTNAME = "VALIDATE_REGISTRATION_LASTNAME";
export const VALIDATE_REGISTRATION_COUNTRY = "VALIDATE_REGISTRATION_COUNTRY";
export const VALIDATE_REGISTRATION_FIRSTNAME = "VALIDATE_REGISTRATION_FIRSTNAME";
export const VALIDATE_REGISTRATION_CITY = "VALIDATE_REGISTRATION_CITY";
export const VALIDATE_REGISTRATION_TELEPHONE = "VALIDATE_REGISTRATION_TELEPHONE";
export const VALIDATE_REGISTRATION_BIRTHDATE = "VALIDATE_REGISTRATION_BIRTHDATE";
export const VALIDATE_REGISTRATION_EMAIL = "VALIDATE_REGISTRATION_EMAIL";
export const VALIDATE_REGISTRATION_PASSWORD = "VALIDATE_REGISTRATION_PASSWORD";
export const VALIDATE_REGISTRATION_CONFIRM_PASSWORD = "VALIDATE_REGISTRATION_CONFIRM_PASSWORD";

export const SEND_REGISTRATION_BEGIN = "SEND_REGISTRATION_BEGIN";
export const SEND_REGISTRATION_SUCCESS = "SEND_REGISTRATION_SUCCESS";
export const SEND_REGISTRATION_FAILURE = "SEND_REGISTRATION_FAILURE";

export const enterRegistrationFirstName = firstname => ({
    type: ENTER_REGISTRATION_FIRSTNAME,
    payload: { firstname }
})

export const enterRegistrationCity = city => ({
    type: ENTER_REGISTRATION_CITY,
    payload: { city }
})

export const enterRegistrationLastName = lastname => ({
    type: ENTER_REGISTRATION_LASTNAME,
    payload: { lastname }
})

export const enterRegistrationCountry = country => ({
    type: ENTER_REGISTRATION_COUNTRY,
    payload: { country }
})

export const enterRegistrationTelephone = telephone => ({
    type: ENTER_REGISTRATION_TELEPHONE,
    payload: { telephone }
})

export const enterRegistrationBirthdate = birthdate => ({
    type: ENTER_REGISTRATION_BIRTHDATE,
    payload: { birthdate }
})

export const enterRegistrationEmail = email => ({
    type: ENTER_REGISTRATION_EMAIL,
    payload: { email }
})

export const enterRegistrationPassword = password => ({
    type: ENTER_REGISTRATION_PASSWORD,
    payload: { password }
})

export const enterRegistrationConfirmPassword = confirmPassword => ({
    type: ENTER_REGISTRATION_CONFIRM_PASSWORD,
    payload: {confirmPassword}
})

export const validateRegistrationFirstName = () => ({
    type: VALIDATE_REGISTRATION_FIRSTNAME
})

export const validateRegistrationCity = () => ({
    type: VALIDATE_REGISTRATION_CITY
})

export const validateRegistrationLastName = () => ({
    type: VALIDATE_REGISTRATION_LASTNAME
})

export const validateRegistrationCountry = () => ({
    type: VALIDATE_REGISTRATION_COUNTRY
})

export const validateRegistrationTelephone = () => ({
    type: VALIDATE_REGISTRATION_TELEPHONE
})

export const validateRegistrationBirthdate = () => ({
    type: VALIDATE_REGISTRATION_BIRTHDATE
})

export const validateRegistrationEmail = () => ({
    type: VALIDATE_REGISTRATION_EMAIL
})

export const validateRegistrationPassword = () => ({
    type: VALIDATE_REGISTRATION_PASSWORD
})

export const validateRegistrationConfirmPassword = () => ({
    type: VALIDATE_REGISTRATION_CONFIRM_PASSWORD
})

export const sendRegistrationBegin = () => ({
    type: SEND_REGISTRATION_BEGIN
})

export const sendRegistrationSuccess = () => ({
    type: SEND_REGISTRATION_SUCCESS
})

export const sendRegistrationFailure = (error) => ({
    type: SEND_REGISTRATION_FAILURE,
    payload: { error }
})

export const sendRegistration = (FirstName, City, PhoneNumber, DateOfBirth, Email, Password, LastName, Country) => {
    return (dispatch, getState) => {
        const { firstnameError, cityError, telephoneError, birthdateError, emailError, passwordError, LastNameError, CountryError } = getState().registration;
        if (firstnameError || cityError || telephoneError || birthdateError || emailError || passwordError || LastNameError || CountryError) return;
        let dataJson = JSON.stringify(FirstName, City, PhoneNumber, DateOfBirth, Email, Password, LastName, Country);
        dispatch(sendRegistrationBegin());
        return fetch(`${BASE_URL}Registration/CreateUser/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: dataJson
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response;
            })
            .then(() => {
                dispatch(sendRegistrationSuccess());
            })
            .catch(error => {
                dispatch(sendRegistrationFailure(error.toString()));
            });
    };
};