import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,combineReducers  } from 'redux';
import { Provider } from 'react-redux';
import defaultReducer from './Reducers/Reducer';
import I18n, {i18nState} from "redux-i18n"
import { translations } from "./Localized/translations";


const appReducer = combineReducers({
  defaultReducer,
  i18nState
})

const store = createStore(appReducer);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="ua" fallbackLang="en">
        
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to Theater Schedule!</Text>
            
          </View>
        </I18n>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
