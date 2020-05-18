/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';

const store = configureStore();



const Index = () => (
  <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Index);
