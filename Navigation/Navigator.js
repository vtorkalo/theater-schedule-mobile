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
import EventScreen from "../Screens/EventScreen";
import AboutTheaterScreen from '../Screens/AboutTheaterScreen';
import PerformanceScheduleScreen from '../Screens/PerformanceSchedule';
import EventDetailScreen from '../Screens/EventDetailScreen';
import AuthorizationScreen from '../Screens/AuthorizationScreen';
import UserProfileScreen from '../Screens/UserProfileScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';
import ChangePasswordScreen from '../Screens/ChangePasswordScreen';
import StreamScreen from '../Screens/StreamScreen'
import StreamLanguageScreen from '../Screens/StreamLanguageScreen'
import StreamConnectingScreen from '../Screens/StreamConnectingScreen'
import RegistrationScreen from '../Screens/RegistrationScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import { create } from "uuid-js";
import MessagesScreen from '../Screens/MessagesScreen';
import PollScreen from '../Screens/PollScreen';


const DrawerStack = createDrawerNavigator(
  {
    Schedule: { screen: ScheduleScreen },
    Repertoire: { screen: SliderScreen },
    Stream: { screen: StreamScreen },
    WishList: { screen: WishListScreen },
    Event: { screen: EventScreen },
    Message: { screen: MessageScreen },
    Settings: { screen: SettingsScreen },
    AboutTheater: { screen: AboutTheaterScreen },
    UserProfile: { screen: UserProfileScreen, },
    Messages:{screen:MessagesScreen},
    Message: { screen: MessageScreen },
    Settings: { screen: SettingsScreen },
    AboutTheater: { screen: AboutTheaterScreen },
    Poll:{screen: PollScreen},
  },
  {
    drawerPosition: "left",
    contentComponent: CustomDrawerContent,
    initialRouteName: "Schedule"
  }
);

const DrawerNavigation = createStackNavigator(
  {
    DrawerStack: { screen: DrawerStack },
  },
  {
    headerMode: "none",
    navigationOptions: () => ({
      gesturesEnabled: false
    })
  }
);

const RegistrationStack = createStackNavigator(
  {
    registrationScreen:{screen: RegistrationScreen}
  },
  {
    headerMode: 'none',
  }
);

const AuthorizationStack = createStackNavigator(
  {
    authorizationScreen:{screen: AuthorizationScreen}
  },
  {
    headerMode: 'none',
  }
);

const PerformanceStack = createStackNavigator(
  {
    performanceScreen: { screen: PerformanceScreen }
  },
  {
    headerMode: 'none',
  })


const StreamStack = createStackNavigator(
  {
    streamLanguageScreen: { screen: StreamLanguageScreen }
  },
  {
    headerMode: 'none',
  }
)

export const AppNavigator = createStackNavigator(
  {
    drawerStack: { screen: DrawerNavigation },
    performanceStack: { screen: PerformanceStack },
    Splash: { screen: SplashScreen },
    ChooseLanguage: { screen: LanguageScreen },
    PerformanceSchedule: { screen: PerformanceScheduleScreen },
    eventDetailScreen: { screen: EventDetailScreen },
    EditProfile: { screen: EditProfileScreen },
    ChangePassword: { screen: ChangePasswordScreen },
    streamLanguageScreen: { screen: StreamLanguageScreen },
    streamConnectingScreen:{screen: StreamConnectingScreen},
    registrationScreen:{screen: RegistrationStack},
    forgotPasswordScreen: {screen: ForgotPasswordScreen},
    authorizationScreen:{screen: AuthorizationStack},
    streamLanguageScreen: { screen: StreamLanguageScreen },
    streamConnectingScreen:{screen:StreamConnectingScreen},
    Authorization: { screen: AuthorizationStack },
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
