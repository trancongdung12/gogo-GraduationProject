import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../../themes/Colors';

const index = (props) => {
  return props.inform.btn ? (
    <View style={styles.container}>
      <Image style={styles.imgIntro} source={props.inform.image} />
      <Text style={styles.txtTitle}>{props.inform.title}</Text>
      <Text style={styles.txtDescrip}>{props.inform.description}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Image style={styles.imgIntro} source={props.inform.image} />
      <Text style={styles.txtTitle}>{props.inform.title}</Text>
      <Text style={styles.txtDescrip}>{props.inform.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgIntro: {
    marginTop: 100,
    width: 300,
    height: 200,
  },
  txtTitle: {
    marginTop: 30,
    fontSize: 16,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  txtDescrip: {
    marginTop: 12,
    fontSize: 14,
    width: 260,
    color: colors.txtLevel2,
    textAlign: 'center',
  },
});

export default index;
