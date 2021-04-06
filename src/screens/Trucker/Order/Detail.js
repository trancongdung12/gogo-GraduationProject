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
  const id_trucker = useSelector((state) => state.login.token);
  const acceptOrder = () => {
    const data = {
      type: 2,
      id_trucker: id_trucker,
    };
    dispatch(OrderActions.updateOrderStatus(props.data.data.id, data, onSuccess));
  };
  const onSuccess = () => {
    setShowAlert(true);
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
          pushScreen(props.componentId, 'OrderProcess', '', '', false);
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
