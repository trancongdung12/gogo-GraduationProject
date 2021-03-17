import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import box from '../../../assets/image/box.png';
import trucker from '../../../assets/image/trucker.png';
import { pushScreen } from '../../../navigation/pushScreen';
import colors from '../../../themes/Colors';
const OptionScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bạn là ai?</Text>
      <View style={styles.layoutContent}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => pushScreen(props.componentId, 'SenderRegister', '', '', false)}
        >
          <Image style={styles.img} source={box} />
          <Text style={styles.text}>Chủ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => pushScreen(props.componentId, 'TruckerRegister', '', '', false)}
          style={styles.item}
        >
          <Image style={styles.img} source={trucker} />
          <Text style={styles.text}>Chủ xe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 120,
  },
  layoutContent: {
    flexDirection: 'row',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    marginTop: 50,
  },
  item: {
    width: 110,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  img: {
    width: 120,
    height: 120,
  },
  text: {
    fontWeight: 'bold',
    color: colors.secondary,
  },
});

export default OptionScreen;
