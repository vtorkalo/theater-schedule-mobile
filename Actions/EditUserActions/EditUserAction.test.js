import {
    STORE_PASSWORD_UPDATE_BEGIN,
    STORE_PASSWORD_UPDATE_FAILURE,
    STORE_PASSWORD_UPDATE_SUCCESS,
    STORE_PROFILE_UPDATES_BEGIN,
    STORE_PROFILE_UPDATES_FAILURE,
    STORE_PROFILE_UPDATES_SUCCESS,
} from './EditUserActionTypes';
import {
    storePasswordUpdateBegin,
    storePasswordUpdateFailure,
    storePasswordUpdateSuccess,
    storeProfileUpdatesBegin,
    storeProfileUpdatesFailure,
    storeProfileUpdatesSuccess,
    updateUserPassword,
    updateUserProfile,
} from './EditUserActionCreators'

describe('>>>A C T I O N --- Test action creators', () => {
    it('+++ actionCreator storePasswordUpdateBegin', () => {
        const expected = storePasswordUpdateBegin()
        expect(expected).toEqual({ type: STORE_PASSWORD_UPDATE_BEGIN })
    });
});