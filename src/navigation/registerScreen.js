import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import Screen
import Intro from '../screens/Sender/Intro';
import SendOTP from '../screens/Sender/Auth/SendOTP';
import ConfirmOTP from '../screens/Sender/Auth/ConfirmOTP';
import SenderRegister from '../screens/Sender/Auth/SenderRegister';
import CompleteRegister from '../screens/Sender/Auth/CompleteRegister';
import Login from '../screens/Sender/Auth/Login';
import Home from '../screens/Sender/Home';
import Status from '../screens/Sender/Status';
import Order from '../screens/Sender/Order';
import Notification from '../screens/Sender/Notification';
import User from '../screens/Sender/User';
import Map from '../screens/Sender/Order/map';
import OptionScreen from '../screens/Sender/Auth/OptionScreen';
import TruckerRegister from '../screens/Trucker/Auth/Register';
import TruckerRegisterInfo from '../screens/Trucker/Auth/RegisterInfo';
import Bill from '../screens/Sender/Bill';
import Chatting from '../screens/Sender/Chatting';
import Messages from '../screens/Sender/Chatting/Messages';
import OrderDetail from '../screens/Sender/Status/orderDetail';
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
    'OrderDetail',
    () => ReduxProvider(OrderDetail),
    () => OrderDetail,
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
    'Map',
    () => ReduxProvider(Map),
    () => Map,
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
    'TruckerRegisterInfo',
    () => ReduxProvider(TruckerRegisterInfo),
    () => TruckerRegisterInfo,
  );
  Navigation.registerComponent(
    'Bill',
    () => ReduxProvider(Bill),
    () => Bill,
  );
  Navigation.registerComponent(
    'Chatting',
    () => ReduxProvider(Chatting),
    () => Chatting,
  );
  Navigation.registerComponent(
    'Messages',
    () => ReduxProvider(Messages),
    () => Messages,
  );
}
