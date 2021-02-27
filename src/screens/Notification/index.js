import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes/Colors';

// create a component
const Notification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>Bạn có thông báo mới</Text>
        <View style={styles.layoutMessage}>
          <Icon name="comments" size={30} color={colors.lightGray} />
          <View style={styles.borderCircle}>
            <Text style={styles.messageCount}>1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
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
    left: 20,
  },
  messageCount: {
    color: 'white',
    fontSize: 10,
  },
});
export default Notification;
