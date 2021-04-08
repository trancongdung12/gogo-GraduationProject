import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { pushScreen } from '../navigation/pushScreen';
import colors from '../themes/Colors';
const windowWidth = Dimensions.get('window').width;
const Coupon = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const goToOrder = () => {
    Navigation.mergeOptions('bottomtab', {
      bottomTabs: {
        visible: true,
        currentTabIndex: 2,
      },
    });
  }
  return (
    <View style={styles.layoutCoupon}>
      <View style={styles.percent}>
        <View style={styles.borderPercent}>
          <Text style={styles.textPercent}>-{props.data.value}%</Text>
        </View>
      </View>
      <View style={styles.desc}>
        {isOpen ? (
          <Text style={styles.code}>{props.data.code}</Text>
        ) : (
          <View>
            <Text style={styles.textDecs}>{props.data.name}</Text>
            <Text style={styles.textExpiry}>HSD: Từ ngày 01/03/2021 đến ngày 30/03/2021</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[styles.btnUse, isOpen && { backgroundColor: colors.lightGreen }]}
        onPress={() => (isOpen ? goToOrder() : setIsOpen(true))}
      >
        <Text style={styles.textUse}>{isOpen ? 'ĐẶT HÀNG NGAY' : 'SỬ DỤNG NGAY'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  layoutCoupon: {
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
  percent: {
    width: 60,
    backgroundColor: colors.whiteGray,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: colors.boldGray,
    borderRightWidth: 1,
  },
  borderPercent: {
    height: 45,
    width: 45,
    borderColor: colors.boldGray,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPercent: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 0,
  },
  desc: {
    width: windowWidth - 140,
    backgroundColor: colors.whiteGray,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 9,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  textDecs: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  textExpiry: {
    fontSize: 9,
  },
  btnUse: {
    width: 50,
    backgroundColor: colors.primary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: -7,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  textUse: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Coupon;
