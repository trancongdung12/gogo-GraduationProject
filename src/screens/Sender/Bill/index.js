import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Back from '../../../components/Back';
import Button from '../../../components/Button';
import colors from '../../../themes/Colors';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, useDispatch } from 'react-redux';
import { popScreen } from '../../../navigation/pushScreen';
import OrderAction from '../../../redux/OrderRedux/actions';
import { Navigation } from 'react-native-navigation';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Bill = (props) => {
  const data = props.data;
  const loading = useSelector((state) => state.order.loading);
  const user = useSelector((state) => state.user.data);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const confirmBill = () => {
    const dataSender = {
      name: user.full_name,
      phone: user.phone,
      note: data.note,
    };
    const orderData = {
      send_from: data.from,
      send_to: data.to,
      time_send: data.timeSend,
      name: data.product,
      mass: data.mass,
      car_type: data.truckId.title,
      export_data: data.bill,
      image: data.images,
      id_user: user.id,
      sender_info: JSON.stringify(dataSender),
      receiver_info: JSON.stringify(data.receiveInfo),
      price: 327439,
    };
    dispatch(OrderAction.userOrder(orderData, onSuccess));
  };
  const onSuccess = () => {
    setShowAlert(true);
  };
  const goToOrder = () => {
    setShowAlert(false);
    Navigation.mergeOptions('bottomtab', {
      bottomTabs: {
        visible: true,
        currentTabIndex: 1,
      },
    });
    popScreen(props.componentId);
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
      <View style={styles.layoutHeader}>
        <Back id={props.componentId} />
        <View style={styles.layoutTitle}>
          <Text style={styles.title}>Báo giá</Text>
        </View>
      </View>
      <View style={styles.layoutContainer}>
        <View style={styles.layoutCode}>
          <View style={styles.itemCode}>
            <Text style={styles.titleCode}>Mã vận đơn: </Text>
            <Text style={styles.textCode}>12345</Text>
          </View>
          <View style={styles.itemCode}>
            <Text style={styles.titleCode}>Ngày tạo: </Text>
            <Text style={styles.textCode}>{moment(new Date()).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
        <View style={styles.layoutAdds}>
          <View style={styles.itemAdds}>
            <Text style={styles.titleAdds}>Từ</Text>
            <Text style={styles.textAdds}>{data.from}</Text>
          </View>
          <View style={styles.layoutInfo}>
            <View style={styles.symbol} />
            <Text style={styles.textInfo}> {user.full_name + ' - ' + user.phone}</Text>
            <TouchableOpacity style={styles.btnEdit}>
              <Text style={styles.txtEdit}>
                <Icons name="edit" fontSize={30} color={colors.primary} /> Sửa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.layoutAdds}>
          <View style={styles.itemAdds}>
            <Text style={styles.titleAdds}>Đến</Text>
            <Text style={styles.textAdds}>{data.to}</Text>
          </View>
          <View style={styles.layoutInfo}>
            <View style={styles.symbol} />
            <Text style={styles.textInfo}>
              {data.receiveInfo.name + '-' + data.receiveInfo.phone}
            </Text>
            <TouchableOpacity style={styles.btnEdit}>
              <Text style={styles.txtEdit}>
                <Icons name="edit" fontSize={30} color={colors.primary} /> Sửa
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productContainer}>
          <View style={styles.layoutProduct}>
            <View style={styles.titleProduct}>
              <Text style={styles.txtProduct}>
                <Icons name="edit" fontSize={30} color={colors.gray} /> Tên hàng hóa
              </Text>
              <Text style={styles.nameProduct}>{data.product}</Text>
            </View>
            <View style={styles.itemProduct}>
              <Text style={styles.txtProduct}>
                <Icons name="edit" fontSize={30} color={colors.gray} /> Khối lượng hàng hóa
              </Text>
              <Text style={styles.nameProduct}>{data.mass + ' Tấn'}</Text>
            </View>
          </View>
          <View style={styles.layoutProduct}>
            <View style={styles.titleProduct}>
              <Text style={styles.txtProduct}>
                <Icons name="edit" fontSize={30} color={colors.gray} /> Phương tiện
              </Text>
              <Text style={styles.nameProduct}>{data.truckId.title}</Text>
            </View>
            <View style={styles.itemProduct}>
              <Text style={styles.txtProduct}>
                <Icons name="edit" fontSize={30} color={colors.gray} /> Thời gian bốc hàng
              </Text>
              <Text style={styles.nameProduct}>{data.timeSend}</Text>
            </View>
          </View>
        </View>
        <View style={styles.layoutCoupon}>
          <Text style={styles.titleCoupon}>Ưu đãi</Text>
          <TextInput style={styles.inputCoupon} placeholder="Chưa áp dụng" />
        </View>
        <View style={styles.layoutCoupon}>
          <Text style={styles.titleCoupon}>Hình thức thanh toán</Text>
          <TextInput style={styles.inputCoupon} placeholder="Chưa áp dụng" />
        </View>
      </View>
      <View style={styles.layoutBottom}>
        <View style={styles.layoutFee}>
          <Text style={styles.titleFee}>Phí vận chuyển:</Text>
          <Text style={styles.textFee}>575,000 VND</Text>
        </View>
        <View style={styles.layoutFee}>
          <Text style={styles.titleTotal}>Tổng tiền (bao gồm thuế VAT):</Text>
          <Text style={styles.textTotal}>580,000 VND</Text>
        </View>
        <Button title="XÁC NHẬN" handleFunc={confirmBill} />
      </View>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  layoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 30,
  },
  layoutTitle: {
    flex: 1,
    alignItems: 'center',
    marginRight: 60,
  },
  title: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  layoutContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  layoutCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCode: {
    flexDirection: 'row',
  },
  titleCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  textCode: {
    fontSize: 12,
    color: colors.boldGray,
  },
  layoutAdds: {
    marginTop: 20,
  },
  itemAdds: {
    flexDirection: 'row',
  },
  titleAdds: {
    fontWeight: 'bold',
  },
  textAdds: {
    fontSize: 16,
    marginLeft: 10,
  },
  layoutInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  textInfo: {
    fontWeight: 'bold',
  },
  btnEdit: {
    marginLeft: 10,
  },
  txtEdit: {
    color: colors.primary,
  },
  symbol: {
    width: 20,
    borderLeftColor: colors.boldGray,
    borderBottomColor: colors.boldGray,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 5,
    marginTop: -5,
    marginLeft: 5,
    height: 17,
  },
  productContainer: {
    marginTop: 20,
  },
  layoutProduct: {
    marginTop: 5,
    flexDirection: 'row',
  },
  itemProduct: {
    marginLeft: 30,
  },
  txtProduct: {
    color: colors.gray,
  },
  nameProduct: {
    marginLeft: 15,
  },
  layoutCoupon: {
    marginTop: 20,
  },
  titleCoupon: {
    fontWeight: 'bold',
  },
  inputCoupon: {
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
  },
  layoutBottom: {
    marginTop: 25,
    borderTopColor: colors.boldGray,
    borderTopWidth: 1,
    paddingTop: 15,
  },
  layoutFee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  titleFee: {
    fontWeight: 'bold',
    color: colors.boldGray,
    fontSize: 13,
  },
  titleTotal: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 13,
  },
  textTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
