import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { pushScreen } from '../navigation/pushScreen';
import colors from '../themes/Colors';

const Header = (props) => {
  return (
    <View style={styles.itemHeader}>
      <Text style={[styles.title, props.isWhite && { color: 'white' }]}>{props.title}</Text>
      <TouchableOpacity
        style={styles.layoutMessage}
        onPress={() => pushScreen(props.Id, 'Chatting', '', '', false)}
      >
        <Icon name="wechat" size={30} color={props.isWhite ? 'white' : colors.lightGray} />
        <View style={styles.borderCircle}>
          <Text style={styles.messageCount}>1</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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
