import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../assets/image/logo.png';
import { pushScreen } from '../navigation/pushScreen';
import colors from '../themes/Colors';

const Inbox = (props) => {
  return (
    <TouchableOpacity
      style={[styles.itemMes, props.isSeen && { backgroundColor: 'white' }]}
      onPress={() => pushScreen(props.Id, 'Messages', '', '', false)}
    >
      <View style={styles.contentMess}>
        <Image source={logo} style={styles.imgGogo} />
        <View style={styles.layoutContent}>
          <Text style={styles.titleContent}>Hệ thống</Text>
          <Text style={styles.txtContent}>Đơn hàng của bạn đã được xác nhận..</Text>
          <Text style={styles.txtContent}>28/02/2021 -09:02</Text>
        </View>
      </View>
      <Icon style={styles.icon} name="angle-right" size={30} color={colors.boldGray} />
    </TouchableOpacity>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  itemMes: {
    flexDirection: 'row',
    borderTopColor: colors.boldGray,
    borderBottomColor: colors.boldGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 5,
  },
  contentMess: {
    flexDirection: 'row',
  },
  imgGogo: {
    height: 60,
    width: 65,
  },
  layoutContent: {
    marginLeft: 10,
  },
  txtContent: {
    fontSize: 13,
    color: colors.boldGray,
  },
});
