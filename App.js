import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AsyncStorage, NetInfo } from 'react-native';
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
import registration from "./Reducers/RegistrationReducer";
import poll from "./Reducers/PollReducer";
import thunk from "redux-thunk";
import { loadSettings, loadSettingsSuccess, loadSettingsBegin } from "./Actions/settingsActions";
import { setAppReady, setLoggedIn } from './Actions/AppActions/AppActionCreators';
import DeviceInfo from "react-native-device-info";
import performanceReducer from "./Reducers/PerformanceReducer";
import authorization from "./Reducers/AuthorizationReducer.js";
import AppNavigator from "./AppNavigatorComponent";
import { Notifications, Font } from "expo";
import eventReducer from "./Reducers/eventReducer";
import performanceScheduleReducer from "./Reducers/performanceScheduleReducer";
import streamReducer from "./Reducers/StreamReducer";
import forgotPassword from './Reducers/ForgotPasswordReducer';
import { Root } from "native-base";
import { AppLoading } from 'expo';
import editUser from './Reducers/EditUserReducer';
import { setLanguage } from "redux-i18n";



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
  performanceSchedule: performanceScheduleReducer,
  authorization,
  streamReducer,
  registration,
  forgotPassword,
  poll,
  editUser,
});

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

let deviceId = Expo.Constants.deviceId


export default class App extends Component {
  state = {
    fontsLoaded: false,
  };

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


  afterFontsLoaded() {
    AsyncStorage.setItem("deviceID", deviceId);
    store.dispatch(loadSettings(deviceId));
    Notifications.addListener(notification => { });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => {
            this.afterFontsLoaded();
            this.setState({ fontsLoaded: true })
          }}
          onError={console.warn}
        />
      );
    }
    
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
