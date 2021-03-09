import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { popScreen } from '../navigation/pushScreen';

const Back = (props) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => popScreen(props.id)}>
      <Icon name="angle-left" size={15} />
      <Text style={styles.backText}> Trở lại</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
  },
  backText: {
    color: 'black',
    fontSize: 12,
  },
});

//make this component available to the app
export default Back;
