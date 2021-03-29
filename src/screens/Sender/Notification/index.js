import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../../../components/Header';
import Notify from '../../../components/Notify';

const Notification = (props) => {
  return (
    <View style={styles.container}>
      <Header title="Bạn có thông báo mới" Id={props.componentId} />
      <Text style={styles.readAll}>Đọc tất cả (1)</Text>
      <View style={styles.layoutNotify}>
        <Notify />
        <Notify isRead={true} />
        <Notify isConfirm={true} />
        <Notify />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  readAll: {
    paddingRight: 20,
    textAlign: 'right',
    color: '#1d8545',
    fontSize: 13,
    fontWeight: 'bold',
  },
  layoutNotify: {
    marginTop: 10,
  },
});
export default Notification;
