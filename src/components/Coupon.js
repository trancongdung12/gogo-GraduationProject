import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../themes/Colors';
const windowWidth = Dimensions.get('window').width;
const Coupon = () => {
  return (
    <View style={styles.layoutCoupon}>
      <View style={styles.percent}>
        <View style={styles.borderPercent}>
          <Text style={styles.textPercent}>-50%</Text>
        </View>
      </View>
      <View style={styles.desc}>
        <Text style={styles.textDecs}>Giảm 50% cho đơn hàng đầu tiên</Text>
        <Text style={styles.textExpiry}>HSD: Từ ngày 01/03/2021 đến ngày 30/03/2021</Text>
      </View>
      <View style={styles.btnUse}>
        <Text style={styles.textUse}>SỬ DỤNG NGAY</Text>
      </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -10,
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
});
export default Coupon;
