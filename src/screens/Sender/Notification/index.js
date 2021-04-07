import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header';
import Notify from '../../../components/Notify';
import NotiActions from '../../../redux/NotificationRedux/actions';
const Notification = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const refresh = useSelector((state) => state.notification.loading);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(NotiActions.getNotiById(onSuccess));
    setRefreshing(refresh);
  }, [dispatch, refresh]);
  useEffect(() => {
    setLoading(true);
    dispatch(NotiActions.getNotiById(onSuccess));
  }, [dispatch]);
  const noti = useSelector((state) => state.notification.data);
  const count = useSelector((state) => state.notification.count);
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
      <Text style={styles.readAll}>Đọc tất cả ({count})</Text>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.layoutNotify}
      >
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
