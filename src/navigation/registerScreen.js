import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import Screen
import Intro from '../screens/Intro';
import SendOTP from '../screens/Auth/SendOTP';
import ConfirmOTP from '../screens/Auth/ConfirmOTP';
import SenderRegister from '../screens/Auth/SenderRegister';
import CompleteRegister from '../screens/Auth/CompleteRegister';
import Login from '../screens/Auth/Login';
import Home from '../screens/Home';
import Status from '../screens/Status';
import Order from '../screens/Order';
import Notification from '../screens/Notification';
import User from '../screens/User';
import Depart from '../screens/Order/depart';
import OptionScreen from '../screens/Auth/OptionScreen';
import TruckerRegister from '../screens/Auth/TruckerRegister';
import TruckerRegisterStep2 from '../screens/Auth/TruckerRegisterStep2';
function ReduxProvider(Component) {
  return (props) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export function registerScreens() {
  Navigation.registerComponent(
    'Intro',
    () => ReduxProvider(Intro),
    () => Intro,
  );
  Navigation.registerComponent(
    'SendOTP',
    () => ReduxProvider(SendOTP),
    () => SendOTP,
  );
  Navigation.registerComponent(
    'ConfirmOTP',
    () => ReduxProvider(ConfirmOTP),
    () => ConfirmOTP,
  );
  Navigation.registerComponent(
    'SenderRegister',
    () => ReduxProvider(SenderRegister),
    () => SenderRegister,
  );
  Navigation.registerComponent(
    'CompleteRegister',
    () => ReduxProvider(CompleteRegister),
    () => CompleteRegister,
  );
  Navigation.registerComponent(
    'Login',
    () => ReduxProvider(Login),
    () => Login,
  );
  Navigation.registerComponent(
    'Home',
    () => ReduxProvider(Home),
    () => Home,
  );
  Navigation.registerComponent(
    'Status',
    () => ReduxProvider(Status),
    () => Status,
  );
  Navigation.registerComponent(
    'Order',
    () => ReduxProvider(Order),
    () => Order,
  );
  Navigation.registerComponent(
    'Notification',
    () => ReduxProvider(Notification),
    () => Notification,
  );
  Navigation.registerComponent(
    'User',
    () => ReduxProvider(User),
    () => User,
  );
  Navigation.registerComponent(
    'Depart',
    () => ReduxProvider(Depart),
    () => Depart,
  );
  Navigation.registerComponent(
    'OptionScreen',
    () => ReduxProvider(OptionScreen),
    () => OptionScreen,
  );
  Navigation.registerComponent(
    'TruckerRegister',
    () => ReduxProvider(TruckerRegister),
    () => TruckerRegister,
  );
  Navigation.registerComponent(
    'TruckerRegisterStep2',
    () => ReduxProvider(TruckerRegisterStep2),
    () => TruckerRegisterStep2,
  );
}
