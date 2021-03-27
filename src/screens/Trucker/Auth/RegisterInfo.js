import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Back from '../../../components/Back';
import cmnd from '../../../assets/image/cmnd.png';
import cmndBack from '../../../assets/image/cmndback.jpg';
import colors from '../../../themes/Colors';
import gplxback from '../../../assets/image/gplxback.png';
import gplx from '../../../assets/image/gplx.jpg';
import checkTruck from '../../../assets/image/checkTruck.jpg';
import Input from '../../../components/InputRegister';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { TOKEN } from '../../../data';
import { useSelector, useDispatch } from 'react-redux';
import RegisterActions from '../../../redux/RegisterRedux/actions';
const windowWidth = Dimensions.get('window').width;
const Step2 = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [card_front, setCardFront] = useState();
  const [card_back, setCardBack] = useState();
  const [drive_front, setDriveFront] = useState();
  const [drive_back, setDriveBack] = useState();
  const [registrationPapers, setRegistrationPapers] = useState();
  const [car_type, setCarType] = useState();
  const [payload, setPayload] = useState();
  const [plate, setPlate] = useState();
  const phone = useSelector((state) => state.register.phone);
  const uploadImageFunction = (index) => {
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
          dataForm.append('folder', 'truckers');
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
                if (index === 1) {
                  setCardFront(responses.data.data);
                } else if (index === 2) {
                  setCardBack(responses.data.data);
                } else if (index === 3) {
                  setDriveFront(responses.data.data);
                } else if (index === 4) {
                  setDriveBack(responses.data.data);
                } else {
                  setRegistrationPapers(responses.data.data);
                }
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
  const truckRegister = () => {
    const data = {
      phone: phone,
      password: props.data.password,
      email: props.data.email,
      full_name: props.data.full_name,
      birthday: props.data.birthday,
      address: props.data.address,
      avatar: props.data.avatar,
      id_card: props.data.id_card,
      id_role: 2,
      id_card_front: card_front,
      id_card_back: card_back,
      license_front: drive_front,
      license_back: drive_back,
      license_plate: plate,
      payload: payload,
      car_type: car_type,
      registration_paper: registrationPapers,
    };
    console.log(data);
    dispatch(RegisterActions.truckerSignUp(data));
  };
  return (
    <ScrollView style={styles.container}>
      <Back id={props.componentId} />
      <View style={styles.layout}>
        <Text style={styles.title}>Ảnh chụp CMND hoặc CCCD</Text>
        <View style={styles.layoutContent}>
          <TouchableOpacity style={styles.itemImage} onPress={() => uploadImageFunction(1)}>
            <Image style={styles.imgCMND} source={card_front ? { uri: card_front } : cmnd} />
            <Text style={styles.text}>Mặt trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemImage} onPress={() => uploadImageFunction(2)}>
            <Image style={styles.imgCMND} source={card_back ? { uri: card_back } : cmndBack} />
            <Text style={styles.text}>Mặt sau</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Ảnh chụp giấy phép lái xe</Text>
        <View style={styles.layoutContent}>
          <TouchableOpacity style={styles.itemImage} onPress={() => uploadImageFunction(3)}>
            <Image style={styles.imgCMND} source={drive_front ? { uri: drive_front } : gplx} />
            <Text style={styles.text}>Mặt trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemImage} onPress={() => uploadImageFunction(4)}>
            <Image style={styles.imgCMND} source={drive_back ? { uri: drive_back } : gplxback} />
            <Text style={styles.text}>Mặt sau</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.infoTitle}>Thông tin xe</Text>
        <Text style={styles.title}>Giấy tờ đăng kiểm </Text>
        <Text style={styles.textSmall}>
          (Yêu cầu bản gốc của giấy tờ đăng kiểm theo xe và còn thời hạn)
        </Text>
        <TouchableOpacity onPress={() => uploadImageFunction(5)}>
          <Image
            style={styles.imgCheck}
            source={registrationPapers ? { uri: registrationPapers } : checkTruck}
          />
        </TouchableOpacity>
        <Input title="Loại xe" hint="Xe tải thùng kín" changeText={setCarType} />
        <Input title="Trọng tải" hint="3.5 T" changeText={setPayload} />
        <Input title="Biển số xe" hint="12AB - 123.45" changeText={setPlate} />
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={() => truckRegister()}>
        <Text style={styles.textLogin}>Tiếp theo</Text>
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
  layout: {
    marginTop: 20,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 20,
  },
  layoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imgCMND: {
    height: 80,
    width: 150,
    borderRadius: 5,
  },
  imgCheck: {
    width: windowWidth - 30,
    borderRadius: 5,
    height: 150,
    marginTop: 10,
    marginBottom: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.grayPlace,
  },
  textSmall: {
    fontSize: 11,
    color: colors.grayPlace,
  },
  btnLogin: {
    alignSelf: 'center',
    marginTop: 20,
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
});

export default Step2;
