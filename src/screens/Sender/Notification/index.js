import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header';
import Notify from '../../../components/Notify';
import NotiActions from '../../../redux/NotificationRedux/actions';
import notify from '../../../assets/image/notify.png';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';
const Notification = (props) => {
  const id = useSelector((state) => state.login.token);
  const [loading, setLoading] = useState(false);
  const [readAll, setReadAll] = useState(false);
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
  var count = useSelector((state) => state.notification.count);
  var data = [];
  if (noti) {
    data = noti;
  }
  const onSuccess = () => {
    setLoading(false);
  };

  const onReadAllNotify = () => {
    Navigation.mergeOptions('notifications', {
      bottomTab: {
        badge: '',
      },
    });
    axios({
      method: 'PUT',
      url: 'https://api-gogo.herokuapp.com/api/notification/all-read/' + id,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setReadAll(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Header title="Bạn có thông báo mới" Id={props.componentId} />
      {!_.isEmpty(data) ? (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onReadAllNotify()}>
          <Text style={styles.readAll}>Đọc tất cả {readAll ? '' : '(' + count + ')'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.layoutNoNotify}>
          <Image style={styles.imageNotify} source={notify} />
          <Text style={styles.titleNotify}>Chưa có thông báo</Text>
          <Text style={styles.descNotify}>Thông báo sẽ hiển thị ở đây</Text>
          <TouchableOpacity style={styles.btnNotify} onPress={() => onRefresh()}>
            <Text style={styles.txtBtnNotify}>Làm mới</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.layoutNotify}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          data.map((item, index) => {
            if (item.type === 1) {
              return <Notify icon="dropbox" key={index} data={item} />;
            } else if (item.type === 2) {
              return <Notify icon="checkcircleo" key={index} data={item} isConfirm={true} />;
            } else {
              return <Notify icon="smileo" key={index} data={item} isConfirm={true} />;
            }
          })
        )}
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
  layoutNoNotify: {
    alignSelf: 'center',
    marginTop: 60,
  },
  titleNotify: {
    marginTop: -30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descNotify: {
    fontSize: 16,
    textAlign: 'center',
  },
  btnNotify: {
    alignSelf: 'center',
    backgroundColor: '#2699fb',
    width: 100,
    borderRadius: 5,
    marginTop: 20,
  },
  txtBtnNotify: {
    paddingVertical: 5,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});
export default Notification;
