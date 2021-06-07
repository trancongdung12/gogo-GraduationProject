/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../themes/Colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
import ImageView from 'react-native-image-view';
import Price from './Price';
import Back from './Back';
import Clipboard from '@react-native-clipboard/clipboard';
const Item = (props) => {
  return (
    <View style={styles.itemProduct}>
      <Text style={styles.titleProduct}>{props.title}</Text>
      <Text style={styles.txtProduct}>{props.value}</Text>
    </View>
  );
};

const orderDetail = (props) => {
  const [visible, setVisible] = useState(false);
  const data = props?.data;
  console.log(data);
  const data_image = JSON.parse(data.image) || [];
  const receiver_info = JSON.parse(data.receiver_info);
  const sender_info = JSON.parse(data.sender_info);
  const images = data_image?.map((el, index) => ({
    source: { uri: el },
    width: 806,
    height: 520,
  }));
  return (
    <View>
      <View style={styles.layoutHeader}>
        <Back id={props.id} />
        <View style={styles.layoutTitle}>
          <Text style={styles.title}>Thông tin đơn hàng</Text>
        </View>
      </View>
      <ImageView
        animationType={'fade'}
        images={images}
        imageIndex={0}
        isVisible={visible}
        onClose={() => setVisible(false)}
      />
      <View style={styles.addressContainer}>
        <View style={styles.layoutAdds}>
          <View style={styles.itemAdds}>
            <Icon name="enviroment" size={20} color="red" />
            <Text style={styles.textAdds}>
              {JSON.parse(data.send_from).address + ', ' + JSON.parse(data.send_from).city}
            </Text>
          </View>
          <View style={styles.layoutInfo}>
            <View style={styles.symbol} />
            <Text style={styles.textInfo}> {sender_info.name + ' - ' + sender_info.phone}</Text>
          </View>
        </View>
        <View style={styles.layoutAdds}>
          <View style={styles.itemAdds}>
            <Icon name="enviroment" size={20} color="green" />
            <Text style={styles.textAdds}>
              {JSON.parse(data.send_to).address + ', ' + JSON.parse(data.send_to).city}
            </Text>
          </View>
          <View style={styles.layoutInfo}>
            <View style={styles.symbol} />
            <Text style={styles.textInfo}> {receiver_info.name + ' - ' + receiver_info.phone}</Text>
          </View>
        </View>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.itemProduct}>
          <Text style={styles.titleProduct}>Mã vận đơn</Text>
          <TouchableOpacity style={styles.descProduct} onPress={() => Clipboard.setString(data.id)}>
            <Text style={styles.txtProduct}>{data.id}</Text>
            <Text style={styles.txtIcon}>
              Sao chép <Icon style={styles.icon} name="copy1" size={12} color="#1A8910" />
            </Text>
          </TouchableOpacity>
        </View>
        <Item title="Thời gian bốc hàng" value={data.time_send} />
        <Item title="Tên hàng hóa" value={data.name} />
        <Item title="Khối lượng hàng hóa" value={data.mass + ' Tấn'} />
        <Item title="Ghi chú" value={sender_info.note} />
        <TouchableOpacity style={styles.itemProduct} onPress={() => setVisible(true)}>
          <Text style={styles.titleProduct}>Hình ảnh</Text>
          <View style={styles.descProduct}>
            <Image
              style={[styles.image, data_image.length > 1 && { opacity: 0.5 }]}
              source={{
                uri: data_image[0],
              }}
            />
            {data_image.length > 1 && <Text style={styles.txtInImage}>+1</Text>}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.vehicleContainer}>
        <Item title="Phương tiện" value={data.truck} />
        <View style={styles.itemProduct}>
          <Text style={styles.titleProduct}>Hóa đơn điện tử</Text>
          <View style={styles.descProduct}>
            <Text style={styles.txtProduct}>{data.export_data ? 'Có' : 'Không'} </Text>
            {data.export_data && (
              <Text style={styles.txtIconPrimary}>
                Xem chi tiết
                <Icon style={styles.icon} name="back" size={12} color={colors.primary} />
              </Text>
            )}
          </View>
        </View>
        <Item
          title="Hình thức thanh toán"
          value={data.insurance_fee ? 'Thanh toán MoMo' : 'Thanh toán trực tiếp'}
        />
        <Item title="Ngày tạo" value={data.created_at} />
        <View style={styles.itemProduct}>
          <Text style={styles.titleProduct}>Tổng tiền</Text>
          <View style={styles.descProduct}>
            <Price price={data.price} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default orderDetail;

const styles = StyleSheet.create({
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
  addressContainer: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 20,
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
  symbol: {
    width: 20,
    borderLeftColor: colors.boldGray,
    borderBottomColor: colors.boldGray,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 5,
    marginTop: -5,
    marginLeft: 9,
    height: 17,
  },
  productContainer: {
    marginTop: 20,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 5,
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
  txtIcon: {
    color: '#1A8910',
    fontSize: 12,
    marginLeft: 5,
  },
  txtIconPrimary: {
    color: colors.primary,
    fontSize: 12,
    marginLeft: 5,
  },
  txtProduct: {
    fontSize: 13,
  },
  vehicleContainer: {
    marginTop: 20,
  },
  image: {
    height: 60,
    width: 60,
  },
  txtInImage: {
    marginLeft: -40,
    fontSize: 25,
    color: colors.gray,
  },
});
