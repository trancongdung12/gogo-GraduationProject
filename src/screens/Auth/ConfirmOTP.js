import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { pushScreen } from '../../navigation/pushScreen';

// create a component
const Confirm = (props) => {
  const isMatchCode = () => {
    pushScreen(props.componentId, 'Register', '', '', false, 'rocket', 'angle-right');
  };
  return (
    <View style={styles.container}>
      <Text>Confirm</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput placeholder="1" />
        <TextInput placeholder="1" />
        <TextInput placeholder="1" />
        <TextInput placeholder="1" />
      </View>
      <TouchableOpacity>
        <Text> Gửi lại mã</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => isMatchCode()}>
        <Text> TIẾP TỤC</Text>
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
export default Confirm;
