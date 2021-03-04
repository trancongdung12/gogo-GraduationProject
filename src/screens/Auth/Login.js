import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../themes/Colors';
import { homeScreen, pushScreen } from '../../navigation/pushScreen';
const Login = (props) => {
  const handleLogin = () => {
    homeScreen();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Chào mừng bạn đến với GoGo!</Text>
      <View style={styles.layoutInput}>
        <View style={styles.itemInput}>
          <Icon style={styles.icon} name="user" size={30} color="gray" />
          <TextInput style={styles.input} placeholder="0985452133" />
        </View>
        <View style={styles.itemInput}>
          <Icon style={styles.icon} name="lock" size={30} color="gray" />
          <TextInput style={styles.input} placeholder="••••••••••••••••" secureTextEntry={true} />
        </View>
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={() => handleLogin()}>
        <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
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
    paddingHorizontal: 80,
    paddingVertical: 15,
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
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 15,
  },
  icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
  },
  input: {
    width: 200,
    height: 50,
    fontSize: 16,
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
