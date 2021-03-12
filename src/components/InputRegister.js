import React from 'react';
import { StyleSheet, Text, TextInput, View, Des } from 'react-native';
import colors from '../themes/Colors';

const InputRegister = (props) => {
  return (
    <View style={styles.layoutInfo}>
      <Text style={styles.textInfo}>{props.title}</Text>
      <TextInput
        style={styles.inputInfo}
        placeholder={props.hint}
        secureTextEntry={props.isPassword && true}
        onChangeText={(value) => props.changeText(value)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  layoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textInfo: {
    width: 70,
  },
  inputInfo: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    width: 230,
    borderRadius: 5,
    marginLeft: 20,
    height: 35,
    paddingLeft: 10,
    alignItems: 'center',
    paddingVertical: 0,
  },
});

export default InputRegister;
