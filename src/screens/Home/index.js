import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../themes/Colors';
import Coupon from '../../components/Coupon';
import Event from '../../components/Event';
import News from '../../components/News';
import Header from '../../components/Header';
const Home = (props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.layoutHeader}>
        <Header title="Xin chào Nguyễn Văn A!" isWhite={true} Id={props.componentId} />
        <View style={styles.addressContainer}>
          <TouchableOpacity style={styles.itemInput}>
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
