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
import { Notifications, Font } from "expo";
import eventReducer from "./Reducers/eventReducer";
import performanceScheduleReducer from "./Reducers/performanceScheduleReducer";
import { Root } from "native-base";
import { fontLoadingBegin, fontLoadingSuccess } from './Actions/AppActions/AppActionCreators';
import { connect } from 'react-redux';

const appReducer = combineReducers({
  i18nState,
  performanceReducer,
  sliderActiveSlide: sliderReducer,
  scheduleReducer: scheduleReducer,
  wishListReducer: wishListReducer,
  settings,
  eventReducer,
  message,
  defaultReducer,
  navigation,
  performanceSchedule: performanceScheduleReducer
});

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

let deviceId = 
  Expo.Constants.appOwnership == "expo"
      ? Expo.Constants.deviceId
      : DeviceInfo.getUniqueID();

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadSettings(deviceId));

    Notifications.addListener(notification => {
      //TODO: handle notification
    });
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      'Arsenal-Bold': require('./assets/fonts/Arsenal-Bold.ttf'),
      'Arsenal-Italic': require('./assets/fonts/Arsenal-Italic.ttf'),
      'Arsenal-BoldItalic': require('./assets/fonts/Arsenal-BoldItalic.ttf'),
      'Arsenal-Regular': require('./assets/fonts/Arsenal-Regular.ttf')
    });
  }

  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="uk" fallbackLang="en">
          <Root>
            <AppNavigator />
          </Root>
        </I18n>
      </Provider>
    );
  }
}
