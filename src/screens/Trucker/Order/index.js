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
import Header from '../../../components/Header';
import NoOrder from '../../../components/NoOrder';
import OrderItem from '../../../components/OrderItem';
import OrderActions from '../../../redux/OrderRedux/actions';
import _ from 'lodash';
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const Home = (props) => {
  const [option, setOption] = useState('all');
  const [complete, setComplete] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.login.token);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(OrderActions.getBillTrucker(id));
    setRefreshing(false);
  }, [dispatch, id]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api-gogo.herokuapp.com/api/bill/trucker/complete/' + id,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setComplete(responses.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    dispatch(OrderActions.getBillTrucker(id));
  }, [dispatch, id]);
  const truckerOrder = useSelector((state) => state.order.truckerOrder);
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <Header title="Chuyến hàng của tôi" isWhite={true} Id={props.componentId} />
        <View style={styles.layoutOption}>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('all')}>
            <Text style={[styles.textOption, option === 'all' && styles.textChoose]}>
              ĐANG THỰC HIỆN
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('near')}>
            <Text style={[styles.textOption, option === 'near' && styles.textChoose]}>
              ĐÃ HOÀN THÀNH
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ScrollView
        style={styles.orderContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {(() => {
          if (option === 'all') {
            if (truckerOrder) {
              return <OrderItem id={props.componentId} data={truckerOrder[0]} />;
            } else {
              return <NoOrder />;
            }
          } else if (option === 'near') {
            if (complete) {
              return complete.map((item, index) => {
                return <OrderItem key={index} id={props.componentId} data={item} trucker={true} />;
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
});
export default Home;
