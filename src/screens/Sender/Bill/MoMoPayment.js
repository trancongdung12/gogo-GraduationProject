import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import momo from '../../../assets/image/momo.png';
import Button from '../../../components/Button';
import { popScreen } from '../../../navigation/pushScreen';
import { useDispatch } from 'react-redux';
import OrderAction from '../../../redux/OrderRedux/actions';
import colors from '../../../themes/Colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Navigation } from 'react-native-navigation';
const MoMoPayment = ({ data, componentId }) => {
  console.log(data);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addBill = () => {
    setLoading(true);
    dispatch(OrderAction.userOrder(data, onSuccess));
    onSuccess();
  };
  const onSuccess = () => {
    setLoading(false);
    setShowAlert(true);
  };
  const goToOrder = () => {
    setShowAlert(false);
    Navigation.popTo('order');
    Navigation.mergeOptions('bottomtab', {
      bottomTabs: {
        visible: true,
        currentTabIndex: 1,
      },
    });
  };
  return (
    <View style={styles.container}>
      <AwesomeAlert
        showProgress={false}
        show={showAlert}
        title="Đặt hàng thành công ✓"
        message="Cảm ơn bạn đã tin tưởng và đặt hàng trên GoGo, Bạn có thể theo dõi đơn tại Đơn hàng"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Tới Đơn Hàng"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          goToOrder();
        }}
      />
      <Icon
        style={{ height: 50 }}
        name="angle-left"
        size={35}
        onPress={() => popScreen(componentId)}
      />
      {loading && (
        <ActivityIndicator
          style={{ position: 'absolute', top: 350, alignSelf: 'center' }}
          size="small"
          color={colors.primary}
        />
      )}
      <View style={styles.body}>
        <Text style={styles.title}>Thanh toán ví MoMo</Text>
        <Image style={styles.image} source={momo} />
        <Text style={styles.price}>Số tiền: {data.price}</Text>
        <Text style={styles.content}>Nội dung: Đơn hàng #12</Text>
      </View>
      <Button title="Xác nhận đã thanh toán" handleFunc={addBill} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  body: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
  },
  image: {
    height: 250,
    width: 250,
  },
  price: {
    fontSize: 18,
    marginTop: 10,
  },
  content: {
    color: 'red',
    fontSize: 16,
  },
});
export default MoMoPayment;
