import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes/Colors';
const Status = () => {
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <View style={styles.itemHeader}>
          <Text style={styles.title}>Xem đơn hàng của bạn</Text>
          <View style={styles.layoutMessage}>
            <Icon name="comments" size={30} color="white" />
            <View style={styles.borderCircle}>
              <Text style={styles.messageCount}>1</Text>
            </View>
          </View>
        </View>
        <View style={styles.layoutOption}>
          <TouchableWithoutFeedback style={styles.itemOption}>
            <Text style={styles.textOption}>ĐƠN MỚI</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption}>
            <Text style={styles.textOption}>ĐANG THỰC HIỆN</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.itemOption}>
            <Text style={styles.textOption}>ĐÃ HOÀN TẤT</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
  layoutOption: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemOption: {},
  textOption: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 15,
  },
});

//make this component available to the app
export default Status;
