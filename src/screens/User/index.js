//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { loginScreen } from '../../navigation/pushScreen';
// create a component
const User = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => loginScreen()}>
        <Text>Logout</Text>
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
export default User;
