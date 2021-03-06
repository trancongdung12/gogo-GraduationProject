import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Input from '../../../components/InputRegister';
import Back from '../../../components/Back';
import colors from '../../../themes/Colors';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import avt_trucker from '../../../assets/image/avt_trucker.png';
import { pushScreen } from '../../../navigation/pushScreen';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { TOKEN } from '../../../data';
const SCREEN_WIDTH = Dimensions.get('window').width;

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
  const [avatar, setAvatar] = useState();
  const errorSignUp = useSelector((state) => state.register.errorSignUp);
  const saveInfo = () => {
    if (avatar) {
      const data = {
        phone: phone,
        password: password,
        email: email,
        full_name: name,
        birthday: birthday,
        address: address,
        id_card: idCard,
        id_role: 2,
        avatar: avatar,
      };
      pushScreen(props.componentId, 'TruckerRegisterInfo', data, '', false);
    } else {
      Alert.alert('Error', 'Bạn chưa thêm ảnh cho tài xế');
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setBirthday(moment(currentDate).format('YYYY-MM-DD'));
  };
  const uploadImageFunction = () => {
    const options = {
      title: 'Thay đổi ảnh đại diện',
      takePhotoButtonTitle: 'Chụp ảnh',
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
      cancelButtonTitle: 'Đóng',
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      permissionDenied: {
        title: 'appName',
        text: 'permissionWarning',
        okTitle: 'later',
        reTryTitle: 'openSettings',
      },
      quality: 1,
    };
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log(1);
      } else if (response.error) {
        console.log(response.error);
      } else if (response.customButton) {
        console.log(3);
      } else {
        // setLoading(true);
        console.log(response);
        if (response != null) {
          const dataForm = new FormData();
          dataForm.append('folder', 'avatars');
          dataForm.append('image', {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          });
          axios({
            method: 'POST',
            url: 'http://dtravel.crayi.com/api/v1/image-upload',
            data: dataForm,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + TOKEN,
            },
          })
            .then(function (responses) {
              console.log(responses);
              if (responses.status === 200) {
                // setLoading(false);
                setAvatar(responses.data.data);
              }
            })
            .catch(function (error) {
              console.log(error);
              console.log(error.response.data);
            });
        }
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <AwesomeAlert show={loading} showProgress={true} progressColor={colors.primary} />
      <Back id={props.componentId} />
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <TouchableOpacity onPress={() => uploadImageFunction()}>
        <Image style={styles.imgTrucker} source={avatar ? { uri: avatar } : avt_trucker} />
      </TouchableOpacity>
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
      <Input title="Email" hint="nguyenvana@gmail.com" changeText={setEmail} />
      <Input title="Địa chỉ" hint="Bình Thuận, Tây Sơn, Bình Định" changeText={setAddress} />
      <Input title="Mật khẩu" hint="••••••••••••••••" isPassword={true} changeText={setPassword} />
      <Input
        title="Lặp lại mật khẩu"
        hint="••••••••••••••••"
        isPassword={true}
        changeText={setConfirmPassword}
      />
      {errorSignUp && <Text style={styles.textError}>Dữ liệu bạn nhập không chính xác</Text>}
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
    marginLeft: 20,
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
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  titleDate: {
    width: 70,
  },
  btnDate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.lightGray,
    width: 230,
    marginLeft: 20,
    borderRadius: 5,
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
  textError: {
    fontSize: 10,
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 0,
  },
  imgTrucker: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 10 },
});

export default SenderRegister;
