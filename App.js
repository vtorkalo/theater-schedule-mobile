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
import excursionReducer from "./Reducers/excursionReducer";
import promoActionReducer from "./Reducers/PromoActionReducer";
import performanceScheduleReducer from "./Reducers/performanceScheduleReducer";
import { Root } from "native-base";

const appReducer = combineReducers({
  i18nState,
  performanceReducer,
  sliderActiveSlide: sliderReducer,
  scheduleReducer: scheduleReducer,
  wishListReducer: wishListReducer,
  settings,
  excursionReducer,
  message,
  promoActionReducer,
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
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
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
