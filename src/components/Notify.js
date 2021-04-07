import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../themes/Colors';
const windowWidth = Dimensions.get('window').width;
const Notify = (props) => {
  return (
    <View style={styles.notifyContainer}>
      <Icon
        style={props.isRead && { opacity: 0.4 }}
        name={props.isConfirm ? 'checkcircleo' : 'dropbox'}
        size={25}
        color={props.isConfirm ? colors.lightGreen : colors.primary}
      />
      <View style={[styles.itemNotify, props.isRead && { opacity: 0.4 }]}>
        <Text style={[styles.titleNotify, props.isRead && { color: colors.boldGray }]}>
          {props.data.title}
        </Text>
        <Text style={[styles.descNotify, props.isRead && { color: colors.boldGray }]}>
          {props.data.message}
        </Text>
        <Text style={styles.timeNotify}>29/03/2021 12:00</Text>
      </View>
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  notifyContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 5,
    marginBottom: 5,
  },
  itemNotify: {
    marginLeft: 10,
    width: windowWidth - 60,
  },
  titleNotify: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
  },
  descNotify: {
    fontSize: 12,
    color: 'black',
  },
  timeNotify: {
    color: colors.boldGray,
    fontSize: 12,
  },
});
