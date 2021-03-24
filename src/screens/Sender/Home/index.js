import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../themes/Colors';
import Coupon from '../../../components/Coupon';
import Event from '../../../components/Event';
import News from '../../../components/News';
import Header from '../../../components/Header';
import { useSelector } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';
import { pushScreen } from '../../../navigation/pushScreen';
const Home = (props) => {
  const user = useSelector((state) => state.user.data);
  useEffect(() => {
    Firebase.initializeApp({
      apiKey:
        'AAAAjs5rYec:APA91bF0Vy1G_F1b87tAPEUn8mQedKnkMJm8xssPd2oHv6LhgCpIxqo8o5rJtUBUW4Ze0xdB4is7k1Eu0sbeJiLPQiPSr-CDjiCfh-eNak14UvJdPw1X6Ba2ewOKlFOInhI-k37GjDRR',
    });
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
        if (notification.action === 'Xem') {
          pushScreen(props.componentId, 'Status', '', '', false);
        }
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  const pushNotify = () => {
    PushNotification.localNotification({
      title: 'Đang tìm tài xế 📣',
      largeIconUrl: 'https://icon-library.com/images/go-to-icon/go-to-icon-9.jpg',
      message: 'Đơn hàng của bạn đã được đặt thành công! GoGo đang tìm tài xế cho bạn',
      invokeApp: false,
      actions: ['Xem'],
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.layoutHeader}>
        <Header title={`Xin chào ${user.full_name}!`} isWhite={true} Id={props.componentId} />
        <View style={styles.addressContainer}>
          <TouchableOpacity style={styles.itemInput} onPress={() => pushNotify()}>
            <Icon style={styles.icon} name="enviroment" size={20} color="red" />
            <Text style={styles.input}>101B Lê Hữu Trác, Sơn Trà, Đà Nẵng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.layoutContainer}>
        <Text style={styles.titleCoupon}>Ưu đãi cho người mới bắt đầu</Text>
        <Coupon />
        <Coupon />
        <Text style={styles.titleEvent}>Sự kiện chào mừng ra mắt</Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.layoutEvent} horizontal>
          <Event />
          <Event />
          <Event />
        </ScrollView>
        <Text style={styles.titleEvent}>Tin tức</Text>
        <News />
        <News />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutHeader: {
    paddingTop: 20,
    backgroundColor: '#2C376A',
    paddingBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  addressContainer: {
    paddingHorizontal: 15,
  },
  itemInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    height: 40,
    marginTop: 20,
  },
  input: {
    justifyContent: 'center',
    color: colors.grayPlace,
    marginLeft: 10,
  },
  layoutContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  titleCoupon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  titleEvent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 20,
  },
  layoutEvent: {
    marginLeft: -15,
  },
});
export default Home;
