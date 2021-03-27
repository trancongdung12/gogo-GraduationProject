import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../themes/Colors';
import Coupon from '../../../components/Coupon';
import Event from '../../../components/Event';
import News from '../../../components/News';
import Header from '../../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import UserActions from '../../../redux/UserRedux/actions';
import logo from '../../../assets/logo/logo.gif';
import { Navigation } from 'react-native-navigation';
const Home = (props) => {
  useEffect(() => {
    setLoading(true);
    dispatch(UserActions.userInfo(id, onSuccess));
  }, [props.componentId, dispatch, id]);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.login.token);
  const onSuccess = () => {
    setLoading(false);
    Navigation.mergeOptions(props.componentId, {
      bottomTabs: {
        visible: true,
      },
    });
  };
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.data);
  return loading ? (
    <View style={styles.loadContainer}>
      <Image style={styles.loadImage} source={logo} />
      <Text style={styles.loadTitle}>GoGo</Text>
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.layoutHeader}>
        <Header
          title={`Xin chào ${user && user.full_name}!`}
          isWhite={true}
          Id={props.componentId}
        />
        <View style={styles.addressContainer}>
          <TouchableOpacity style={styles.itemInput}>
            <Icon style={styles.icon} name="enviroment" size={20} color="red" />
            <Text style={styles.input}>101B Lê Hữu Trác, Sơn Trà, Đà Nẵng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.layoutContainer}>
        <Text style={styles.titleCoupon}>Ưu đãi cho người mới bắt đầu</Text>
        <Coupon />
        <Coupon />
        <Text style={styles.titleEvent}>Sự kiện chào mừng ra mắt</Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.layoutEvent} horizontal>
          <Event />
          <Event />
          <Event />
        </ScrollView>
        <Text style={styles.titleEvent}>Tin tức</Text>
        <News />
        <News />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadImage: {
    height: 200,
    width: 200,
    marginTop: 100,
  },
  loadTitle: {
    marginTop: 200,
    fontSize: 60,
    color: colors.boldGray,
    zIndex: 999,
  },
  container: {
    flex: 1,
  },
  layoutHeader: {
    paddingTop: 20,
    backgroundColor: '#2C376A',
    paddingBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  addressContainer: {
    paddingHorizontal: 15,
  },
  itemInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteGray,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    height: 40,
    marginTop: 20,
  },
  input: {
    justifyContent: 'center',
    color: colors.grayPlace,
    marginLeft: 10,
  },
  layoutContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  titleCoupon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  titleEvent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 20,
  },
  layoutEvent: {
    marginLeft: -15,
  },
});
export default Home;
