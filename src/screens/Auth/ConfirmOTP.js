import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { pushScreen } from '../../navigation/pushScreen';
import Button from '../../components/Button';
import colors from '../../themes/Colors';
import Back from '../../components/Back';
const ConfirmOTP = (props) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const isMatchOTP = () => {
    let initCode = props.data;
    let recentCode = first + second + third + fourth;
    if (initCode == recentCode) {
      pushScreen(props.componentId, 'OptionScreen', '', '', false, '', '');
    } else {
      console.log('bad');
    }
  };
  return (
    <View style={styles.container}>
      <Back id={props.componentId} />
      <View style={styles.layoutContent}>
        <Text style={styles.title}>Vui lòng nhập mã xác nhận gồm 4 chữ số!</Text>
        <View style={styles.itemInput}>
          <TextInput
            autoFocus={true}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(txt) => setFirst(txt)}
          />
          <TextInput
            maxLength={1}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(txt) => setSecond(txt)}
          />
          <TextInput
            maxLength={1}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(txt) => setThird(txt)}
          />
          <TextInput
            maxLength={1}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(txt) => setFourth(txt)}
          />
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
