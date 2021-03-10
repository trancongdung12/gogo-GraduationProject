import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Back from '../../components/Back';
import cmnd from '../../assets/image/cmnd.png';
import cmndBack from '../../assets/image/cmndback.jpg';
import colors from '../../themes/Colors';
import gplxback from '../../assets/image/gplxback.png';
import gplx from '../../assets/image/gplx.jpg';
import checkTruck from '../../assets/image/checkTruck.jpg';
import Input from '../../components/InputRegister';

const windowWidth = Dimensions.get('window').width;
const Step2 = (props) => {
  return (
    <ScrollView style={styles.container}>
      <Back id={props.componentId} />
      <View style={styles.layout}>
        <Text style={styles.title}>Ảnh chụp CMND hoặc CCCD</Text>
        <View style={styles.layoutContent}>
          <View style={styles.itemImage}>
            <Image style={styles.imgCMND} source={cmnd} />
            <Text style={styles.text}>Mặt trước</Text>
          </View>
          <View style={styles.itemImage}>
            <Image style={styles.imgCMND} source={cmndBack} />
            <Text style={styles.text}>Mặt sau</Text>
          </View>
        </View>
        <Text style={styles.title}>Ảnh chụp giấy phép lái xe</Text>
        <View style={styles.layoutContent}>
          <View style={styles.itemImage}>
            <Image style={styles.imgCMND} source={gplx} />
            <Text style={styles.text}>Mặt trước</Text>
          </View>
          <View style={styles.itemImage}>
            <Image style={styles.imgCMND} source={gplxback} />
            <Text style={styles.text}>Mặt sau</Text>
          </View>
        </View>
        <Text style={styles.infoTitle}>Thông tin xe</Text>
        <Text style={styles.title}>Giấy tờ đăng kiểm </Text>
        <Text style={styles.textSmall}>
          (Yêu cầu bản gốc của giấy tờ đăng kiểm theo xe và còn thời hạn)
        </Text>
        <Image style={styles.imgCheck} source={checkTruck} />
        <Input title="Loại xe" hint="Xe tải thùng kín" />
        <Input title="Trọng tải" hint="3.5 T" />
        <Input title="Biển số xe" hint="12AB - 123.45" />
      </View>
      <TouchableOpacity style={styles.btnLogin}>
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
