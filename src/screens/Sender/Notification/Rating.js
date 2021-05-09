/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import colors from '../../../themes/Colors';
import { popScreen } from '../../../navigation/pushScreen';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import { Navigation } from 'react-native-navigation';
const windowWidth = Dimensions.get('window').width;
const TextItem = (props) => {
  const [choose, setChoose] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.btnReview, choose && { backgroundColor: '#98C77B' }]}
      onPress={() => setChoose(!choose)}
    >
      <Text style={[styles.txtReview, choose && { color: 'black' }]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const Rating = (props) => {
  const [star, setStar] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const onStarRatingPress = (rating) => {
    setStar(rating);
  };
  const data = props.data;
  const onRating = () => {
    const body = {
      id_bill: data.id_bill,
      point: star,
      comment: 'Thân thiện, Lịch sự',
    };
    axios({
      method: 'POST',
      url: 'https://api-gogo.herokuapp.com/api/comment',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setShowAlert(true);
        }
      })
      .catch(function (error) {
        Alert.alert('Error', 'Đơn hàng đã được đánh giá');
      });
  };
  const pop = () => {
    Navigation.mergeOptions('bottomtab', {
      bottomTabs: {
        visible: false,
      },
    });
    Navigation.pop(props.componentId);
  };
  return (
    <View style={styles.container}>
      <AwesomeAlert
        showProgress={false}
        show={showAlert}
        title="Đánh giá tài xế"
        message="Chúng tôi xin cảm ơn ý kiến đánh giá của bạn!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
          pop();
        }}
      />
      <TouchableOpacity onPress={() => pop(props.componentId)}>
        <Icon style={styles.icon} name="angle-left" size={30} />
      </TouchableOpacity>
      <View style={styles.layoutContainer}>
        <Text style={styles.desc}>Chúng tôi muốn biết trải nghiệm của bạn với</Text>
        <Image
          style={styles.img}
          source={{
            uri: data.trucker_avt,
          }}
        />
        <View style={styles.layoutName}>
          <Text style={styles.title}>Tài xế:</Text>
          <Text style={styles.name}> {data.trucker_name}</Text>
        </View>
        <StarRating
          containerStyle={styles.star}
          disabled={false}
          maxStars={5}
          rating={star}
          fullStarColor={'#F9A826'}
          starSize={25}
          selectedStar={(rating) => onStarRatingPress(rating)}
        />
        <View style={styles.layoutReview}>
          <TextItem title="Thân thiện" />
          <TextItem title="Thái độ tốt" />
          <TextItem title="Lịch sự" />
          <TextItem title="Rất hài lòng" />
          <TextItem title="Chuyên nghiệp" />
          <TextItem title="Đúng giờ" />
          <TextItem title="Rất hài lòng" />
          <TextItem title="Thân thiện" />
          <TextItem title="Chuyên nghiệp" />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => onRating()}>
          <Text style={styles.txtBtn}>Hoàn tất đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  layoutContainer: {
    alignItems: 'center',
  },
  desc: {
    marginTop: 20,
    textAlign: 'center',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 40,
  },
  layoutName: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  star: {
    width: 150,
    marginTop: 20,
  },
  layoutReview: {
    width: windowWidth - 60,
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnReview: {
    backgroundColor: '#E6E6E6',
    marginLeft: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  txtReview: {
    color: colors.gray,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  btn: {
    width: windowWidth - 160,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 40,
  },
  txtBtn: {
    paddingVertical: 10,
    color: 'white',
  },
});
export default Rating;
