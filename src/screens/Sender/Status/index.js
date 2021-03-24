import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import colors from '../../../themes/Colors';
import Header from '../../../components/Header';
import OrderItem from '../../../components/OrderItem';
import { useSelector, useDispatch } from 'react-redux';
import NoOrder from '../../../components/NoOrder';
import OrderActions from '../../../redux/OrderRedux/actions';
const Status = (props) => {
  const [option, setOption] = useState('do');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.login.token);
  const refresh = useSelector((state) => state.order.loading);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(OrderActions.getUserOrderById(id, onSuccess));
    setRefreshing(refresh);
  }, [dispatch, id, refresh]);
  useEffect(() => {
    setLoading(true);
    dispatch(OrderActions.getUserOrderById(id, onSuccess));
  }, [dispatch, id]);
  const onSuccess = () => {
    setLoading(false);
  };
  var orderData = [];
  orderData = useSelector((state) => state.order.orderById);

  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <Header title="Xem đơn hàng của bạn" isWhite={true} Id={props.componentId} />
        <View style={styles.layoutOption}>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('do')}>
            <Text style={[styles.textOption, option === 'do' && styles.textChoose]}>ĐƠN MỚI</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('doing')}>
            <Text style={[styles.textOption, option === 'doing' && styles.textChoose]}>
              ĐANG THỰC HIỆN
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('done')}>
            <Text style={[styles.textOption, option === 'done' && styles.textChoose]}>
              ĐÃ HOÀN TẤT
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('cancel')}>
            <Text style={[styles.textOption, option === 'cancel' && styles.textChoose]}>
              ĐÃ HUỶ
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ScrollView
        style={styles.orderContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {(() => {
          if (option === 'do') {
            if (orderData != null) {
              return orderData.map((item, index) => {
                if (item.type === 1) {
                  return (
                    <OrderItem
                      code={item.id}
                      from={item.send_from}
                      to={item.send_to}
                      product={item.name}
                      truck={item.car_type}
                      mass={item.mass}
                      time={item.time_send}
                      price={item.price}
                      key={index}
                      id={props.componentId}
                      data={item}
                    />
                  );
                }
              });
            } else {
              return <NoOrder />;
            }
          } else if (option === 'doing') {
            if (orderData != null) {
              return orderData.map((item, index) => {
                if (item.type === 2) {
                  return (
                    <OrderItem
                      code={item.id}
                      from={item.send_from}
                      to={item.send_to}
                      product={item.name}
                      truck={item.car_type}
                      mass={item.mass}
                      time={item.time_send}
                      price={item.price}
                      key={index}
                      id={props.componentId}
                      data={item}
                    />
                  );
                }
              });
            } else {
              return <NoOrder />;
            }
          } else if (option === 'done') {
            if (orderData != null) {
              return orderData.map((item, index) => {
                if (item.type === 3) {
                  return (
                    <OrderItem
                      code={item.id}
                      from={item.send_from}
                      to={item.send_to}
                      product={item.name}
                      truck={item.car_type}
                      mass={item.mass}
                      time={item.time_send}
                      price={item.price}
                      key={index}
                      id={props.componentId}
                      data={item}
                    />
                  );
                }
              });
            } else {
              return <NoOrder />;
            }
          } else if (option === 'cancel') {
            if (orderData != null) {
              return orderData.map((item, index) => {
                if (item.type === 4) {
                  return (
                    <OrderItem
                      code={item.id}
                      from={item.send_from}
                      to={item.send_to}
                      product={item.name}
                      truck={item.car_type}
                      mass={item.mass}
                      time={item.time_send}
                      price={item.price}
                      key={index}
                      id={props.componentId}
                      data={item}
                    />
                  );
                }
              });
            } else {
              return <NoOrder />;
            }
          }
        })()}
      </ScrollView>
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
    paddingBottom: 15,
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
  layoutCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCode: {
    flexDirection: 'row',
  },
  codeOrder: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 12,
    color: colors.boldGray,
  },
  layoutAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  itemAddress: {
    flexDirection: 'row',
  },
  statusAddress: {
    fontWeight: 'bold',
  },
  nameAddress: {
    fontSize: 16,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  layoutContain: {
    paddingHorizontal: 20,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  itemContain: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  contain: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  layoutTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  layoutDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textDetail: {
    color: colors.primary,
  },
  textContain: {
    fontSize: 12,
  },
});

//make this component available to the app
export default Status;
