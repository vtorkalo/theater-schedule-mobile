import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import defaultReducer from './Reducers/Reducer';
import navigation from './Reducers/NavigationReducer';
import { middleware } from './Navigation/Navigator';
import Navigator from './Navigation/Navigator';

const appReducer = combineReducers({
  navigation,
  defaultReducer,
});

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}



