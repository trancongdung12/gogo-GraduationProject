import moment from 'moment';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { pushScreen } from '../navigation/pushScreen';
import colors from '../themes/Colors';
const windowWidth = Dimensions.get('window').width;
const Notify = (props) => {
  return (
    <TouchableOpacity
      style={styles.notifyContainer}
      onPress={() => pushScreen(props.id, 'Rating', '', '', false)}
    >
      <Icon
        style={props.data.isRead && { opacity: 0.6 }}
        name={props.isConfirm ? 'checkcircleo' : 'dropbox'}
        size={25}
        color={props.isConfirm ? colors.lightGreen : colors.primary}
      />
      <View style={[styles.itemNotify, props.data.isRead && { opacity: 0.6 }]}>
        <Text style={[styles.titleNotify, props.data.isRead && { color: colors.boldGray }]}>
          {props.data.title}
        </Text>
        <Text style={[styles.descNotify, props.data.isRead && { color: colors.boldGray }]}>
          {props.data.message}
        </Text>
        <Text style={styles.timeNotify}>
          {moment(props.data.created_at).format('DD/MM/YYYY - hh:mm a')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Notify;

const styles = StyleSheet.create({
  notifyContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 5,
    marginBottom: 5,
  },
  itemNotify: {
    marginLeft: 10,
    width: windowWidth - 80,
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
