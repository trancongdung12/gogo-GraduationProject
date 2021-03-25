import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import confirmed from '../../../assets/image/confirmed.png';
import { pushScreen } from '../../../navigation/pushScreen';
import colors from '../../../themes/Colors';
const windowWidth = Dimensions.get('window').width;
const Complete = (props) => {
  const goToLogin = () => {
    pushScreen(props.componentId, 'Login', '', '', false);
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={confirmed} />
      <Text style={styles.text}>Tất cả đã xong!</Text>
      <Text style={styles.textSmall}>Thông tin của bạn đang được xác thực, vui lòng đợi...!</Text>
      <TouchableOpacity style={styles.btnLogin} onPress={() => goToLogin()}>
        <Text style={styles.textLogin}>LIÊN HỆ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogin} onPress={() => goToLogin()}>
        <Text style={styles.textLogin}>ĐĂNG NHẬP NGAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  img: {
    height: 291,
    width: 305,
    marginBottom: 50,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  btnLogin: {
    marginTop: 10,
    width: windowWidth - 60,
  },
  textLogin: {
    color: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  textSmall: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default Complete;
