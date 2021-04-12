import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import colors from '../../../themes/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import { homeTruckerScreen, pushScreen } from '../../../navigation/pushScreen';
import { useDispatch, useSelector } from 'react-redux';
import NotifAction from '../../../redux/NotificationRedux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import OrderActions from '../../../redux/OrderRedux/actions';
const windowWidth = Dimensions.get('window').width;
const Process = (props) => {
  const [option, setOption] = useState('receiver');
  const data = props.data; //error
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const onArrived = () => {
    setOption('delivery');
    const item = {
      id_user: data.id_user,
      title: 'Tài xế đã lấy hàng thành công!',
      message: 'Chúc  bạn có một ngày tốt lành. Đơn hàng của bạn sẽ được giao nhanh thôi',
      type: 2,
    };
    dispatch(OrderActions.deliveryOrder());
    dispatch(NotifAction.addNotification(item));
  };
  const onSuccess = () => {
    const item = {
      type: 3,
      id_trucker: data.id_trucker,
    };
    dispatch(OrderActions.updateOrderStatus(data.id, item, onSuccesses));
    setShowAlert(true);
  };
  const delivery = useSelector((state) => state.order.delivery);
  useEffect(() => {
    if (delivery) {
      setOption('delivery');
    }
  }, []);
  const onSuccesses = () => {};
  return (
    <View style={styles.container}>
      <AwesomeAlert
        showProgress={false}
        show={showAlert}
        title="Giao thành công ✓"
        message="Về trang chủ và chạy đơn hàng mới thôi nào"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Về Trang Chủ"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
          homeTruckerScreen();
        }}
      />
      <View style={styles.layoutHeader}>
        <View style={styles.itemHeader}>
          <View style={styles.headerLayout}>
            <TouchableOpacity style={styles.backButton} onPress={() => homeTruckerScreen()}>
              <Icons name="angle-left" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Đơn hàng #{data.id}</Text>
          </View>

          <TouchableOpacity
            style={styles.layoutMessage}
            onPress={() => pushScreen(props.Id, 'Chatting', '', '', false)}
          >
            <Icon name="wechat" size={30} color={props.isWhite ? 'white' : colors.lightGray} />
            <View style={styles.borderCircle}>
              <Text style={styles.messageCount}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.layoutOption}>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('receiver')}>
            <Text style={[styles.textOption, option === 'receiver' && styles.textChoose]}>
              NHẬN
            </Text>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={styles.itemOption} onPress={() => setOption('delivery')}>
            <Text style={[styles.textOption, option === 'delivery' && styles.textChoose]}>
              GIAO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.itemContainer}>
        {(() => {
          if (option === 'receiver') {
            return (
              <View>
                <View style={styles.addressContainer}>
                  <View style={styles.layoutReceive}>
                    <View style={styles.itemReceive}>
                      <Icon name="enviroment" size={20} color="red" />
                      <Text style={styles.txtReceive}>Nhận hàng tại</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        pushScreen(props.componentId, 'MapTrucker', data.send_from, '', false)
                      }
                    >
                      <Text style={styles.redirect}>
                        Chỉ đường <Icons name="street-view" size={15} color="white" />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.txtAddress}>
                    {JSON.parse(data.send_from).address + ', ' + JSON.parse(data.send_from).city}
                  </Text>
                  <Text style={styles.txtAddress}>
                    <Icon name="calendar" size={20} color="red" /> {data.time_send}{' '}
                  </Text>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin đơn hàng</Text>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Loại hàng hóa</Text>
                    <Text style={styles.infoDesc}>{data.name}</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Khối lượng hàng hóa</Text>
                    <Text style={styles.infoDesc}>{data.mass} Tấn</Text>
                  </View>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin người đặt</Text>
                  <Text style={styles.nameTitle}>{JSON.parse(data.sender_info).name}</Text>
                  <View style={styles.itemReceiver}>
                    <Text>{JSON.parse(data.sender_info).phone}</Text>
                    <Text
                      style={styles.borderCall}
                      onPress={() => Linking.openURL('tel:' + JSON.parse(data.sender_info).phone)}
                    >
                      Gọi ngay <Icon name="phone" size={15} color="white" />
                    </Text>
                    <Text style={styles.borderMess}>
                      Nhắn tin <Icon name="wechat" size={15} color="white" />
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => onArrived()}>
                  <Text style={styles.txtBtn}>Tôi đã đến</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View>
                <View style={styles.addressContainer}>
                  <View style={styles.layoutReceive}>
                    <View style={styles.itemReceive}>
                      <Icon name="enviroment" size={20} color="green" />
                      <Text style={styles.txtReceive}>Trả hàng tại</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        pushScreen(props.componentId, 'MapTrucker', data.send_to, '', false)
                      }
                    >
                      <Text style={styles.redirect}>Chỉ đường</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.txtAddress}>
                    {JSON.parse(data.send_to).address + ', ' + JSON.parse(data.send_from).city}
                  </Text>
                  <Text style={styles.txtAddress}>
                    <Icon name="calendar" size={20} color="red" /> Thời gian dự tính: 25/03/2021 -
                    09:00{' '}
                  </Text>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin đơn hàng</Text>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Loại hàng hóa</Text>
                    <Text style={styles.infoDesc}>{data.name}</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Khối lượng hàng hóa</Text>
                    <Text style={styles.infoDesc}>{data.mass} Tấn</Text>
                  </View>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin người nhận</Text>
                  <Text style={styles.nameTitle}>{JSON.parse(data.receiver_info).name}</Text>
                  <View style={styles.itemReceiver}>
                    <Text>{JSON.parse(data.receiver_info).phone}</Text>
                    <Text
                      style={styles.borderCall}
                      onPress={() => Linking.openURL('tel:' + JSON.parse(data.receiver_info).phone)}
                    >
                      Gọi ngay <Icon name="phone" size={15} color="white" />
                    </Text>
                    <Text style={styles.borderMess}>
                      Nhắn tin <Icon name="wechat" size={15} color="white" />
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.btn, { opacity: 0.5 }]}
                  onPress={() => onSuccess()}
                >
                  <Text style={styles.txtBtn}>Đã giao hàng</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  backButton: {
    flexDirection: 'row',
    width: 20,
  },
  backText: {
    color: 'black',
    fontSize: 12,
  },
  headerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  borderCircle: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 7.5,
    width: 15,
    height: 15,
    alignItems: 'center',
    left: 20,
  },
  messageCount: {
    color: 'white',
    fontSize: 10,
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
  addressContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 10,
  },
  itemReceive: {
    flexDirection: 'row',
  },
  layoutReceive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtReceive: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: colors.gray,
  },
  redirect: {
    backgroundColor: colors.lightGreen,
    color: 'white',
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 5,
  },
  itemContainer: {
    marginTop: 20,
  },
  txtAddress: {
    marginTop: 10,
  },
  layoutOrderInfo: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  txtOrderTitle: {
    fontWeight: 'bold',
    color: colors.gray,
  },
  itemInfo: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoTitle: {
    color: colors.gray,
  },
  itemReceiver: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
  },
  nameTitle: {
    marginLeft: 10,
    marginTop: 10,
  },
  borderCall: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
    borderRadius: 5,
  },
  borderMess: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    color: 'white',
    paddingVertical: 5,
    borderRadius: 5,
  },
  btn: {
    marginTop: 20,
    width: windowWidth - 100,
    alignItems: 'center',
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    borderRadius: 5,
  },
  txtBtn: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});
export default Process;
