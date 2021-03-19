import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import bill from '../assets/image/bill.png';
import colors from '../themes/Colors';

const NoOrder = () => {
  return (
    <View style={styles.layoutDoing}>
      <View style={styles.layoutNoOrder}>
        <Image style={styles.imgNoOrder} source={bill} />
        <Text style={styles.textNoOrder}>Bạn chưa có đơn hàng nào</Text>
        <TouchableOpacity onPress={() => alert('Chưa có hướng dẫn')}>
          <Text style={styles.textHelp}>Xem hướng dẫn tạo mới đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoOrder;

const styles = StyleSheet.create({
  layoutNoOrder: {
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 100,
  },
  imgNoOrder: {
    height: 205,
    width: 210,
  },
  textNoOrder: {
    paddingHorizontal: 70,
    textAlign: 'center',
    marginTop: 50,
    color: colors.grayPlace,
    lineHeight: 20,
  },
  textHelp: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
