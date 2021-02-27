//import liraries
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// create a component
import { pushScreen } from '../../navigation/pushScreen';
const Auth = (props) => {
  const confirmSMS = () => {
    pushScreen(props.componentId, 'ConfirmOTP', '', '', false, 'rocket', 'angle-right');
  };
  return (
    <View style={styles.container}>
      <Text>Auth</Text>
      <TextInput placeholder="0123456789" />
      <TouchableOpacity onPress={() => confirmSMS()}>
        <Text>XÁC THỰC BẰNG SMS</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Auth;
