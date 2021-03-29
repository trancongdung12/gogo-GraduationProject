import React, { useRef } from 'react';
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
const SCREEN_WIDTH = Dimensions.get('window').width;
const Messages = (props) => {
  const popScreen = () => {
    Navigation.pop(props.componentId);
    Keyboard.dismiss();
  };
  const scrollViewRef = useRef();
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
      </ScrollView>
      <View style={styles.typeMessage}>
        <TextInput autoFocus={true} style={styles.inputType} placeholder="Chạm để nhập" />
        <TouchableWithoutFeedback onPress={() => alert('Function not work')}>
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

export default Messages;
