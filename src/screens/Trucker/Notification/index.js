import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header';
import Notify from '../../../components/Notify';
import NotiActions from '../../../redux/NotificationRedux/actions';
const Notification = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(NotiActions.getNotiById(onSuccess));
  }, [dispatch]);
  const noti = useSelector((state) => state.notification.data);
  var data = [];
  if (noti) {
    data = noti;
  }
  const onSuccess = () => {
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Header title="Bạn có thông báo mới" Id={props.componentId} />
      <Text style={styles.readAll}>Đọc tất cả (1)</Text>
      <ScrollView style={styles.layoutNotify}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          data.map((item, index) => {
            return <Notify key={index} data={item} isConfirm={true} />;
          })
        )}
        {/* <Notify />
        <Notify isRead={true} />
        <Notify isConfirm={true} />
        <Notify /> */}
      </ScrollView>
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
