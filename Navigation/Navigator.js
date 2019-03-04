import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import ScheduleScreen from "../Screens/ScheduleScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import MessageScreen from "../Screens/messageScreen";
import CustomDrawerContent from "./CustomDrawerContentComponent";
import { connect } from "react-redux";
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import SliderScreen from "../Screens/SliderScreen";
import WishListScreen from '../Screens/WishListScreen';
import PerformanceScreen from '../Screens/PerformanceScreen';
import SplashScreen from "../Screens/SplashScreen";
import LanguageScreen from "../Screens/LanguageScreen";
import AboutTheaterScreen from '../Screens/AboutTheaterScreen';

const DrawerStack = createDrawerNavigator(
  {
    Schedule: { screen: ScheduleScreen },
    Settings: { screen: SettingsScreen },
    Repertoire: { screen: SliderScreen },
    WishList: { screen: WishListScreen },
    Message: { screen: MessageScreen },
    AboutTheater: { screen: AboutTheaterScreen },
  },
  {
    drawerPosition: "left",
    contentComponent: CustomDrawerContent,
    initialRouteName: "Schedule"
  }
);

const DrawerNavigation = createStackNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  {
    headerMode: "none",
    navigationOptions: () => ({
      gesturesEnabled: false
    })
  }
);

const PerformanceStack = createStackNavigator(
  {
    performanceScreen: { screen: PerformanceScreen }
  },
  {
    headerMode: 'none',
  })

export const AppNavigator = createStackNavigator(
  {
    drawerStack: { screen: DrawerNavigation },
    performanceStack: { screen: PerformanceStack },
    Splash: { screen: SplashScreen },
    ChooseLanguage: { screen: LanguageScreen },
  },
  {
    headerMode: "none",
    initialRouteName: "Splash"
  }
);
export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
);
const Apps = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = state => ({
  state: state.navigation
});

export default connect(mapStateToProps)(Apps);
