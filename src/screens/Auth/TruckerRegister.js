import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Input from '../../components/InputRegister';
import { pushScreen } from '../../navigation/pushScreen';
import Back from '../../components/Back';
import colors from '../../themes/Colors';
import avt_trucker from '../../assets/image/avt_trucker.png';
const TruckerRegister = (props) => {
  const saveInfo = () => {
    pushScreen(props.componentId, 'TruckerRegisterStep2', '', '', false);
  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Back id={props.componentId} />
      <Text style={styles.title}>Thông tin chủ xe</Text>
      <Image style={styles.imgTrucker} source={avt_trucker} />
      <Input title="Họ & tên" hint="Nguyễn Văn A" />
      <Input title="Số CMND" hint="206213366" />
      <Input title="Ngày sinh" hint="01/01/2000" />
      <Input title="Địa chỉ" hint="Bình Thuận, Tây Sơn, Bình Định" />
      <Input title="Mật khẩu" hint="••••••••••••••••" isPassword={true} />
      <Input title="Lặp lại mật khẩu" hint="••••••••••••••••" isPassword={true} />
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.label}>
          Tôi đồng ý với các <Text style={styles.labelBold}>điều khoản và thỏa thuận</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={() => saveInfo()}>
        <Text style={styles.textLogin}>Tiếp theo</Text>
      </TouchableOpacity>
      <Text style={styles.layoutRegister}>
        Hoặc
        <Text
          onPress={() => pushScreen(props.componentId, 'Login', '', '', false)}
          style={styles.textRegister}
        >
          {' '}
          Đăng nhập{' '}
        </Text>
        nếu bạn đã có tài khoản
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  btnRegister: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  labelBold: {
    color: colors.primary,
  },
  btnLogin: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 100,
    paddingVertical: 12,
    borderRadius: 5,
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
  },
  layoutRegister: {
    alignSelf: 'center',
    marginTop: 0,
  },
  textRegister: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  imgTrucker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default TruckerRegister;
