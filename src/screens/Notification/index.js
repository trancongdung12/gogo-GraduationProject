import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Inbox from '../../components/Inbox';

const Notification = (props) => {
  return (
    <View style={styles.container}>
      <Header title="Bạn có thông báo mới" Id={props.componentId} />
      <View style={styles.layoutMessages}>
        <Inbox />
        <Inbox isSeen={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  layoutMessages: {
    marginTop: 20,
  },
});
export default Notification;
