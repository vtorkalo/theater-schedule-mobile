import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import defaultReducer from "./Reducers/Reducer";
import navigation from "./Reducers/NavigationReducer";
import scheduleReducer from "./Reducers/ScheduleReducer";
import settings from "./Reducers/settingsReducer";
import message from "./Reducers/messageReducer";
import { middleware } from "./Navigation/Navigator";
import { translations } from "./Localization/translations";
import I18n, { i18nState } from "redux-i18n";
import Navigator from "./Navigation/Navigator";
import sliderReducer from "./Reducers/SliderReducer";
import thunk from "redux-thunk";
import { loadSettings, saveDeviceId } from "./Actions/settingsActions";
import DeviceInfo from "react-native-device-info";
import { fetchPosters } from './Actions/sliderActions';
import { setLanguage } from "redux-i18n";
import performanceReducer from './Reducers/PerformanceReducer';

const appReducer = combineReducers({
  i18nState,
  sliderActiveSlide: sliderReducer,
  scheduleReducer: scheduleReducer,
  performanceReducer,
  settings,
  message,
  defaultReducer,
  navigation,
});

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

let deviceId =
  Expo.Constants.appOwnership == "expo"
    ? Expo.Constants.deviceId
    : DeviceInfo.getUniqueID();

export default class App extends Component {
  componentWillMount() {
    store.dispatch(saveDeviceId(deviceId));
    store.dispatch(loadSettings(deviceId));
  }

  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="uk" fallbackLang="en">
          <Navigator />
        </I18n>
      </Provider>
    );
  }
}
