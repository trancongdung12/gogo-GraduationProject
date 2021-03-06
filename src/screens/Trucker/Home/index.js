import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../themes/Colors';
import Header from '../../../components/Header';
import NoOrder from '../../../components/NoOrder';
import OrderItem from '../../../components/OrderItem';
import OrderActions from '../../../redux/OrderRedux/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import { pushScreen } from '../../../navigation/pushScreen';
import UserActions from '../../../redux/UserRedux/actions';
import NotiActions from '../../../redux/NotificationRedux/actions';
import _ from 'lodash';
import messaging from '@react-native-firebase/messaging';
import { Navigation } from 'react-native-navigation';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const Home = (props) => {
  const [option, setOption] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state.login.token);
  const count = useSelector((state) => state.notification.count);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(OrderActions.getListOrder(onSuccess));
    dispatch(OrderActions.getBillTrucker(id));
    setRefreshing(false);
  }, [dispatch, id]);

  useEffect(() => {
    setLoading(true);
    dispatch(UserActions.userChatList(id));
    dispatch(UserActions.userInfo(id, onSuccesss));
    dispatch(OrderActions.getListOrder(onSuccess));
    dispatch(OrderActions.getBillTrucker(id));
  }, [dispatch, id]);
  const onSuccesss = () => {};
  const onSuccess = () => {
    setLoading(false);
  };

  useEffect(() => {
    dispatch(NotiActions.countNotiById());
    if (count) {
      Navigation.mergeOptions('notification', {
        bottomTab: {
          badge: count,
        },
      });
    }
  }, [count, dispatch]);
  useEffect(() => {
    messaging()
      .subscribeToTopic('new-order')
      .then(() => console.log('Subscribed topic new-order!'));
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.from === '/topics/new-order') {
        dispatch(OrderActions.getListOrder(onSuccess));
      }
    });
    return unsubscribe;
  });
  useEffect(() => {
    async function getToken() {
      console.log(await messaging().getToken());
    }
    getToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          const location = {
            longitude: longitude,
            latitude: latitude,
          };
          const data = {
            id_user: id,
            location: JSON.stringify(location),
          };
          dispatch(OrderActions.addLocation(data));
        },
        (error) => alert(error.message),
        {
          timeout: 100000,
          maximumAge: 1000,
        },
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  var listOrder = [];
  listOrder = useSelector((state) => state.order.orderList);
  const truckerOrder = useSelector((state) => state.order.truckerOrder);
  const user = useSelector((state) => state.user?.data?.user?.[0]);
  return loading ? (
    <ActivityIndicator style={{ flex: 1 }} size="small" color={colors.primary} />
  ) : (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <Header
          title={`Xin chào ${user && user.full_name}!`}
          isWhite={true}
          Id={props.componentId}
        />
        <View style={styles.layoutOption}>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('all')}>
            <Text style={[styles.textOption, option === 'all' && styles.textChoose]}>TẤT CẢ</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('near')}>
            <Text style={[styles.textOption, option === 'near' && styles.textChoose]}>GẦN TÔI</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ScrollView
        style={styles.orderContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {(() => {
          if (option === 'all') {
            if (_.some(listOrder, { type: 1 })) {
              return listOrder.map((item, index) => {
                if (item.type === 1) {
                  return (
                    <OrderItem key={index} id={props.componentId} data={item} trucker={true} />
                  );
                }
              });
            } else {
              return <NoOrder />;
            }
          } else if (option === 'near') {
            return <NoOrder />;
          }
        })()}
      </ScrollView>
      {truckerOrder && (
        <TouchableOpacity
          style={styles.orderItem}
          onPress={() => pushScreen(props.componentId, 'OrderProcess', truckerOrder[0], '', false)}
        >
          <View style={styles.topOrderContainer}>
            <View style={styles.topLeftItem}>
              <Text style={styles.smallTitle}>Mã: #{truckerOrder[0].id}</Text>
              <Text style={[styles.addressTitle, { marginLeft: 10 }]}>
                {JSON.parse(truckerOrder[0].send_from).city}
              </Text>
            </View>
            <Icon size={30} name="arrowright" color="white" />
            <View style={styles.topRightItem}>
              <Text style={styles.smallTitle}>{truckerOrder[0].time_send}</Text>
              <Text style={styles.addressTitle}>{JSON.parse(truckerOrder[0].send_to).city}</Text>
            </View>
          </View>
          <View style={styles.bottomOrderContainer}>
            <Text style={styles.iconTitle}>{truckerOrder[0].name}</Text>
            <Text style={styles.iconTitle}>XEM CHI TIẾT</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutHeader: {
    backgroundColor: colors.secondary,
    paddingTop: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  layoutOption: {
    paddingHorizontal: 15,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textOption: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 15,
    width: (windowWidth - 30) / 2,
  },
  textChoose: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  layoutDo: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  layoutOrder: {
    backgroundColor: '#FAF9FE',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  orderItem: {
    paddingHorizontal: 15,
    backgroundColor: '#8cc8ff',
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 5,
    zIndex: 99,
    marginBottom: 10,
    width: windowWidth - 10,
    alignSelf: 'center',
  },
  topOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  smallTitle: {
    color: 'white',
    fontSize: 12,
  },
  addressTitle: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  iconTitle: {
    color: colors.primary,
  },
});
export default Home;
