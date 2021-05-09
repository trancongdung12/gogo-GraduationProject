import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, View } from 'react-native';
import DetailOrder from '../../../components/ItemDetail';
import colors from '../../../themes/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import { pushScreen, popScreen } from '../../../navigation/pushScreen';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import Loading from '../../../components/Loading';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Item = (props) => {
  const user = useSelector((state) => state.user?.data?.user);

  const data = {
    id_send: props.data.id_user,
    id_receive: props.data.id_trucker,
    name: props.data.trucker_name,
    receive_avt: props.data.trucker_avt,
    send_avt: user.avatar,
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemProduct}>
        <Text style={styles.titleProduct}>Tài xế</Text>
        <Text style={styles.txtProduct}>{props.data.trucker_name}</Text>
      </View>
      <View style={styles.itemProduct}>
        <Text style={styles.titleProduct}>Thông tin liên lạc</Text>
        <View style={styles.descProduct}>
          <Text style={styles.txtProduct}>{props.data.phone} </Text>
          <Text
            style={styles.txtIconPrimary}
            onPress={() => pushScreen(props.id, 'Chatting', data, '', false)}
          >
            Nhắn tin
            <Icon name="wechat" size={15} color={colors.primary} />
          </Text>
        </View>
      </View>
      <View style={styles.itemProduct}>
        <Text style={styles.titleProduct}>Biển số xe</Text>
        <Text style={styles.txtProduct}>{props.data.plate}</Text>
      </View>
    </View>
  );
};
const Detail = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelOrder = () => {
    setLoading(true);
    axios({
      method: 'PUT',
      url: 'https://api-gogo.herokuapp.com/api/order/canceledOrder/' + props.data.data.id,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setLoading(false);
          popScreen(props.componentId);
          props?.onCallBack && props?.onCallBack('cancel');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const statusOrder = () => {
    pushScreen(props.componentId, 'MapSender', props.data.data, '', false);
  };
  const reOrder = () => {
    setLoading(true);
    axios({
      method: 'PUT',
      url: 'https://api-gogo.herokuapp.com/api/order/reOrder/' + props.data.data.id,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setLoading(false);
          popScreen(props.componentId);
          props?.onCallBack && props?.onCallBack('do');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {loading && <Loading />}
      <AwesomeAlert
        showProgress={false}
        show={showAlert}
        title="Hủy đơn hàng"
        message="Bạn có chắc muốn hủy đơn hàng này không?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Vâng"
        cancelText="Không"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          cancelOrder();
        }}
        showCancelButton={true}
        onCancelPressed={() => setShowAlert(false)}
      />
      <DetailOrder id={props.componentId} data={props.data.data} />

      {(() => {
        if (props.data.status === 1) {
          return (
            <TouchableOpacity style={styles.btnCancel}>
              <Text style={styles.txtCancel} onPress={() => setShowAlert(true)}>
                Hủy đơn hàng
              </Text>
            </TouchableOpacity>
          );
        } else if (props.data.status === 2) {
          return (
            <View>
              <Item id={props.componentId} data={props.data.data} />
              <TouchableOpacity style={styles.btnStatus}>
                <Text style={styles.txtStatus} onPress={() => statusOrder()}>
                  Xem quá trình vận chuyển
                </Text>
              </TouchableOpacity>
            </View>
          );
        } else if (props.data.status === 4) {
          return (
            <TouchableOpacity style={[styles.btnOrder, { marginBottom: 50 }]}>
              <Text style={styles.txtOrder} onPress={() => reOrder()}>
                Đặt lại
              </Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <View style={styles.containerBtn}>
              <TouchableOpacity style={styles.btnOrder}>
                <Text style={styles.txtOrder} onPress={() => reOrder()}>
                  Đặt lại
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnStatus}>
                <Text
                  style={styles.txtStatus}
                  onPress={() =>
                    pushScreen(props.componentId, 'Rating', props.data.data, '', false)
                  }
                >
                  Đánh giá tài xế
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      })()}
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
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  txtCancel: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary,
  },
  btnStatus: {
    width: SCREEN_WIDTH - 100,
    borderWidth: 1,
    borderColor: colors.lightGreen,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  txtStatus: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.lightGreen,
  },
  btnOrder: {
    width: SCREEN_WIDTH - 100,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: -15,
  },
  txtOrder: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  itemContainer: {
    borderTopColor: colors.boldGray,
    borderTopWidth: 1,
    paddingTop: 20,
  },
  itemProduct: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  descProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleProduct: {
    width: 120,
    color: colors.gray,
    marginRight: 10,
    fontSize: 12,
  },
  txtIconPrimary: {
    color: colors.primary,
    fontSize: 12,
    marginLeft: 5,
  },
});
