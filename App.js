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
import sliderReducer from "./Reducers/SliderReducer";
import wishListReducer from "./Reducers/WishListReducer";
import thunk from "redux-thunk";
import { loadSettings } from "./Actions/settingsActions";
import DeviceInfo from "react-native-device-info";
import performanceReducer from "./Reducers/PerformanceReducer";
import AppNavigator from "./AppNavigatorComponent";
import registerForNotification from "./services/pushNotification";
import { Notifications } from "expo";

const appReducer = combineReducers({
  i18nState,
  performanceReducer,
  sliderActiveSlide: sliderReducer,
  scheduleReducer: scheduleReducer,
  wishListReducer: wishListReducer,
  settings,
  message,
  defaultReducer,
  navigation
});

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

let deviceId =
  Expo.Constants.appOwnership == "expo"
    ? Expo.Constants.deviceId
    : DeviceInfo.getUniqueID();

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadSettings(deviceId));
    registerForNotification();

    Notifications.addListener(notification => {
      //TODO: handle notification
    });
  }

  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="uk" fallbackLang="en">
          <AppNavigator />
        </I18n>
      </Provider>
    );
  }
}
