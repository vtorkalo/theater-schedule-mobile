import {
  LOAD_SETTINGS_BEGIN,
  LOAD_SETTINGS_SUCCESS,
  LOAD_SETTINGS_FAILURE,
  STORE_SETTINGS_BEGIN,
  STORE_SETTINGS_SUCCESS,
  STORE_SETTINGS_FAILURE
} from "../Actions/settingsActions";

const initialState = {
  settings: {},
  loading: false,
  error: null
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SETTINGS_BEGIN:
    case STORE_SETTINGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_SETTINGS_SUCCESS:
    case STORE_SETTINGS_SUCCESS:
      const settings = { ...action.payload.settings };
      return {
        ...state,
        loading: false,
        settings: settings
      };

    case LOAD_SETTINGS_FAILURE:
    case STORE_SETTINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
