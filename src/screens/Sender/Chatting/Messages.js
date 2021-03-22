import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Back from '../../../components/Back';
import colors from '../../../themes/Colors';
import avt_sender from '../../../assets/image/avt_sender.png';
import Icon from 'react-native-vector-icons/AntDesign';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Messages = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <Back id={props.componentId} />
        <View style={styles.layoutTitle}>
          <Text style={styles.title}>Hệ thống</Text>
        </View>
      </View>
      <View style={styles.layoutInbox}>
        <View style={styles.itemSenderInbox}>
          <Image style={styles.avtInbox} source={avt_sender} />
          <View style={styles.itemMessage}>
            <Text style={styles.textMessage}>Bạn đi tới đâu rồi?</Text>
            <Text style={styles.timeMessage}>
              28/02/2021 -09:02 <Icon name="check" />
            </Text>
          </View>
        </View>
        <View style={styles.itemTruckInbox}>
          <Image style={styles.avtInbox} source={avt_sender} />
          <View style={styles.itemMessage}>
            <Text style={styles.textMessageTrucker}>Còn 5 phút nữa tới nơi nè...</Text>
            <Text style={styles.timeMessage}>
              28/02/2021 -09:02 <Icon name="check" />
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  layoutHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 30,
  },
  layoutTitle: {
    flex: 1,
    alignItems: 'center',
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  layoutInbox: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  itemSenderInbox: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemTruckInbox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  avtInbox: {
    height: 40,
    width: 40,
  },
  itemMessage: {
    marginLeft: 10,
  },
  timeMessage: {
    fontSize: 11,
    color: colors.boldGray,
  },
  textMessage: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#50555C',
    color: 'white',
    borderRadius: 10,
  },
  textMessageTrucker: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1A2246',
    color: 'white',
    borderRadius: 10,
  },
});

export default Messages;
