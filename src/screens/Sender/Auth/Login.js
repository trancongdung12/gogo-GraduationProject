import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../themes/Colors';
import { pushScreen } from '../../../navigation/pushScreen';
import flag from '../../../assets/image/flag.png';
import { useDispatch, useSelector } from 'react-redux';
import LoginActions from '../../../redux/LoginRedux/actions';
import colors from '../../../themes/Colors';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
const Login = (props) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loading = useSelector((state) => state.login.loading);
  const errorLogin = useSelector((state) => state.login.errorLogin);
  const dispatch = useDispatch();
  const onLogin = async () => {
    firebase.messaging().requestPermission();
    const fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken);
    const dataLogin = {
      phone: phone,
      password: password,
      token: fcmToken,
    };
    if (dataLogin.phone === '' || dataLogin.password === '') {
      setError('Số điện thoại hoặc mật khẩu không được để trống');
    } else {
      Keyboard.dismiss();
      dispatch(LoginActions.userLogin(dataLogin));
    }
  };
  return (
    <View style={styles.container}>
      <AwesomeAlert show={loading} showProgress={true} progressColor={colors.primary} />
      <Text style={styles.textTitle}>Chào mừng bạn đến với GoGo!</Text>
      <View style={styles.layoutInput}>
        <View style={styles.itemInput}>
          <View style={styles.layoutRegion}>
            <Image style={styles.imgRegion} source={flag} />
            {/* <Text style={styles.textRegion}>+84</Text> */}
          </View>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="0985452133"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.itemInput}>
          <Icon style={styles.icon} name="lock" size={25} color={Colors.primary} />
          <TextInput
            style={[styles.input, { paddingLeft: 15 }]}
            placeholder="••••••••"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      {/* <Text style={styles.textError}>{error ? error : ''}</Text> */}
      {errorLogin && (
        <Text style={styles.textError}>Số điện thoại hoặc mật khẩu của bạn không đúng</Text>
      )}
      <TouchableOpacity style={styles.btnLogin} onPress={() => onLogin()}>
        <Text style={styles.textLogin}>ĐĂNG NHẬP NGAY</Text>
      </TouchableOpacity>
      <View style={styles.layoutRegister}>
        <Text>Hoặc </Text>
        <TouchableOpacity onPress={() => pushScreen(props.componentId, 'SendOTP', '', '', false)}>
          <Text style={styles.textRegister}>đăng ký</Text>
        </TouchableOpacity>
        <Text> nếu bạn chưa có tài khoản</Text>
      </View>
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
    marginTop: 15,
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
    marginLeft: 2,
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
    flexDirection: 'row',
  },
  textRegister: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  textError: {
    fontSize: 10,
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 0,
  },
});

export default Login;
