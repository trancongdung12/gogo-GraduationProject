import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../themes/Colors';
import OptionSetting from '../../../components/OptionSetting';
import Header from '../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import LoginActions from '../../../redux/LoginRedux/actions';
import UserActions from '../../../redux/UserRedux/actions';
import ImagePicker from 'react-native-image-picker';
import { TOKEN } from '../../../data';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import AwesomeAlert from 'react-native-awesome-alerts';

const User = (props) => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    setLogoutLoading(true);
    dispatch(LoginActions.userLogout(onSuccess));
  };
  const onSuccess = () => {
    setLogoutLoading(false);
  };
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  var user = [];
  var data = useSelector((state) => state.user?.data?.user?.[0]);
  var rate = useSelector((state) => state.user?.data?.rate?.[0]);
  const [images, setImages] = useState('');
  if (data) {
    user = data;
  }
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
        setLoading(true);
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
                setLoading(false);
                setImages(responses.data.data);
                const dataImages = {
                  avatar: responses.data.data,
                };
                dispatch(UserActions.userChangeAvatar(user.id, dataImages));
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
  const ShowAlert = () => {
    alert('Chức năng đang được phát triển');
  };
  return (
    <ScrollView style={styles.container}>
      <AwesomeAlert show={logoutLoading} showProgress={true} progressColor={colors.primary} />
      <Header title="Tài khoản của bạn" Id={props.componentId} />
      <View style={styles.layoutInfo}>
        <TouchableOpacity onPress={() => uploadImageFunction()}>
          <Image
            style={[styles.avtInfo, loading && { opacity: 0.8 }]}
            source={{ uri: images ? images : user.avatar }}
          />
          {loading && (
            <ActivityIndicator style={styles.loading} size="small" color={colors.primary} />
          )}
        </TouchableOpacity>
        <View style={styles.layoutPersonalInfo}>
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.phone}>
            {rate?.point} <Icon name="star" color="#F9A826" />
          </Text>
          <View style={styles.layoutPrice}>
            <Text style={styles.phone}>
              <Text style={styles.thousand}>Số dư: </Text>
              <NumberFormat
                value={user.amount}
                displayType={'text'}
                thousandSeparator={true}
                renderText={(formattedValue) => <Text>{formattedValue}</Text>}
              />{' '}
              <Text style={styles.thousand}>đ</Text>
            </Text>
            <TouchableOpacity style={styles.btnPayment}>
              <Text style={styles.txtPayment}>Rút tiền</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.layoutEditInfo}>
        <View style={styles.editInfo}>
          <Text style={styles.editTitle}>Thông tin cá nhân</Text>
        </View>
        <View style={styles.itemVerify}>
          <Text style={styles.txtVerify}>Đầy đủ</Text>
          <Icon name="angle-right" size={25} />
        </View>
      </View>
      <View style={styles.layoutEditInfo}>
        <View style={styles.editInfo}>
          <Text style={styles.editTitle}>Thông tin xe</Text>
        </View>
        <View style={styles.itemVerify}>
          <Text style={styles.txtVerify}>Đầy đủ</Text>
          <Icon name="angle-right" size={25} />
        </View>
      </View>
      <View style={styles.layoutEditInfo}>
        <View style={styles.editInfo}>
          <Text style={styles.editTitle}>Thông tin doanh nghiệp</Text>
        </View>
        <View style={styles.itemVerify}>
          <Text style={styles.txtRegister}>Đăng ký</Text>
          <Icon name="angle-right" size={25} />
        </View>
      </View>
      <View style={styles.layoutOption}>
        <OptionSetting icon="setting" name="Cài đặt" handle={ShowAlert} />
        <OptionSetting icon="questioncircleo" name="Câu hỏi thường gặp" handle={ShowAlert} />
        <OptionSetting icon="lock" name="Điều khoản" handle={ShowAlert} />
        <OptionSetting icon="customerservice" name="Trợ giúp" handle={ShowAlert} />
        <OptionSetting icon="logout" name="Đăng xuất" handle={onLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  borderCircle: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 7.5,
    width: 15,
    height: 15,
    alignItems: 'center',
    left: 20,
  },
  loading: {
    position: 'absolute',
    left: 25,
    top: 25,
  },
  messageCount: {
    color: 'white',
    fontSize: 10,
  },
  avtInfo: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  layoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: colors.whiteGray,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  layoutPersonalInfo: {
    marginLeft: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  phone: {
    color: colors.primary,
    marginTop: 3,
  },
  email: {
    color: colors.boldGray,
  },
  layoutEditInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: colors.whiteGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  editTitle: {
    fontWeight: 'bold',
  },
  editDesc: {
    color: colors.boldGray,
    fontSize: 13,
  },
  itemVerify: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtVerify: {
    backgroundColor: '#B5F7C7',
    color: '#1A8910',
    width: 70,
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 3,
  },
  txtRegister: {
    backgroundColor: '#FFD89E',
    color: '#FC8901',
    width: 70,
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 3,
  },
  layoutOption: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  btnPayment: {
    backgroundColor: '#B5F7C7',
    borderRadius:5,
    width: 80,
    marginTop: 10,
    marginBottom: 3,
  },
  txtPayment: {
    color: '#1A8910',
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  }
});

export default User;
