import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../themes/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
const OptionSetting = (props) => {
  return (
    <View style={styles.itemOption}>
      <View style={styles.titleOption}>
        <Icons name={props.icon} size={20} color="#50555C" />
        <Text style={styles.txtOption}>{props.name}</Text>
      </View>
      <Icon name="angle-right" size={20} color="#50555C" />
    </View>
  );
};

export default OptionSetting;

const styles = StyleSheet.create({
  txtOption: {
    color: '#50555C',
    marginLeft: 10,
  },
  itemOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.boldGray,
    paddingBottom: 20,
    marginBottom: 20,
  },
  titleOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
