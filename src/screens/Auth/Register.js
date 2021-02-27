import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Input from '../../components/InputRegister';
import { pushScreen } from '../../navigation/pushScreen';
const Register = (props) => {
  const saveInfo = () => {
    pushScreen(props.componentId, 'CompleteRegister', '', '', false);
  };
  return (
    <ScrollView style={styles.container}>
      <Input title="Họ & tên" hint="Nguyễn Văn A" />
      <Input title="Số CMND" hint="206213366" />
      <Input title="Ngày sinh" hint="01/01/2000" />
      <Input title="Địa chỉ" hint="Bình Thuận, Tây Sơn, Bình Định" />
      <Input title="Mã số thuế(nếu có)" hint="123456789" />
      <Input title="Email" hint="nguyenvana@gmail.com" />
      <Input title="Địa chỉ" hint="Bình Thuận, Tây Sơn, Bình Định" />
      <Input title="Tên người dùng" hint="nguyenvana" />
      <Input title="Địa chỉ" hint="Bình Thuận, Tây Sơn, Bình Định" />
      <Input title="Mật khẩu" hint="" isPassword={true} />
      <Input title="Lặp lại mật khẩu" hint="" isPassword={true} />
      <TouchableOpacity style={styles.btnRegister} onPress={() => saveInfo()}>
        <Text>Đăng ký</Text>
      </TouchableOpacity>
      <Text style={styles.textLogin}>
        Hoặc <Text>Đăng nhập</Text> nếu bạn đã có tài khoản
      </Text>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  btnRegister: {
    alignSelf: 'center',
  },
  textLogin: {
    alignSelf: 'center',
    marginBottom: 100,
  },
});

//make this component available to the app
export default Register;
