import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../themes/Colors';
import { pushScreen } from '../../navigation/pushScreen';
import flag from '../../assets/image/flag.png';
import { useDispatch, useSelector } from 'react-redux';
import LoginActions from '../../redux/LoginRedux/actions';
import colors from '../../themes/Colors';
const Login = (props) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loading = useSelector((state) => state.login.loading);
  const dispatch = useDispatch();
  const onLogin = () => {
    const dataLogin = {
      phone: phone,
      password: password,
    };
    if (dataLogin.phone === '' || dataLogin.password === '') {
      setError('Số điện thoại hoặc mật khẩu không được để trống');
    } else {
      Keyboard.dismiss();
      dispatch(LoginActions.userLogin(dataLogin));
    }
  };
  return loading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Chào mừng bạn đến với GoGo!</Text>
      <View style={styles.layoutInput}>
        <View style={styles.itemInput}>
          <View style={styles.layoutRegion}>
            <Image style={styles.imgRegion} source={flag} />
            <Text style={styles.textRegion}>+84</Text>
          </View>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="985452133"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.itemInput}>
          <Icon style={styles.icon} name="lock" size={25} color={Colors.primary} filled />
          <TextInput
            style={styles.input}
            placeholder="••••••••••••••••"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      <Text style={styles.textError}>{error ? error : ''}</Text>
      <TouchableOpacity style={styles.btnLogin} onPress={() => onLogin()}>
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
    marginTop: 0,
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
  textError: {
    fontSize: 10,
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
