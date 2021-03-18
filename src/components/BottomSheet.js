import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import colors from '../themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowHeight = Dimensions.get('window').height;
export default function BottomSheet(props) {
  const [alertVisible, setAlertVisible] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const closeModel = () => {
    setAlertVisible(false);
    props.closeModal();
  };
  const completeModal = () => {
    const data = {
      name: name,
      phone: phone,
      note: note,
    };
    props.returnData(data);
    closeModel();
  };
  return (
    <View style={styles.centerView}>
      <Modal animationType="slide" transparent={true} visible={alertVisible}>
        <View>
          <View style={styles.modalView}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => closeModel()}>
              <Icon name="close" size={20} color={colors.txtLevel3} />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Liên hệ điểm dỡ hàng</Text>
            <View style={styles.layoutContent}>
              <View style={styles.itemInput}>
                <Text style={styles.text}>Họ và tên</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nguyễn Văn A"
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={styles.itemInput}>
                <Text style={styles.text}>Số điện thoại</Text>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.input}
                  placeholder="0123456789"
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
              <View style={styles.itemInput}>
                <Text style={styles.text}>Ghi chú</Text>
                <TextInput
                  style={styles.textArea}
                  multiline={true}
                  numberOfLines={2}
                  placeholder="Tới chỗ gọi số này nè!"
                  onChangeText={(text) => setNote(text)}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => completeModal()}>
              <Text style={styles.textBtn}>XONG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  modalView: {
    marginTop: (windowHeight - 350) / 2,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  itemInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    marginLeft: 10,
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    paddingLeft: 10,
    height: 30,
    paddingVertical: 0,
    marginTop: 10,
  },
  textArea: {
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    marginTop: 10,
    width: 200,
    textAlignVertical: 'top',
  },
  btn: {
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: colors.lightGreen,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 125,
    marginBottom: 15,
  },
  textBtn: {
    color: colors.lightGreen,
    fontWeight: 'bold',
  },
});
