import { createDrawerNavigator } from 'react-navigation';
import ScheduleScreen from '../Screens/ScheduleScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import CustomDrawerContent from './CustomDrawerContentComponent';
import { connect } from 'react-redux';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

export const AppNavigator = createDrawerNavigator({
    Schedule: { screen: ScheduleScreen },
    Settings: { screen: SettingsScreen }
},
    {
        initialRouteName: "Schedule",
        drawerPosition: 'left',
        contentComponent: CustomDrawerContent,
    }
)

export const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.navigation,
);
const Apps = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.navigation,
});

export default connect(mapStateToProps)(Apps);