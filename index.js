/** @format */

import {AppRegistry} from 'react-native';
global.PaymentRequest = require('react-native-payments').PaymentRequest;
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
