import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../themes/Colors';
import { homeScreen, pushScreen } from '../../navigation/pushScreen';
import flag from '../../assets/image/flag.png';
const Login = (props) => {
  const handleLogin = () => {
    homeScreen();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Chào mừng bạn đến với GoGo!</Text>
      <View style={styles.layoutInput}>
        <View style={styles.itemInput}>
          <View style={styles.layoutRegion}>
            <Image style={styles.imgRegion} source={flag} />
            <Text style={styles.textRegion}>+84</Text>
          </View>
          <TextInput keyboardType="number-pad" style={styles.input} placeholder="985452133" />
        </View>
        <View style={styles.itemInput}>
          <Icon style={styles.icon} name="lock" size={25} color={Colors.primary} filled />
          <TextInput style={styles.input} placeholder="••••••••••••••••" secureTextEntry={true} />
        </View>
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={() => handleLogin()}>
        <Text style={styles.textLogin}>ĐĂNG NHẬP NGAY</Text>
      </TouchableOpacity>
      <Text style={styles.layoutRegister}>
        Hoặc
        <Text
          onPress={() => pushScreen(props.componentId, 'SendOTP', '', '', false)}
          style={styles.textRegister}
        >
          {' '}
          Đăng ký{' '}
        </Text>
        nếu bạn chưa có tài khoản
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
  },
  layoutRegion: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightColor: Colors.lightGray,
    borderRightWidth: 1,
    paddingRight: 5,
  },
  imgRegion: {
    height: 30,
    width: 30,
  },
  textRegion: {
    fontSize: 14,
    marginLeft: 5,
  },
  textTitle: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
  },
  btnLogin: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
    backgroundColor: Colors.primary,
    paddingHorizontal: 70,
    paddingVertical: 12,
    borderRadius: 5,
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
  },
  layoutInput: {
    marginTop: 50,
    marginBottom: 30,
  },
  itemInput: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 15,
  },
  icon: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 14,
    paddingLeft: 10,
  },
  layoutRegister: {
    alignSelf: 'center',
    marginTop: 0,
  },
  textRegister: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default Login;
