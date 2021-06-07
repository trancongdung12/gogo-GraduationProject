import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../themes/Colors';

const Button = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[styles.btnBtn, props.disabled && { backgroundColor: colors.grayPlace }]}
      onPress={() => props.handleFunc()}
    >
      <Text style={styles.textBtn}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnBtn: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
    backgroundColor: colors.primary,
    paddingHorizontal: 80,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Button;
