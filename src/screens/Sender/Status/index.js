import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import colors from '../../../themes/Colors';
import Header from '../../../components/Header';
import OrderItem from '../../../components/OrderItem';
import { useSelector, useDispatch } from 'react-redux';
import NoOrder from '../../../components/NoOrder';
import OrderActions from '../../../redux/OrderRedux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
const Status = (props) => {
  const [option, setOption] = useState('do');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.login.token);
  useEffect(() => {
    dispatch(OrderActions.getUserOrderById(id));
  }, [dispatch, id]);
  const orderData = useSelector((state) => state.order.orderById);

  return (
    <ScrollView style={styles.container}>
      <AwesomeAlert show={loading} showProgress={true} progressColor={colors.primary} />
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
        </View>
      </View>
      {(() => {
        if (option === 'do') {
          if (orderData.length != 0) {
            return orderData.map((item, index) => {
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
                />
              );
            });
          } else {
            return <NoOrder />;
          }
        } else if (option === 'doing') {
          return <NoOrder />;
        } else if (option === 'done') {
          return <NoOrder />;
        }
      })()}
    </ScrollView>
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
    marginBottom: 20,
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
    fontSize: 13,
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
