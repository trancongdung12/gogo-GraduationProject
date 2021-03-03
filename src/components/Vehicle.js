import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../themes/Colors';
const Vehicle = (props) => {
  return (
    <TouchableOpacity
      style={[styles.itemVehicle, styles.itemVehicleVerify]}
      onPress={props.setTruck}
    >
      {props.isTruck && <Icon style={styles.icon} name="check-circle" color="#199316" size={20} />}
      <Text style={styles.titleBold}>{props.title}</Text>
      <Image style={styles.imgVehicle} source={props.img} />
      <Text style={styles.descVehicle}>{props.desc}</Text>
    </TouchableOpacity>
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
    width: 170,
  },
  icon: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  itemVehicleVerify: {
    backgroundColor: '#FDF0E0',
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
