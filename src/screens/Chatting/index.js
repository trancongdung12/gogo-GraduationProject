import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Back from '../../components/Back';
import Inbox from '../../components/Inbox';
import colors from '../../themes/Colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
const Chatting = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <Back id={props.componentId} />
        <View style={styles.layoutTitle}>
          <Text style={styles.title}>Tin nhắn</Text>
        </View>
      </View>
      <View style={styles.layoutInbox}>
        <Inbox Id={props.componentId} />
        <Inbox isSeen={true} />
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
    marginRight: 60,
  },
  title: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  layoutInbox: {
    marginTop: 20,
  },
});

export default Chatting;
