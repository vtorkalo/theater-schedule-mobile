import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import defaultReducer from './Reducers/Reducer';
import navigation from './Reducers/NavigationReducer';
import scheduleReducer from './Reducers/ScheduleReducer';
import settings from "./Reducers/settingsReducer";
import { middleware } from "./Navigation/Navigator";
import { translations } from "./Localization/translations";
import I18n, { i18nState } from "redux-i18n";
import Navigator from "./Navigation/Navigator";
import sliderReducer from './Reducers/SliderReducer';
import thunk from "redux-thunk";
import { loadSettings } from "./Actions/settingsActions";
import DeviceInfo from "react-native-device-info";

const appReducer = combineReducers({
  i18nState,
  navigation,
  scheduleReducer: scheduleReducer,
  defaultReducer,
  sliderActiveSlide: sliderReducer,
  settings,
  defaultReducer
});

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

let deviceId =
  Expo.Constants.appOwnership == "expo"
    ? Expo.Constants.deviceId
    : DeviceInfo.getUniqueID();

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadSettings(deviceId));
  }

  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="ua" fallbackLang="en">
          <Navigator />
        </I18n>
      </Provider>
    );
  }
}
