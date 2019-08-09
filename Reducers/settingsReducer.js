import moment from "moment";
import "moment/locale/uk";

import {
  LOAD_SETTINGS_BEGIN,
  LOAD_SETTINGS_SUCCESS,
  LOAD_SETTINGS_FAILURE,
  STORE_SETTINGS_BEGIN,
  STORE_SETTINGS_SUCCESS,
  STORE_SETTINGS_FAILURE,
  LOAD_SETTINGS_TIMEOUT
} from "../Actions/settingsActions";

const initialState = {
  deviceId: null,
  settings: {},
  moment: moment,
  loading: false,
  error: null,
  timeout:false,
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

    case LOAD_SETTINGS_SUCCESS: {
      state.moment.locale(action.payload.settings.languageCode);
      return {
        ...state,
        loading: false,
        deviceId: action.payload.deviceId,
        settings: { ...action.payload.settings },
      };
    }
    case STORE_SETTINGS_SUCCESS: {
      state.moment.locale(action.payload.settings.languageCode);
      return {
        ...state,
        loading: false,
        settings: { ...action.payload.settings }
      };
    }
    case LOAD_SETTINGS_TIMEOUT:{
      console.log("timeout")
      return{
        ...state,
        timeout:true,
      };
    }

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
