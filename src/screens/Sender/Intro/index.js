/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Book from './introItem';
import colors from '../../../themes/Colors';
import { makeSkipIntro } from '../../../redux/AppRedux/actions';
import { useDispatch } from 'react-redux';
import intro1 from '../../../assets/image/intro_1.png';
import intro2 from '../../../assets/image/intro_2.png';
import intro3 from '../../../assets/image/intro_3.png';
import { useRef } from 'react';

const data = {
  intro: [
    {
      title: 'Tìm kiếm dịch vụ dễ dàng',
      description:
        'Bạn có nhu cầu vận chuyển hàng hóa nhưng đang gặp khó khăn trong việc tìm kiếm dịch vụ vận chuyển',
      image: intro1,
      btn: false,
    },
    {
      title: 'Mở rộng phạm vi kinh doanh',
      description:
        'Bạn đang kinh doanh dịch vụ vận chuyển hàng hóa nhưng chưa được biết đến rộng rãi',
      image: intro2,
      btn: false,
    },
    {
      title: 'Giao dịch đơn giản và nhanh chóng',
      description: 'Chúng tôi đảm bảo giao dịch thuận tiện và dễ dàng cho cả chủ hàng và chủ xe',
      image: intro3,
      btn: true,
    },
  ],
};

const Intro = () => {
  const [entries, setEntries] = React.useState(data.intro);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const dispatch = useDispatch();
  const carousel = useRef();
  const SwapSlide = (value) => {
    console.log(value);
  };
  const _renderItem = ({ item, index }) => {
    return <Book key={index} inform={item} />;
  };
  const goToNext = () => {
    carousel.current.snapToNext();
  };
  return (
    <View style={styles.flexAll}>
      <Carousel
        style={styles.container}
        data={entries}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        sliderWidth={400}
        itemWidth={400}
        windowSize={1}
        ref={carousel}
      />
      <View style={styles.paginationBtn}>
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: colors.primary,
          }}
          inactiveDotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#e9e9e9',
          }}
          inactiveDotScale={0.6}
        />
        <TouchableOpacity
          style={[styles.btnNext, activeSlide === 2 && styles.btnStart]}
          onPress={() => {
            activeSlide === 2 ? dispatch(makeSkipIntro()) : goToNext();
          }}
        >
          <Text style={[styles.txtNext, activeSlide === 2 && styles.txtStart]}>
            {activeSlide === 2 ? 'BẮT ĐẦU NGAY' : 'TIẾP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexAll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  pagination: {
    alignItems: 'center',
    marginLeft: 50,
    marginBottom: 160,
  },
  paginationBtn: {
    alignItems: 'center',
    marginBottom: 120,
  },
  btnNext: {
    width: 230,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  btnStart: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  txtNext: {
    fontSize: 16,
    color: '#fff',
  },
  txtStart: {
    color: 'black',
  },
});

export default Intro;
