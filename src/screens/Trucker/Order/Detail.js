import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import DetailOrder from '../../../components/ItemDetail';
import colors from '../../../themes/Colors';
import { useDispatch, useSelector } from 'react-redux';
import OrderActions from '../../../redux/OrderRedux/actions';
import { pushScreen } from '../../../navigation/pushScreen';
import AwesomeAlert from 'react-native-awesome-alerts';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Detail = (props) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [truckerOrder, setTruckerOrder] = useState([]);
  const id_trucker = useSelector((state) => state.login.token);
  const acceptOrder = () => {
    const data = {
      type: 2,
      id_trucker: id_trucker,
    };
    dispatch(OrderActions.updateOrderStatus(props.data.data.id, data, onSuccess, onFailed));
  };
  const onSuccess = async () => {
    setShowAlert(true);
  };
  const onFailed = () => {
    setShowFailed(true);
  };
  return (
    <ScrollView style={styles.container}>
      <AwesomeAlert
        showProgress={false}
        show={showAlert}
        title="Nhận đơn hàng thành công ✓"
        message="Nhanh tay đến nơi chở hàng thôi!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Tới Đơn Hàng"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
          pushScreen(props.componentId, 'OrderProcess', props.data.data, '', false);
        }}
      />
      <AwesomeAlert
        showProgress={false}
        show={showFailed}
        title="Nhận đơn hàng thất bại "
        message="Bạn đã nhận đơn hàng khác không được nhận đơn hàng này!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowFailed(false);
        }}
      />
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
