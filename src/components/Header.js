import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../themes/Colors';
import Back from './Back';

const Header = (props) => {
  return (
    <View style={styles.itemHeader}>
      {props.back ? (
        <View style={styles.layoutHeader}>
          <Back id={props.Id} isWhite={true} />
          <Text style={[styles.title, props.isWhite && { color: 'white' }]}>{props.title}</Text>
        </View>
      ) : (
        <Text style={[styles.title, props.isWhite && { color: 'white' }]}>{props.title}</Text>
      )}

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  layoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  borderCircle: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 7.5,
    width: 15,
    height: 15,
    alignItems: 'center',
    left: 20,
  },
  messageCount: {
    color: 'white',
    fontSize: 10,
  },
});
