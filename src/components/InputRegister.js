import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputRegister = (props) => {
  return (
    <View style={styles.layoutInfo}>
      <Text style={styles.textInfo}>{props.title}</Text>
      <TextInput
        style={styles.inputInfo}
        placeholder={props.hint}
        secureTextEntry={props.isPassword && true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  layoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textInfo: {
    width: 70,
  },
  inputInfo: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 200,
    borderRadius: 10,
    marginLeft: 20,
    height: 40,
    paddingLeft: 15,
  },
});

export default InputRegister;
