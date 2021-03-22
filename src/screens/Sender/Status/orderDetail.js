import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Back from '../../../components/Back';
import colors from '../../../themes/Colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
import ImageView from 'react-native-image-view';
import Price from '../../../components/Price';

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
  const images = [
    {
      source: {
        uri: 'https://catdasymanh24h.net/wp-content/uploads/2019/08/gia-xi-mang.jpg',
      },
      width: 806,
      height: 520,
    },
    {
      source: {
        uri: 'https://hutbephotsach.com/wp-content/uploads/2019/07/xm2.jpg',
      },
      width: 806,
      height: 520,
    },
    {
      source: {
        uri:
          'https://namthanhvinh.vn/wp-content/uploads/2016/09/Gia-xi-mang-xay-dung-tai-TP-ho-chi-minh.jpeg',
      },
      width: 806,
      height: 620,
    },
  ];
  const data = props.data;
  const receiver_info = JSON.parse(data.receiver_info);
  const sender_info = JSON.parse(data.sender_info);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.layoutHeader}>
        <Back id={props.componentId} />
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
        renderFooter={(currentImage) => (
          <View>
            <Text>My footer</Text>
          </View>
        )}
      />
      <View style={styles.addressContainer}>
        <View style={styles.layoutAdds}>
          <View style={styles.itemAdds}>
            <Icon name="enviroment" size={20} color="red" />
            <Text style={styles.textAdds}>{data.send_from}</Text>
          </View>
          <View style={styles.layoutInfo}>
            <View style={styles.symbol} />
            <Text style={styles.textInfo}> {sender_info.name + ' - ' + sender_info.phone}</Text>
          </View>
        </View>
        <View style={styles.layoutAdds}>
          <View style={styles.itemAdds}>
            <Icon name="enviroment" size={20} color="green" />
            <Text style={styles.textAdds}>{data.send_to}</Text>
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
          <View style={styles.descProduct}>
            <Text style={styles.txtProduct}>{data.id}</Text>
            <Text style={styles.txtIcon}>
              Sao chép <Icon style={styles.icon} name="copy1" size={12} color="#1A8910" />
            </Text>
          </View>
        </View>
        <Item title="Thời gian bốc hàng" value={data.time_send} />
        <Item title="Tên hàng hóa" value="Xi măng" />
        <Item title="Khối lượng hàng hóa" value={data.mass + ' Tấn'} />
        <Item title="Ghi chú" value={sender_info.note} />
        <TouchableOpacity style={styles.itemProduct} onPress={() => setVisible(true)}>
          <Text style={styles.titleProduct}>Hình ảnh</Text>
          <View style={styles.descProduct}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://catdasymanh24h.net/wp-content/uploads/2019/08/gia-xi-mang.jpg',
              }}
            />
            <Text style={styles.txtInImage}>+1</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.vehicleContainer}>
        <Item title="Phương tiện" value={data.car_type} />
        <View style={styles.itemProduct}>
          <Text style={styles.titleProduct}>Hóa đơn điện tử</Text>
          <View style={styles.descProduct}>
            <Text style={styles.txtProduct}>Có </Text>
            <Text style={styles.txtIconPrimary}>
              Xem chi tiết
              <Icon style={styles.icon} name="back" size={12} color={colors.primary} />
            </Text>
          </View>
        </View>
        <Item title="Hình thức thanh toán" value="Thanh toán trực tiếp " />
        <Item title="Ngày tạo" value={data.created_at} />
        <View style={styles.itemProduct}>
          <Text style={styles.titleProduct}>Tổng tiền</Text>
          <View style={styles.descProduct}>
            <Price price={data.price} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btnCancel}>
        <Text style={styles.txtCancel}>Hủy đơn hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default orderDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
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
    opacity: 0.5,
  },
  txtInImage: {
    marginLeft: -40,
    fontSize: 25,
    color: colors.gray,
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
    paddingVertical: 5,
    textAlign: 'center',
    color: colors.primary,
  },
});
