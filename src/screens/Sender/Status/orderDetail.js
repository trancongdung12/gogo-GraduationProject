import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, View } from 'react-native';
import DetailOrder from '../../../components/ItemDetail';
import colors from '../../../themes/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import { pushScreen } from '../../../navigation/pushScreen';
import axios from 'axios';
import { useSelector } from 'react-redux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Item = (props) => {
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
          <Text style={styles.txtIconPrimary}>
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
  const cancelOrder = () => {};
  const statusOrder = () => {
    pushScreen(props.componentId, 'MapSender', props.data.data, '', false);
  };
  const reOrder = () => {};
  return (
    <ScrollView style={styles.container}>
      <DetailOrder id={props.componentId} data={props.data.data} />

      {(() => {
        if (props.data.status === 1) {
          return (
            <TouchableOpacity style={styles.btnCancel}>
              <Text style={styles.txtCancel} onPress={() => cancelOrder()}>
                Hủy đơn hàng
              </Text>
            </TouchableOpacity>
          );
        } else if (props.data.status === 2) {
          return (
            <View>
              <Item data={props.data.data} />
              <TouchableOpacity style={styles.btnStatus}>
                <Text style={styles.txtStatus} onPress={() => statusOrder()}>
                  Xem quá trình vận chuyển
                </Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          return (
            <TouchableOpacity style={styles.btnOrder}>
              <Text style={styles.txtOrder} onPress={() => reOrder()}>
                Đặt lại
              </Text>
            </TouchableOpacity>
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
    borderWidth: 2,
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
    marginBottom: 50,
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
