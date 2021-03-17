import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../themes/Colors';
import avt_sender from '../../../assets/image/avt_sender.png';
import OptionSetting from '../../../components/OptionSetting';
import Header from '../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import LoginActions from '../../../redux/LoginRedux/actions';
const User = (props) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    console.log('run');
    dispatch(LoginActions.userLogout());
  };
  const user = useSelector((state) => state.user.data);
  return (
    <ScrollView style={styles.container}>
      <Header title="Tài khoản của bạn" Id={props.componentId} />
      <View style={styles.layoutInfo}>
        <Image style={styles.avtInfo} source={avt_sender} />
        <View style={styles.layoutPersonalInfo}>
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.layoutEditInfo}>
        <View style={styles.editInfo}>
          <Text style={styles.editTitle}>Thông tin cá nhân</Text>
          <Text style={styles.editDesc}>Họ tên, CMND, email, địa chỉ...</Text>
        </View>
        <View style={styles.itemVerify}>
          <Text style={styles.txtVerify}>Xác thực</Text>
          <Icon name="angle-right" size={25} />
        </View>
      </View>
      <View style={styles.layoutEditInfo}>
        <View style={styles.editInfo}>
          <Text style={styles.editTitle}>Thông tin doanh nghiệp</Text>
          <Text style={styles.editDesc}>Tên công ty, MST, GPKD, địa chỉ...</Text>
        </View>
        <View style={styles.itemVerify}>
          <Text style={styles.txtRegister}>Đăng ký</Text>
          <Icon name="angle-right" size={25} />
        </View>
      </View>
      <View style={styles.layoutOption}>
        <OptionSetting icon="setting" name="Cài đặt" />
        <OptionSetting icon="questioncircleo" name="Câu hỏi thường gặp" />
        <OptionSetting icon="lock" name="Điều khoản" />
        <OptionSetting icon="customerservice" name="Trợ giúp" />
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
  messageCount: {
    color: 'white',
    fontSize: 10,
  },
  avtInfo: {
    height: 70,
    width: 70,
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
});

export default User;
