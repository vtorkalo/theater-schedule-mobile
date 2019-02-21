import { AppNavigator } from '../Navigation/Navigator';
import { CHANGE_SCREEN } from '../Actions/AppActions/AppActionTypes'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('performanceStack'));

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SCREEN: {
            const nextAction = AppNavigator.router.getActionForPathAndParams(action.payload.screenName);
            const nextState = AppNavigator.router.getStateForAction(nextAction);
            return nextState || state;
        }

        default: {
            const nextState = AppNavigator.router.getStateForAction(action, state);
            return nextState || state;
        }
    }
};
