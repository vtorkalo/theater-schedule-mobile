import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import ScheduleScreen from "../Screens/ScheduleScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import MessageScreen from "../Screens/messageScreen";
import CustomDrawerContent from "./CustomDrawerContentComponent";
import { connect } from "react-redux";
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import SliderScreen from "../Screens/SliderScreen";
import LanguageScreen from '../Screens/LanguageScreen';
import PerformanceScreen from '../Screens/PerformanceScreen';

const DrawerStack = createDrawerNavigator(
  {

    Schedule: { screen: ScheduleScreen },
    Settings: { screen: SettingsScreen },
    Repertoire: { screen: SliderScreen },
    Message: { screen: MessageScreen },
   
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

const InitialStack = createStackNavigator(
  {
    initialScreen: { screen: LanguageScreen }
  },
  {
    headerMode: 'none',
  })


const PerformanceStack = createStackNavigator(
  {
    performanceScreen: { screen: PerformanceScreen }
  },
  {
    headerMode: 'none',
  })

export const AppNavigator = createStackNavigator(
  {
    initialStack: { screen: InitialStack },
    drawerStack: { screen: DrawerNavigation },
    performanceStack: { screen: PerformanceStack },
  },
  {
    headerMode: "none",
    initialRouteName: "initialStack"
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
