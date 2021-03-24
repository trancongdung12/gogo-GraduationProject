import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../themes/Colors';
import NumberFormat from 'react-number-format';
import { pushScreen } from '../navigation/pushScreen';
import Price from './Price';
const OrderItem = (props) => {
  return (
    <View style={styles.layoutDo}>
      <View style={styles.layoutOrder}>
        <View style={styles.layoutCode}>
          <View style={styles.itemCode}>
            <Text style={styles.codeOrder}>Mã vận đơn: </Text>
            <Text style={styles.code}>{props.code}</Text>
          </View>
          <View style={styles.itemCode}>
            <Text style={styles.codeOrder}>Ngày tạo: </Text>
            <Text style={styles.code}>28/02/2021</Text>
          </View>
        </View>
        <View style={styles.layoutAddress}>
          <View style={styles.itemAddress}>
            <Text style={styles.statusAddress}>Từ: </Text>
            <Text style={styles.nameAddress}> {props.from}</Text>
          </View>
          <View style={styles.itemAddress}>
            <Text style={styles.statusAddress}>Đến: </Text>
            <Text style={styles.nameAddress}> {props.to}</Text>
          </View>
        </View>
        <View style={styles.layoutContain}>
          <View style={styles.itemContain}>
            <View style={styles.contain}>
              <Icon name="inbox" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.product}</Text>
            </View>
            <View style={styles.contain}>
              <Icon name="truck" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.truck}</Text>
            </View>
          </View>
          <View style={styles.itemContain}>
            <View style={styles.contain}>
              <Icon name="balance-scale" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.mass} Tấn</Text>
            </View>
            <View style={styles.contain}>
              <Icon name="calendar" size={15} color={colors.primary} />
              <Text style={styles.textContain}> {props.time}</Text>
            </View>
          </View>
          <View style={styles.layoutTotal}>
            <Text style={styles.statusAddress}>Tổng tiền: </Text>
            <Price price={props.price} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.layoutDetail}
          onPress={
            props.trucker
              ? () => pushScreen(props.id, 'TruckerDetail', props.data, '', false)
              : () => pushScreen(props.id, 'OrderDetail', props.data, '', false)
          }
        >
          <Text style={styles.textDetail}>XEM CHI TIẾT</Text>
          <Icon name="angle-right" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  layoutDo: {
    marginBottom: 10,
    paddingHorizontal: 25,
    marginTop: 10,
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

    elevation: 5,
  },
  layoutCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 5,
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
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  itemContain: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 5,
  },
  contain: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    width: 120,
  },
  layoutTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  layoutDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textDetail: {
    color: colors.primary,
  },
  textContain: {
    fontSize: 10,
  },
});
