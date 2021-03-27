import React, { useState } from 'react';
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
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const Process = (props) => {
  const [option, setOption] = useState('receiver');
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <Header back={true} title="Đơn hàng: 12345" isWhite={true} Id={props.componentId} />
        <View style={styles.layoutOption}>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('receiver')}>
            <Text style={[styles.textOption, option === 'receiver' && styles.textChoose]}>
              NHẬN
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption} onPress={() => setOption('delivery')}>
            <Text style={[styles.textOption, option === 'delivery' && styles.textChoose]}>
              GIAO
            </Text>
          </TouchableWithoutFeedback>
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
                    <Text style={styles.redirect}>Chỉ đường</Text>
                  </View>
                  <Text style={styles.txtAddress}>101B Lê Hữu Trác, P. Phước Mỹ, Q. Sơn Trà</Text>
                  <Text style={styles.txtAddress}>
                    <Icon name="calendar" size={20} color="red" /> 25/03/2021 - 09:00{' '}
                  </Text>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin đơn hàng</Text>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Loại hàng hóa</Text>
                    <Text style={styles.infoDesc}>Xi măng</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Khối lượng hàng hóa</Text>
                    <Text style={styles.infoDesc}>1 Tấn</Text>
                  </View>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin người đặt</Text>
                  <Text style={styles.nameTitle}>Nguyễn Văn A</Text>
                  <View style={styles.itemReceiver}>
                    <Text>0332450433</Text>
                    <Text
                      style={styles.borderCall}
                      onPress={() => Linking.openURL('tel:0332450433')}
                    >
                      <Icon name="phone" size={15} color="white" />
                      Gọi ngay
                    </Text>
                    <Text style={styles.borderMess}>
                      <Icon name="wechat" size={15} color="white" />
                      Nhắn tin
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btn}>
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
                      <Text style={styles.txtReceive}>Nhận hàng tại</Text>
                    </View>
                    <Text style={styles.redirect}>Chỉ đường</Text>
                  </View>
                  <Text style={styles.txtAddress}>101B Lê Hữu Trác, P. Phước Mỹ, Q. Sơn Trà</Text>
                  <Text style={styles.txtAddress}>
                    <Icon name="calendar" size={20} color="red" /> 25/03/2021 - 09:00{' '}
                  </Text>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin đơn hàng</Text>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Loại hàng hóa</Text>
                    <Text style={styles.infoDesc}>Xi măng</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.infoTitle}>Khối lượng hàng hóa</Text>
                    <Text style={styles.infoDesc}>1 Tấn</Text>
                  </View>
                </View>
                <View style={styles.layoutOrderInfo}>
                  <Text style={styles.txtOrderTitle}>Thông tin người đặt</Text>
                  <Text style={styles.nameTitle}>Nguyễn Văn A</Text>
                  <View style={styles.itemReceiver}>
                    <Text>0332450433</Text>
                    <Text
                      style={styles.borderCall}
                      onPress={() => Linking.openURL('tel:0332450433')}
                    >
                      <Icon name="phone" size={15} color="white" />
                      Gọi ngay
                    </Text>
                    <Text style={styles.borderMess}>
                      <Icon name="wechat" size={15} color="white" />
                      Nhắn tin
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btn}>
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
  },
  borderCall: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 5,
    color: 'white',
    borderRadius: 5,
  },
  borderMess: {
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    color: 'white',
    borderRadius: 5,
  },
  btn: {
    marginTop: 30,
    width: windowWidth - 100,
    alignItems: 'center',
    backgroundColor: colors.primary,
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
