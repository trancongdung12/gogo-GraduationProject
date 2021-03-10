import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../themes/Colors';
import event from '../assets/image/event.jpg';
const Event = () => {
  return (
    <View style={styles.itemEvent}>
      <Image style={styles.imgEvent} source={event} />
      <Text style={styles.nameEvent}>Ưu đãi đặt biệt cho khách hàng</Text>
      <Text style={styles.descEvent}>Từ 03/03/2021 đến 04/04/2021</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  imgEvent: {
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  itemEvent: {
    marginTop: 10,
  },
  nameEvent: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
    marginTop: 5,
  },
  descEvent: {
    color: colors.grayPlace,
    fontSize: 11,
  },
});

export default Event;
