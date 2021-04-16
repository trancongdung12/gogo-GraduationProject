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
import AddressPicker from '../screens/Sender/Order/AddressPicker';
import Rating from '../screens/Sender/Notification/Rating';
import MapSender from '../screens/Sender/Status/Map';
//trucker
import TruckerHome from '../screens/Trucker/Home';
import TruckerOrder from '../screens/Trucker/Order';
import TruckerDetail from '../screens/Trucker/Order/Detail';
import TruckerNotification from '../screens/Trucker/Notification';
import TruckerProfile from '../screens/Trucker/User';
import CompleteTruckerRegister from '../screens/Trucker/Auth/CompleteRegister';
import OrderProcess from '../screens/Trucker/Order/Process';
import MapTrucker from '../screens/Trucker/Order/Map';

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
    'AddressPicker',
    () => ReduxProvider(AddressPicker),
    () => AddressPicker,
  );
  Navigation.registerComponent(
    'OptionScreen',
    () => ReduxProvider(OptionScreen),
    () => OptionScreen,
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
  Navigation.registerComponent(
    'Rating',
    () => ReduxProvider(Rating),
    () => Rating,
  );
  Navigation.registerComponent(
    'MapSender',
    () => ReduxProvider(MapSender),
    () => MapSender,
  );
  //trucker
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
    'CompleteTruckerRegister',
    () => ReduxProvider(CompleteTruckerRegister),
    () => CompleteTruckerRegister,
  );
  Navigation.registerComponent(
    'TruckerHome',
    () => ReduxProvider(TruckerHome),
    () => TruckerHome,
  );
  Navigation.registerComponent(
    'TruckerOrder',
    () => ReduxProvider(TruckerOrder),
    () => TruckerOrder,
  );
  Navigation.registerComponent(
    'TruckerNotification',
    () => ReduxProvider(TruckerNotification),
    () => TruckerNotification,
  );
  Navigation.registerComponent(
    'TruckerProfile',
    () => ReduxProvider(TruckerProfile),
    () => TruckerProfile,
  );
  Navigation.registerComponent(
    'TruckerDetail',
    () => ReduxProvider(TruckerDetail),
    () => TruckerDetail,
  );
  Navigation.registerComponent(
    'OrderProcess',
    () => ReduxProvider(OrderProcess),
    () => OrderProcess,
  );
  Navigation.registerComponent(
    'MapTrucker',
    () => ReduxProvider(MapTrucker),
    () => MapTrucker,
  );
}
