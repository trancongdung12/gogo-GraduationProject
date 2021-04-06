import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
import colors from '../themes/Colors';
import { pushScreen } from '../navigation/pushScreen';
import Price from './Price';
const OrderItem = (props) => {
  const data = {
    data: props.data,
    status: props.status,
  };
  return (
    <TouchableOpacity
      style={styles.layoutDo}
      onPress={
        props.trucker
          ? () => pushScreen(props.id, 'TruckerDetail', data, '', false)
          : () => pushScreen(props.id, 'OrderDetail', data, '', false)
      }
    >
      <View style={styles.layoutOrder}>
        <View style={styles.layoutCode}>
          <View style={styles.itemCode}>
            <Text style={styles.codeOrder}>Mã vận đơn: </Text>
            <Text style={styles.code}>{'#' + props.data.id}</Text>
          </View>
          <View style={styles.itemCode}>
            <Text style={styles.codeOrder}>Ngày tạo: </Text>
            <Text style={styles.code}>28/02/2021</Text>
          </View>
        </View>
        <View style={styles.layoutAddress}>
          <View style={styles.itemAddress}>
            <Text style={styles.nameAddress}> {JSON.parse(props.data.send_from).city}</Text>
          </View>
          <Icons size={15} name="arrowright" color="black" />
          <View style={styles.itemAddress}>
            <Text style={styles.nameAddress}> {JSON.parse(props.data.send_to).city}</Text>
          </View>
        </View>
        <View style={styles.layoutContain}>
          <View style={styles.itemContain}>
            <View style={styles.contain}>
              <Icon name="inbox" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.data.name}</Text>
            </View>
            <View style={styles.contain}>
              <Icon name="truck" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.data.truck}</Text>
            </View>
          </View>
          <View style={styles.itemContain}>
            <View style={styles.contain}>
              <Icon name="balance-scale" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.data.mass} Tấn</Text>
            </View>
            <View style={styles.contain}>
              <Icon name="calendar" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.data.time_send}</Text>
            </View>
          </View>
          <View style={styles.layoutTotal}>
            <Text style={styles.statusAddress}>Tổng tiền: </Text>
            <Price price={props.data.price} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  layoutDo: {
    marginBottom: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  layoutOrder: {
    backgroundColor: '#FAF9FE',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 2,
  },
  layoutCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
  },
  itemAddress: {
    flexDirection: 'row',
  },
  statusAddress: {
    fontWeight: 'bold',
  },
  nameAddress: {
    fontSize: 12,
    color: 'black',
  },
  layoutContain: {
    paddingHorizontal: 10,
  },
  itemContain: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 5,
  },
  contain: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    width: 120,
  },
  layoutTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
  },
  textContain: {
    fontSize: 10,
  },
});
