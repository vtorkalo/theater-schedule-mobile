import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import defaultReducer from './Reducers/Reducer';
import navigation from './Reducers/NavigationReducer';
import { middleware } from './Navigation/Navigator';
import { translations } from "./Localization/translations";
import I18n, { i18nState } from "redux-i18n"
import Navigator from './Navigation/Navigator';
import sliderReducer from './Reducers/SliderReducer';


const appReducer = combineReducers({
  i18nState,
  navigation,
  defaultReducer,
  sliderActiveSlide: sliderReducer
});

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="ua" fallbackLang="en">
          <Navigator />
        </I18n>
      </Provider>
    );
  }
}



