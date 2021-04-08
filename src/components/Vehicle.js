import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../themes/Colors';
const Vehicle = (props) => {
  return (
    <TouchableOpacity
      style={[styles.itemVehicle, props.isTruck && styles.itemVehicleVerify]}
      onPress={() => props.setTruck(props.id)}
    >
      {props.isTruck && <Icon style={styles.icon} name="check-circle" color="#199316" size={20} />}
      <Text style={styles.titleBold}>{props.title}</Text>
      <Image style={styles.imgVehicle} source={{ uri: props.img }} />
      <Text style={styles.descVehicle}>{props.desc}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleBold: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
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
    width: 120,
    height: 80,
  },
  descVehicle: {
    fontSize: 10,
    textAlign: 'center',
  },
});

//make this component available to the app
export default Vehicle;
