import React, { useEffect, useRef, useState } from 'react';
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
  RefreshControl,
} from 'react-native';
import colors from '../themes/Colors';
import avt_sender from '../assets/image/avt_sender.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
import UserAction from '../redux/UserRedux/actions';
import messaging from '@react-native-firebase/messaging';
import { useCallback } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Chatting = (props) => {
  const popScreen = () => {
    Navigation.pop(props.componentId);
    Keyboard.dismiss();
  };
  const message = useSelector((state) => state.user.chat.message);
  const scrollViewRef = useRef();
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onSendMessage = (txt) => {
    setContent(' ');
    const data = {
      id_send: props.data.id_send,
      id_receive: props.data.id_receive,
      message: txt,
    };
    console.log('data', data);
    dispatch(UserAction.userChat(data, onSuccess));
  };
  const onSuccess = () => {
    dispatch(UserAction.userChatList(props.data.id_send));
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.type === 'message') {
        dispatch(UserAction.userChatList(props.data.id_send));
      }
    });
    return unsubscribe;
  });
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(UserAction.userChatList(props.data.id_send));
    setRefreshing(false);
  }, [dispatch, props.data.id_send]);
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => popScreen()}>
          <Icon name="back" size={15} color={props.isWhite ? 'white' : 'black'} />
          <Text style={[styles.backText, props.isWhite && { color: 'white' }]}> Trở lại</Text>
        </TouchableOpacity>
        <View style={styles.layoutTitle}>
          <Text style={styles.title}>{props.data.name}</Text>
        </View>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.layoutInbox}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {message.map((item, index) =>
          item.id_receive !== props.data.id_receive ? (
            <View key={index} style={styles.itemSenderInbox}>
              <Image style={styles.avtInbox} source={{ uri: props.data.send_avt }} />
              <View style={styles.itemMessage}>
                <Text style={styles.textMessage}>{item.message}</Text>
              </View>
            </View>
          ) : (
            <View key={index} style={styles.itemTruckInbox}>
              <View style={styles.itemMessage}>
                <Text style={styles.textMessageTrucker}>{item.message}</Text>
              </View>
              <Image style={styles.avtInbox} source={{ uri: props.data.receive_avt }} />
            </View>
          ),
        )}
      </ScrollView>
      <View style={styles.typeMessage}>
        <TextInput
          autoFocus={true}
          value={content}
          style={styles.inputType}
          onChangeText={(txt) => setContent(txt)}
          placeholder="Chạm để nhập"
        />
        <TouchableWithoutFeedback onPress={() => onSendMessage(content)}>
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
    borderRadius: 20,
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
    backgroundColor: colors.lightGray,
    color: 'black',
    borderRadius: 10,
  },
  textMessageTrucker: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    color: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  inputType: {
    borderRadius: 5,
    borderColor: colors.boldGray,
    borderWidth: 1,
    width: SCREEN_WIDTH - 30,
    height: 40,
    paddingHorizontal: 10,
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
