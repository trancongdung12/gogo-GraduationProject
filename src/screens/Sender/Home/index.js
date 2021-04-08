/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
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
import messaging from '@react-native-firebase/messaging';
import NotiActions from '../../../redux/NotificationRedux/actions';
import axios from 'axios';
const Home = (props) => {
  const fcmToken = async () => {
    const token = await messaging().getToken();
    console.log('====================================');
    console.log(token);
    console.log('====================================');
    return token;
  };
  useEffect(() => {
    fcmToken();
    setLoading(true);
    dispatch(UserActions.userInfo(id, onSuccess));
    dispatch(NotiActions.countNotiById());
  }, [props.componentId, dispatch, id]);

  const dispatch = useDispatch();

  const id = useSelector((state) => state.login.token);

  const count = useSelector((state) => state.notification.count);

  const onSuccess = () => {
    setLoading(false);
    Navigation.mergeOptions('bottomtab', {
      bottomTabs: {
        visible: true,
      },
    });

    Navigation.mergeOptions(props.componentId, {
      statusBar: {
        backgroundColor: '#2C376A',
      },
    });
  };

  useEffect(() => {
    if (count) {
      Navigation.mergeOptions('notifications', {
        bottomTab: {
          badge: count,
        },
      });
    }
  }, [count]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api-gogo.herokuapp.com/api/promotion/list',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setCoupon(responses.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState([]);
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
        {coupon.map((item, index) => {
          return <Coupon id={props.componentId} key={index} data={item} />;
        })}
        <Text style={styles.titleEvent}>Sự kiện chào mừng ra mắt</Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.layoutEvent} horizontal>
          <Event image="https://s3-ap-northeast-1.amazonaws.com/wp-gogovan.com/wp-content/uploads/sites/6/2020/10/08100244/ws-5-min.png" />
          <Event image="https://vantai247.com/wp-content/uploads/2020/05/banner-fb-1024x388.png" />
          <Event image="https://techbike.vn/attachments/1200x628-jpg.10005/" />
        </ScrollView>
        <Text style={styles.titleEvent}>Tin tức</Text>
        <News image="https://dev-dtravel-data.s3.ap-northeast-1.amazonaws.com/trucks/1617871564-UTwnr7k6ka606ec2cc136f0" />
        <News image="https://s3-ap-northeast-1.amazonaws.com/wp-gogovan.com/wp-content/uploads/sites/6/2020/09/25150051/Website-1.png" />
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
