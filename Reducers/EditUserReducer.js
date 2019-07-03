import {
    STORE_PROFILE_UPDATES_BEGIN,
    STORE_PROFILE_UPDATES_SUCCESS,
    STORE_PROFILE_UPDATES_FAILURE,
    STORE_PASSWORD_UPDATE_BEGIN,
    STORE_PASSWORD_UPDATE_SUCCESS,
    STORE_PASSWORD_UPDATE_FAILURE,
} from 'TheaterSchedule/Actions/EditUserActions/EditUserActionTypes';

const initialState = {
    loading: false,
    error: null,
    updatedUser: {}
};

export default function editUserReducer(state = initialState, action) {
    switch (action.type) {
        case STORE_PASSWORD_UPDATE_BEGIN:
        case STORE_PROFILE_UPDATES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case STORE_PASSWORD_UPDATE_FAILURE:
        case STORE_PROFILE_UPDATES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case STORE_PASSWORD_UPDATE_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: null
            };
        case STORE_PROFILE_UPDATES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                updatedUser: action.payload.updatedUser
            };
        default:
            return state;
    }
}