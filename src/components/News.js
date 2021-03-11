import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import opening from '../assets/image/opening.png';
import colors from '../themes/Colors';

const windowWidth = Dimensions.get('window').width;
const News = () => {
  return (
    <View style={styles.layoutNews}>
      <Image style={styles.imgNews} source={opening} />
      <Text style={styles.titleNews}>Ưu đãi cực khủng nhân lễ ra mắt sẳn phẩm</Text>
      <Text style={styles.dateNews}>
        <Icon name="calendar" fontSize={20} /> 01/03/2021
      </Text>
      <Text style={styles.descNews}>
        Tổ chức sự lễ mắt sản phẩm, dịch vụ mới của công ty, doanh nghiệp là một sự đặc biệt quan
        trọng bởi đây là một sự kiện đem đến ấn tượng đầu tiên dành cho khách hàng. Là “tiếng súng
        mở màn” mà doanh nghiệp đem đến. Chính vì vậy để tổ chức một buổi lễ ra mắt ấn tượng và hiệu
        quả, hẳn không phải chuyện dễ dàng...
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  layoutNews: {
    width: windowWidth - 30,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.whiteGray,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
    marginBottom: 10,
  },
  imgNews: {
    width: windowWidth - 50,
    height: 200,
  },
  titleNews: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  descNews: {
    fontSize: 11,
    color: colors.grayPlace,
  },
  dateNews: {
    fontSize: 12,
  },
});
export default News;
