import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../themes/Colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import Header from '../../../components/Header';
import NoOrder from '../../../components/NoOrder';
import OrderItem from '../../../components/OrderItem';
import OrderActions from '../../../redux/OrderRedux/actions';
const windowWidth = Dimensions.get('window').width;
const Home = (props) => {
  const [option, setOption] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(OrderActions.getListOrder());
    setRefreshing(loading);
  }, [dispatch, loading]);
  useEffect(() => {
    setLoading(true);
    dispatch(OrderActions.getListOrder(onSuccess));
  }, [dispatch]);
  const onSuccess = () => {
    setLoading(false);
  };
  var listOrder = [];
  listOrder = useSelector((state) => state.order.orderList);
  return loading ? (
    <AwesomeAlert show={loading} showProgress={true} progressColor={colors.primary} />
  ) : (
    <View
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.layoutHeader}>
        <Header title="Xin chào Nguyễn Trúc Cơ" isWhite={true} Id={props.componentId} />
        <View style={styles.layoutOption}>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('all')}>
            <Text style={[styles.textOption, option === 'all' && styles.textChoose]}>TẤT CẢ</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('near')}>
            <Text style={[styles.textOption, option === 'near' && styles.textChoose]}>GẦN TÔI</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ScrollView style={styles.orderContainer}>
        {(() => {
          if (option === 'all') {
            if (listOrder != null) {
              return listOrder.map((item, index) => {
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
                    trucker={true}
                  />
                );
              });
            } else {
              return <NoOrder />;
            }
          } else if (option === 'near') {
            return <NoOrder />;
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
export default Home;
