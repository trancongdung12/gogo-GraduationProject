import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../themes/Colors';
import moment from 'moment';
import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Vehicle from '../../../components/Vehicle';
import Button from '../../../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TOKEN, data } from '../../../data';
import { Navigation } from 'react-native-navigation';
import Header from '../../../components/Header';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { pushScreen } from '../../../navigation/pushScreen';
const windowWidth = Dimensions.get('window').width;
const Order = (props) => {
  const [dataBill, setDataBill] = useState(null);
  const [selected, setSelected] = useState(true);
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [truck, setTruck] = useState(data.truck);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(
    'https://catdasymanh24h.net/wp-content/uploads/2019/08/gia-xi-mang.jpg',
  );
  const [product, setProduct] = useState('');
  const [mass, setMass] = useState();
  const [note, setNote] = useState('');
  const [truckId, setTruckId] = useState();

  useEffect(() => {}, [dataBill]);
  function onChange(event, selectedValue) {
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(
        moment(selectedTime).format('DD/MM/YYYY - hh:mm ') +
          handleTime(moment(selectedTime).format('hh'), moment(selectedTime).format('a')),
      );
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatePicker = () => {
    showMode('date');
  };
  const handleTime = (currentHour, status) => {
    if (currentHour === '12' && status === 'pm') {
      return 'trưa';
    } else if (currentHour > 5 && status === 'pm') {
      return 'tối';
    } else if (status === 'pm') {
      return 'chiều';
    } else {
      return 'sáng';
    }
  };
  const push = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Map',
        passProps: {
          onCallBack: (dataReturn) => {
            console.log('onPressSelect -> data', dataReturn);
            setDataBill(dataReturn);
          },
        },
        options: {
          topBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
      },
    });
  };
  const findTruck = (id) => {
    return data.truck.find((element) => {
      return element.id === id;
    });
  };
  const setChooseTruck = (id) => {
    setTruckId(findTruck(id));
    let ar = [...data.truck];
    ar = ar.map((el) => (el.id === id ? { ...el, isTruck: true } : el));
    setTruck(ar);
  };
  const uploadImageFunction = () => {
    const options = {
      title: 'Ảnh đơn hàng của bạn',
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
          dataForm.append('folder', 'trucks');
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
  const getBill = () => {
    const totalData = {
      from: dataBill.pointSend,
      to: dataBill.pointShip,
      receiveInfo: dataBill.info,
      product: product,
      truckId: truckId,
      mass: Number(mass),
      timeSend: time,
      note: note,
      bill: selected,
      images: images,
    };
    pushScreen(props.componentId, 'Bill', totalData, '', false);
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Tạo mới đơn hàng" Id={props.componentId} />
      <View style={styles.layoutContainer}>
        <View style={styles.layoutAddress}>
          <Text style={styles.titleBold}>Địa chỉ vận chuyển</Text>
          <View style={styles.itemAddress}>
            <Text style={styles.titleBold}>Từ</Text>
            <TouchableOpacity style={styles.itemInput} onPress={() => push()}>
              <Icon style={styles.icon} name="enviroment" size={20} color="red" />
              <Text style={[styles.input, dataBill && { color: 'black' }]}>
                {dataBill
                  ? JSON.parse(dataBill.pointSend).address +
                    ', ' +
                    JSON.parse(dataBill.pointSend).city
                  : '101B Lê Hữu Trác, Sơn Trà, Đà Nẵng'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemAddress}>
            <Text style={styles.titleBold}>Đến</Text>
            <TouchableOpacity style={styles.itemInput} onPress={() => push()}>
              <Icon style={styles.icon} name="enviroment" size={20} color="green" />
              <Text style={[styles.input, dataBill && { color: 'black' }]}>
                {dataBill
                  ? JSON.parse(dataBill.pointShip).address +
                    ', ' +
                    JSON.parse(dataBill.pointShip).city
                  : 'Bình Nguyên, Thăng Bình, Quảng Nam'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.crossbar} />
        </View>
        <View>
          <Text style={styles.titleBold}>Thời gian bốc hàng</Text>
          <TouchableOpacity style={[styles.layoutVolume, styles.calendar]} onPress={showDatePicker}>
            <Text style={[styles.inputVolume, time && { color: 'black' }]}>
              {time ? time : '25/03/2021 - 9:00 sáng'}
            </Text>
            <Icon style={styles.icon} name="calendar" size={20} color="red" />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              minimumDate={new Date()}
              display="spinner"
              onChange={onChange}
            />
          )}
          <View style={styles.crossbar} />
        </View>

        <View>
          <Text style={styles.titleBold}>Chi tiết hàng hóa</Text>
          <View style={styles.itemProduct}>
            <Text style={styles.titleBold}>Tên</Text>
            <TextInput
              style={styles.inputProduct}
              placeholder="Xi măng"
              onChangeText={(txt) => setProduct(txt)}
            />
          </View>
          <View style={styles.itemProduct}>
            <Text style={styles.titleBold}>Khối lượng</Text>
            <View style={styles.layoutVolume}>
              <TextInput
                keyboardType="number-pad"
                style={[styles.inputVolume, { color: 'black' }]}
                placeholder="1.0"
                onChangeText={(txt) => setMass(txt)}
              />
              <Text style={styles.textVolume}>Tấn</Text>
            </View>
          </View>
          <View style={styles.crossbar} />
        </View>
        <View>
          <Text style={styles.titleBold}>Loại xe</Text>
          <ScrollView style={styles.typeVehicle} showsHorizontalScrollIndicator={false} horizontal>
            {truck.map((item, index) => (
              <Vehicle
                id={item.id}
                key={index}
                title={item.title}
                img={item.image}
                desc={item.description}
                isTruck={item.isTruck}
                setTruck={setChooseTruck}
              />
            ))}
          </ScrollView>
          <View style={styles.crossbar} />
        </View>
        <View>
          <Text style={styles.titleBold}>Ghi chú</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={2}
            placeholder="Chạy chầm chậm thôi cũng được!"
            onChangeText={(txt) => setNote(txt)}
          />
          <View style={styles.layoutAddImg}>
            {images ? (
              <View style={styles.layoutImg}>
                <View>
                  <Image
                    style={[styles.imgAdd, loading && { opacity: 0.5 }]}
                    source={{
                      uri: images,
                    }}
                  />
                  {loading && (
                    <ActivityIndicator style={styles.loading} size="small" color={colors.primary} />
                  )}
                </View>
                <TouchableOpacity onPress={() => setImages('')}>
                  <Icon
                    style={styles.closeIcon}
                    name="closecircle"
                    size={20}
                    color={colors.boldGray}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
            <TouchableOpacity style={styles.btnAddImg} onPress={() => uploadImageFunction()}>
              <Text style={styles.textAddImg}>+ Thêm ảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.crossbar} />
        </View>
        <View>
          <Text style={styles.titleBold}>Hóa đơn điện tử</Text>
          <Picker
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
          >
            <Picker.Item label="Xuất hóa đơn điện tử" value={true} />
            <Picker.Item label="Không xuất hóa đơn điện tử" value={false} />
          </Picker>
          <View style={styles.crossbar} />
        </View>
        <Button title="LẤY BÁO GIÁ" handleFunc={() => getBill()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  loading: {
    marginTop: -50,
  },
  closeIcon: {
    marginLeft: -5,
    marginTop: -10,
  },
  layoutContainer: {
    paddingHorizontal: 15,
  },
  layoutAddress: {
    marginTop: 20,
  },
  titleBold: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    height: 40,
    marginTop: 10,
    width: windowWidth - 70,
  },
  input: {
    justifyContent: 'center',
    color: colors.grayPlace,
    marginLeft: 10,
  },
  crossbar: {
    width: 100,
    backgroundColor: colors.lightGray,
    height: 2,
    marginTop: 10,
    marginBottom: 20,
  },
  itemProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputProduct: {
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    height: 40,
    marginTop: 10,
    width: windowWidth - 70,
  },
  layoutVolume: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    height: 40,
    marginTop: 10,
    width: windowWidth - 120,
  },
  inputVolume: {
    width: 180,
    color: colors.boldGray,
  },
  textVolume: {
    fontSize: 15,
    fontWeight: 'bold',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    paddingLeft: 15,
  },
  typeVehicle: {
    marginTop: 10,
    marginLeft: -20,
  },
  textArea: {
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  layoutAddImg: {
    flexDirection: 'row',
    marginTop: 20,
  },
  imgAdd: {
    height: 80,
    width: 100,
  },
  btnAddImg: {
    marginLeft: 20,
    alignSelf: 'center',
    backgroundColor: colors.whiteGray,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: -10,
  },
  layoutImg: {
    flexDirection: 'row',
    height: 100,
  },
  textAddImg: {
    color: colors.boldGray,
    fontWeight: 'bold',
  },
  calendar: {
    width: windowWidth - 30,
  },
});
export default Order;