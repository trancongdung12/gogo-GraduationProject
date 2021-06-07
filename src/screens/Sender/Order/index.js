/* eslint-disable react-native/no-inline-styles */
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../themes/Colors';
import moment from 'moment';
import { Dimensions } from 'react-native';
import Vehicle from '../../../components/Vehicle';
import Button from '../../../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TOKEN } from '../../../data';
import { Navigation } from 'react-native-navigation';
import Header from '../../../components/Header';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import OrderActions from '../../../redux/OrderRedux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';

const windowWidth = Dimensions.get('window').width;
const Order = (props) => {
  const [dataBill, setDataBill] = useState(null);
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBill, setLoadingBill] = useState(false);
  const [listImages, setListImages] = useState([]);
  const [product, setProduct] = useState('');
  const [mass, setMass] = useState('');
  const [note, setNote] = useState('Chạy chầm chậm thôi cũng được!');
  const [truckId, setTruckId] = useState();
  const [truck, setTruck] = useState([]);
  const [errorTime, setErrorTime] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api-gogo.herokuapp.com/api/truck/list',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setTruck(responses.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dataBill]);
  function onChange(event, selectedValue) {
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      if (
        moment(selectedTime).format('DD/MM/YYYY - hh:mm') < moment().format('DD/MM/YYYY - hh:mm')
      ) {
        setErrorTime('Thời gian không phù hợp');
      } else {
        setErrorTime('');
      }
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
    return truck.find((element) => {
      return element.id === id;
    });
  };
  const setChooseTruck = (id) => {
    setTruckId(findTruck(id));
    let temp = [...truck];
    temp = temp.map((el) => ({ ...el, isTruck: false }));
    temp = temp.map((el) => (el.id === id ? { ...el, isTruck: true } : el));
    setTruck(temp);
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
                setListImages([...listImages, responses.data.data]);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    });
  };
  const getBill = () => {
    if (dataBill && product && truckId && mass && time) {
      const data = {
        from: JSON.parse(dataBill.pointSend).city,
        to: JSON.parse(dataBill.pointShip).city,
        id_truck: truckId.id,
        distance: dataBill.distance.kilometer,
        time: time,
      };
      setLoadingBill(true);
      dispatch(OrderActions.getPrice(data, onSuccess));
    } else {
      Alert.alert('Error', 'Thông tin nhập còn thiếu');
    }
  };
  const onSuccess = () => {
    const totalData = {
      from: dataBill.pointSend,
      to: dataBill.pointShip,
      receiveInfo: JSON.stringify(dataBill.info),
      product: product,
      truckId: truckId,
      mass: Number(mass),
      timeSend: time,
      note: note,
      images: listImages,
    };
    Navigation.push(props.componentId, {
      component: {
        name: 'Bill',
        passProps: {
          onCallBack: () => {
            setDataBill('');
            setProduct('');
            setTruckId('');
            setTime('');
            setMass('');
            setListImages('');
          },
          data: totalData,
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
    setLoadingBill(false);
  };
  const verifyMass = (txt) => {
    if (txt <= 8) {
      const newArr_4 = truck.map((elm, index) => {
        return elm.payload < txt * 1000 ? { ...elm, disable: true } : { ...elm, disable: false };
      });
      setTruck(newArr_4);
      setMass(txt);
    }
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert show={loadingBill} showProgress={true} progressColor={colors.primary} />
      <Header title="Tạo mới đơn hàng" Id={props.componentId} />
      <ScrollView style={styles.layoutContainer}>
        <View style={styles.layoutAddress}>
          <Text style={styles.titleBold}>
            Địa chỉ vận chuyển <Text style={{ color: 'red' }}>(*)</Text>
          </Text>
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
          <Text style={styles.titleBold}>
            Thời gian bốc hàng <Text style={{ color: 'red' }}>(*)</Text>
          </Text>
          <TouchableOpacity style={[styles.layoutVolume, styles.calendar]} onPress={showDatePicker}>
            <Text style={[styles.inputVolume, time && { color: 'black' }]}>
              {time ? time : '25/03/2021 - 9:00 sáng'}
            </Text>
            <Icon style={styles.icon} name="calendar" size={20} color="red" />
          </TouchableOpacity>
          <Text style={{ color: 'red', fontSize: 12, marginTop: 5, marginLeft: 5 }}>
            {errorTime}
          </Text>
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
          <Text style={styles.titleBold}>
            Chi tiết hàng hóa <Text style={{ color: 'red' }}>(*)</Text>
          </Text>
          <View style={styles.itemProduct}>
            <Text style={styles.titleProduct}>Tên</Text>
            <TextInput
              style={styles.inputProduct}
              placeholder="Xi măng"
              onChangeText={(txt) => setProduct(txt)}
              value={product}
            />
          </View>
          <View style={styles.itemProduct}>
            <Text style={styles.titleProduct}>Khối lượng</Text>
            <View style={styles.layoutVolume}>
              <TextInput
                keyboardType="number-pad"
                style={[styles.inputVolume, { color: 'black' }]}
                placeholder="1.0"
                onChangeText={(txt) => verifyMass(txt)}
                value={mass}
              />
              <Text style={styles.textVolume}>Tấn</Text>
            </View>
          </View>
          <View style={styles.crossbar} />
        </View>
        <View>
          <Text style={styles.titleBold}>
            Loại xe <Text style={{ color: 'red' }}>(*)</Text>
          </Text>
          <ScrollView style={styles.typeVehicle} showsHorizontalScrollIndicator={false} horizontal>
            {truck.map((item, index) => (
              <Vehicle
                id={item.id}
                key={index}
                title={item.name}
                img={item.image}
                desc={item.description}
                isTruck={item.isTruck}
                setTruck={setChooseTruck}
                isDisable={mass ? item.disable : true}
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
            value={note}
            onChangeText={(txt) => setNote(txt)}
          />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.layoutAddImg}>
            {listImages ? (
              listImages.map((item, index) => (
                <View key={index} style={styles.layoutImg}>
                  <View>
                    <Image
                      style={[styles.imgAdd, loading && { opacity: 0.5 }]}
                      source={{
                        uri: item,
                      }}
                    />
                    {loading && (
                      <ActivityIndicator
                        style={styles.loading}
                        size="small"
                        color={colors.primary}
                      />
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View />
            )}
          </ScrollView>
          <TouchableOpacity style={styles.btnAddImg} onPress={() => uploadImageFunction()}>
            <Text style={styles.textAddImg}>+ Thêm ảnh</Text>
          </TouchableOpacity>
          <View style={styles.crossbar} />
        </View>
        <Button disabled={errorTime && true} title="LẤY BÁO GIÁ" handleFunc={() => getBill()} />
      </ScrollView>
    </View>
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
  titleProduct: {
    width: 90,
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
    width: 80,
  },
  btnAddImg: {
    marginLeft: 20,
    backgroundColor: '#2699fb',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: -10,
    width: 100,
  },
  layoutImg: {
    flexDirection: 'row',
    height: 100,
    marginLeft: 5,
  },
  textAddImg: {
    color: 'white',
    fontWeight: 'bold',
  },
  calendar: {
    width: windowWidth - 30,
  },
});
export default Order;
