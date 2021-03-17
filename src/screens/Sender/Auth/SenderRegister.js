import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Input from '../../../components/InputRegister';
import Back from '../../../components/Back';
import colors from '../../../themes/Colors';
import { useSelector, useDispatch } from 'react-redux';
import registerActions from '../../../redux/RegisterRedux/actions';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
const SenderRegister = (props) => {
  const phone = useSelector((state) => state.register.phone);
  const loading = useSelector((state) => state.register.loading);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [idCard, setIdCard] = useState('');
  const [date, setDate] = useState(new Date(2000, 0, 1, 0, 70));
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const saveInfo = () => {
    const data = {
      phone: phone,
      password: password,
      email: email,
      full_name: name,
      birthday: birthday,
      address: address,
      id_card: idCard,
      id_role: 1,
    };
    dispatch(registerActions.userSignUp(data));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setBirthday(moment(currentDate).format('YYYY-MM-DD'));
  };
  return loading ? (
    <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <Back id={props.componentId} />
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <Input title="Họ & tên" hint="Nguyễn Văn A" changeText={setName} />
      <Input title="Số CMND" hint="206213366" changeText={setIdCard} />
      <View style={styles.layoutDate}>
        <Text style={styles.titleDate}>Ngày sinh</Text>
        <TouchableOpacity style={styles.btnDate} onPress={() => setShow(true)}>
          <Text style={[styles.textDate, birthday && { color: 'black' }]}>
            {birthday ? birthday : '2000-03-14'}
          </Text>
          <Icon style={styles.icon} name="calendar" size={20} color="red" />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          maximumDate={new Date(2008, 0, 1, 0, 70)}
          display="spinner"
          onChange={onChange}
        />
      )}
      {/* <Input title="Ngày sinh" hint="01/01/2000" changeText={setBirthday} /> */}
      <Input title="Email" hint="nguyenvana@gmail.com" changeText={setEmail} />
      <Input title="Địa chỉ" hint="Bình Thuận, Tây Sơn, Bình Định" changeText={setAddress} />
      <Input title="Mật khẩu" hint="••••••••••••••••" isPassword={true} changeText={setPassword} />
      <Input
        title="Lặp lại mật khẩu"
        hint="••••••••••••••••"
        isPassword={true}
        changeText={setConfirmPassword}
      />
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
        <Text style={styles.textLogin}>ĐĂNG KÝ</Text>
      </TouchableOpacity>
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
  txtError: {
    fontSize: 10,
    color: 'red',
  },
  layoutDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  btnDate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGray,
    width: 230,
    borderRadius: 5,
    marginLeft: 20,
    height: 35,
    paddingLeft: 10,
    alignItems: 'center',
    paddingVertical: 0,
  },
  textDate: {
    color: colors.grayPlace,
  },
  icon: {
    marginRight: 10,
    marginLeft: 100,
  },
});

export default SenderRegister;
