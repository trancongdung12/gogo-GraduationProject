import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { pushScreen, popScreen } from '../../navigation/pushScreen';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes/Colors';
import Back from '../../components/Back';
const ConfirmOTP = (props) => {
  const isMatchOTP = () => {
    pushScreen(props.componentId, 'OptionScreen', '', '', false, '', '');
  };
  return (
    <View style={styles.container}>
      <Back />
      <View style={styles.layoutContent}>
        <Text style={styles.title}>Vui lòng nhập mã xác nhận gồm 4 chữ số!</Text>
        <View style={styles.itemInput}>
          <TextInput
            autoFocus={true}
            keyboardType="number-pad"
            style={styles.input}
            maxLength={1}
          />
          <TextInput maxLength={1} keyboardType="number-pad" style={styles.input} />
          <TextInput maxLength={1} keyboardType="number-pad" style={styles.input} />
          <TextInput maxLength={1} keyboardType="number-pad" style={styles.input} />
        </View>
      </View>
      <Button title="Tiếp theo" handleFunc={isMatchOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
  },
  backText: {
    color: 'black',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
  },
  layoutContent: {
    marginTop: 130,
    paddingHorizontal: 20,
  },
  itemInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 40,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    width: 40,
    textAlign: 'center',
  },
});

//make this component available to the app
export default ConfirmOTP;
