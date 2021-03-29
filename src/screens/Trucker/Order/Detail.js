import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import DetailOrder from '../../../components/ItemDetail';
import colors from '../../../themes/Colors';
import { useDispatch } from 'react-redux';
import OrderActions from '../../../redux/OrderRedux/actions';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Detail = (props) => {
  const dispatch = useDispatch();
  const acceptOrder = () => {
    const data = {
      type: 2,
    };
    dispatch(OrderActions.updateOrderStatus(props.data.id, data, onSuccess));
  };
  const onSuccess = () => {
    console.log('====================================');
    console.log('oke');
    console.log('====================================');
  };
  return (
    <ScrollView style={styles.container}>
      <DetailOrder id={props.componentId} data={props.data.data} />
      <TouchableOpacity style={styles.btnCancel}>
        <Text style={styles.txtCancel} onPress={() => acceptOrder()}>
          Nhận đơn hàng
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  btnCancel: {
    width: SCREEN_WIDTH - 100,
    backgroundColor: colors.lightGreen,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 50,
  },
  txtCancel: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
