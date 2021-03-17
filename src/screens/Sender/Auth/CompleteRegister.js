import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import confirmed from '../../../assets/image/confirmed.png';
import { pushScreen } from '../../../navigation/pushScreen';
import colors from '../../../themes/Colors';

const Complete = (props) => {
  const goToLogin = () => {
    pushScreen(props.componentId, 'Login', '', '', false);
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={confirmed} />
      <Text style={styles.text}>Tất cả đã xong!</Text>
      <TouchableOpacity style={styles.btnLogin} onPress={() => goToLogin()}>
        <Text style={styles.textLogin}>ĐĂNG NHẬP NGAY</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
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
    marginTop: 20,
  },
  textLogin: {
    color: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 70,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

//make this component available to the app
export default Complete;
