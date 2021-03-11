import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes/Colors';

// create a component
const Notification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>Bạn có thông báo mới</Text>
        <View style={styles.layoutMessage}>
          <Icon name="comments" size={30} color={colors.lightGray} />
          <View style={styles.borderCircle}>
            <Text style={styles.messageCount}>1</Text>
          </View>
        </View>
      </View>
      <View style={styles.layoutMessages}>
        <View style={styles.itemMes}>
          <View style={styles.contentMess}>
            <View style={styles.layoutGogo}>
              <Text style={styles.textGogo}>GoGo</Text>
            </View>
            <View style={styles.layoutContent}>
              <Text style={styles.titleContent}>Hệ thống</Text>
              <Text style={styles.txtContent}>Đơn hàng của bạn đã được xác nhận..</Text>
              <Text style={styles.txtContent}>28/02/2021 -09:02</Text>
            </View>
          </View>
          <Icon style={styles.icon} name="angle-right" size={30} color={colors.boldGray} />
        </View>
        <View style={[styles.itemMes, { backgroundColor: 'white' }]}>
          <View style={styles.contentMess}>
            <View style={styles.layoutGogo}>
              <Text style={styles.textGogo}>GoGo</Text>
            </View>
            <View style={styles.layoutContent}>
              <Text style={styles.titleContent}>Hệ thống</Text>
              <Text style={styles.txtContent}>Đơn hàng của bạn đã được xác nhận..</Text>
              <Text style={styles.txtContent}>28/02/2021 -09:02</Text>
            </View>
          </View>
          <Icon style={styles.icon} name="angle-right" size={30} color={colors.boldGray} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
  layoutMessages: {
    marginTop: 20,
  },
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
  layoutGogo: {
    borderWidth: 1,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.boldGray,
  },
  layoutContent: {
    marginLeft: 10,
  },
  txtContent: {
    fontSize: 13,
    color: colors.boldGray,
  },
});
export default Notification;
