import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../../themes/Colors';
import avt_sender from '../../../assets/image/avt_sender.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Chatting = (props) => {
  console.log('====================================');
  console.log(props.data);
  console.log('====================================');
  const popScreen = () => {
    Navigation.pop(props.componentId);
    Keyboard.dismiss();
  };
  const message = useSelector((state) => state.user.chat.message);
  const scrollViewRef = useRef();
  const [isShow, setIsShow] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => popScreen()}>
          <Icon name="back" size={15} color={props.isWhite ? 'white' : 'black'} />
          <Text style={[styles.backText, props.isWhite && { color: 'white' }]}> Trở lại</Text>
        </TouchableOpacity>
        <View style={styles.layoutTitle}>
          <Text style={styles.title}>Nguyễn Duy Ngọc</Text>
        </View>
      </View>
      <ScrollView
        style={styles.layoutInbox}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {message.map((item, index) =>
          item.id_send === props.data.id_trucker ? (
            <View style={styles.itemSenderInbox}>
              <Image style={styles.avtInbox} source={avt_sender} />
              <View style={styles.itemMessage}>
                <Text style={styles.textMessage}>{item.message}</Text>
                <Text style={styles.timeMessage}>
                  28/02/2021 -09:02 <Icon name="check" />
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.itemTruckInbox}>
              <Image style={styles.avtInbox} source={avt_sender} />
              <View style={styles.itemMessage}>
                <Text style={styles.textMessageTrucker}>{item.message}</Text>
                <Text style={styles.timeMessage}>
                  28/02/2021 -09:02 <Icon name="check" />
                </Text>
              </View>
            </View>
          ),
        )}
      </ScrollView>
      <View style={styles.typeMessage}>
        <TextInput autoFocus={true} style={styles.inputType} placeholder="Chạm để nhập" />
        <TouchableWithoutFeedback onPress={() => setIsShow(!isShow)}>
          <Icons style={styles.icon} name="paper-plane" size={25} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    width: 60,
  },
  backText: {
    color: 'black',
    fontSize: 12,
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
  inputType: {
    borderRadius: 5,
    borderColor: colors.boldGray,
    borderWidth: 1,
    width: SCREEN_WIDTH - 30,
    height: 40,
  },
  typeMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: {
    marginLeft: -30,
  },
});

export default Chatting;
