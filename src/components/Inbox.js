import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { pushScreen } from '../navigation/pushScreen';
import colors from '../themes/Colors';
import trucker from '../assets/image/trucker.png';

const Inbox = (props) => {
  return (
    <TouchableOpacity
      style={[styles.itemMes, props.isSeen && { opacity: 0.8 }]}
      onPress={() => pushScreen(props.Id, 'Messages', '', '', false)}
    >
      <View style={styles.contentMess}>
        <Image source={trucker} style={styles.imgGogo} />
        <View style={styles.layoutContent}>
          <Text style={[styles.titleContent, props.isSeen && { color: colors.boldGray }]}>
            Nguyễn Duy Ngọc
          </Text>
          <Text style={[styles.txtContent, props.isSeen && { color: colors.boldGray }]}>
            Chào bạn tôi sẽ đến ngay
          </Text>
          <Text style={[styles.txtContent, props.isSeen && { color: colors.boldGray }]}>
            28/02/2021 -09:02
          </Text>
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
    paddingVertical: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 5,
  },
  contentMess: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 13,
  },
  titleContent: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  imgGogo: {
    height: 60,
    width: 65,
  },
  layoutContent: {
    marginLeft: 10,
  },
  txtContent: {
    fontSize: 11,
    color: 'black',
  },
});
