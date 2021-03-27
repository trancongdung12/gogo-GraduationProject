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
import messaging from '@react-native-firebase/messaging';
import UserActions from '../../../redux/UserRedux/actions';
const windowWidth = Dimensions.get('window').width;
const Home = (props) => {
  const [option, setOption] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state.login.token);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(OrderActions.getListOrder(onSuccess));
    setRefreshing(false);
  }, [dispatch]);
  useEffect(() => {
    setLoading(true);
    dispatch(UserActions.userInfo(id, onSuccess));
    dispatch(OrderActions.getListOrder(onSuccess));
  }, [dispatch, id]);
  const onSuccess = () => {
    setLoading(false);
  };
  useEffect(() => {
    console.log('====================================');
    console.log(messaging().getToken());
    console.log('====================================');
  }, []);
  var listOrder = [];
  listOrder = useSelector((state) => state.order.orderList);
  const user = useSelector((state) => state.user.data);
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
            if (listOrder != null) {
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
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => pushScreen(props.componentId, 'OrderProcess', '', '', false)}
      >
        <View style={styles.topOrderContainer}>
          <View style={styles.topLeftItem}>
            <Text style={styles.smallTitle}>Mã: 12345</Text>
            <Text style={styles.addressTitle}>Sơn Trà, Đà Nẵng</Text>
          </View>
          <Icon size={30} name="arrowright" color="white" />
          <View style={styles.topRightItem}>
            <Text style={styles.smallTitle}>10/03/2021 - 10:10</Text>
            <Text style={styles.addressTitle}>Ngũ Hành Sơn, Đà Nẵng</Text>
          </View>
        </View>
        <View style={styles.bottomOrderContainer}>
          <Text style={styles.iconTitle}>XI MĂNG</Text>
          <Text style={styles.iconTitle}>XEM CHI TIẾT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutHeader: {
    backgroundColor: colors.primary,
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
    backgroundColor: '#AAB8F6',
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
  },
  topOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: windowWidth - 60,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  // topLeftItem: {
  //   borderRightColor: 'white',
  //   borderRightWidth: 1,
  //   paddingRight: 15,
  // },
  smallTitle: {
    color: 'black',
    fontSize: 12,
  },
  addressTitle: {
    color: colors.secondary,
    fontSize: 14,
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
