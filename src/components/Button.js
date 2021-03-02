import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../themes/Colors';

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.btnLogin} onPress={() => props.handleFunc()}>
      <Text style={styles.textLogin}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
    backgroundColor: colors.primary,
    paddingHorizontal: 80,
    paddingVertical: 15,
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Button;
