import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../themes/Colors';
import Coupon from '../../components/Coupon';
import event from '../../assets/image/event.jpg';
import Event from '../../components/Event';

const windowWidth = Dimensions.get('window').width;
const Notification = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.layoutHeader}>
        <View style={styles.itemHeader}>
          <Text style={styles.title}>Xin chào Nguyễn Văn A!</Text>
          <View style={styles.layoutMessage}>
            <Icons name="comments" size={30} color="white" />
            <View style={styles.borderCircle}>
              <Text style={styles.messageCount}>1</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.itemInput}>
          <Icon style={styles.icon} name="enviroment" size={20} color="red" />
          <Text style={styles.input}>101B Lê Hữu Trác, Sơn Trà, Đà Nẵng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.layoutContainer}>
        <Text style={styles.titleCoupon}>Ưu đãi cho người mới bắt đầu</Text>
        <Coupon />
        <Coupon />
        <Text style={styles.titleEvent}>Sự kiện chào mừng ra mắt</Text>
        <ScrollView style={styles.layoutEvent} horizontal>
          <Event />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutHeader: {
    paddingHorizontal: 15,
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
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  borderCircle: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 7.5,
    width: 15,
    height: 15,
    alignItems: 'center',
    left: 20,
  },
  messageCount: {
    color: 'white',
    fontSize: 10,
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
});
export default Notification;
