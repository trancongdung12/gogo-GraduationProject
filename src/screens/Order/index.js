import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes/Colors';
import moment from 'moment';
import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import truck_1 from '../../assets/truck/truck_1.png';
import truck_2 from '../../assets/truck/truck_2.png';
import truck_3 from '../../assets/truck/truck_3.png';
import truck_4 from '../../assets/truck/truck_4.png';
import truck_5 from '../../assets/truck/truck_5.png';
import Vehicle from '../../components/Vehicle';
import Button from '../../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('window').width;
const Order = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      console.log(currentDate);
      setShow(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      console.log(moment(selectedTime).format('DD/MM/YYYY - hh:mm a'));
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatePicker = () => {
    showMode('date');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>Tạo mới đơn hàng</Text>
        <View style={styles.layoutMessage}>
          <Icon name="comments" size={30} color={colors.lightGray} />
          <View style={styles.borderCircle}>
            <Text style={styles.messageCount}>1</Text>
          </View>
        </View>
      </View>
      <View style={styles.layoutAddress}>
        <Text style={styles.titleBold}>Địa chỉ vận chuyển</Text>
        <View style={styles.itemAddress}>
          <Text style={styles.titleBold}>Từ</Text>
          <View style={styles.itemInput}>
            <Icon style={styles.icon} name="street-view" size={20} color="red" />
            <TextInput style={styles.input} placeholder="101B  Lê Hữu Trác, Sơn Trà, Đà Nẵng" />
          </View>
        </View>
        <View style={styles.itemAddress}>
          <Text style={styles.titleBold}>Đến</Text>
          <View style={styles.itemInput}>
            <Icon style={styles.icon} name="street-view" size={20} color="green" />
            <TextInput style={styles.input} placeholder="Sơn Trà, Đà Nẵng" />
          </View>
        </View>
        <View style={styles.crossbar} />
      </View>
      <View>
        <Text style={styles.titleBold}>Thời gian bốc hàng</Text>
        <TouchableOpacity style={[styles.layoutVolume, styles.calendar]} onPress={showDatePicker}>
          <TextInput editable={false} style={styles.inputVolume} placeholder="25/03/2021 - 9:00" />
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
          <TextInput style={styles.inputProduct} placeholder="Xi măng" />
        </View>
        <View style={styles.itemProduct}>
          <Text style={styles.titleBold}>Khối lượng</Text>
          <View style={styles.layoutVolume}>
            <TextInput style={styles.inputVolume} placeholder="1.0" />
            <Text style={styles.textVolume}>Tấn</Text>
          </View>
        </View>
        <View style={styles.crossbar} />
      </View>
      <View>
        <Text style={styles.titleBold}>Loại xe</Text>
        <ScrollView style={styles.typeVehicle} showsHorizontalScrollIndicator={false} horizontal>
          <Vehicle />
          <Vehicle />
          <Vehicle />
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
        />
        <View style={styles.layoutAddImg}>
          <View style={styles.layoutImg}>
            <Image style={styles.imgAdd} source={truck_4} />
            <TouchableOpacity>
              <Icon name="times-circle" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnAddImg}>
            <Text style={styles.textAddImg}>+ Thêm ảnh</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.crossbar} />
      </View>
      <View>
        <Text style={styles.titleBold}>Hóa đơn điện tử</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        >
          <Picker.Item label="Xuất hóa đơn điện tử" value="yes" />
          <Picker.Item label="Không xuất hóa đơn điện tử" value="no" />
        </Picker>
        <View style={styles.crossbar} />
      </View>
      <Button title="LẤY BÁO GIÁ" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    left: 15,
  },
  messageCount: {
    color: 'white',
    fontSize: 10,
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
    width: 150,
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
    height: 50,
    width: 70,
  },
  btnAddImg: {
    marginLeft: 20,
    alignSelf: 'center',
    backgroundColor: colors.whiteGray,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  layoutImg: {
    flexDirection: 'row',
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
