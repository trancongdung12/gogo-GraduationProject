import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../themes/Colors';
import truck_2 from '../assets/truck/truck_2.png';
const Vehicle = () => {
  return (
    <View style={styles.itemVehicle}>
      <Text style={styles.titleBold}>Xe 3 bánh</Text>
      <Image style={styles.imgVehicle} source={truck_2} />
      <Text style={styles.descVehicle}>Chuyên chở hàng khối lượng nhỏ</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  titleBold: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemVehicle: {
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 20,
  },
  imgVehicle: {
    width: 100,
    height: 60,
  },
  descVehicle: {
    fontSize: 10,
  },
});

//make this component available to the app
export default Vehicle;
