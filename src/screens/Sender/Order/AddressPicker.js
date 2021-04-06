import React from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MAP_API_KEY } from '../../../data';
import { popScreen } from '../../../navigation/pushScreen';
import colors from '../../../themes/Colors';
const GooglePlacesInput = (props) => {
  const returnAddress = (addressData) => {
    props?.onCallBack && props?.onCallBack(addressData);
    popScreen(props.componentId);
  };
  const popScreen = () => {
    Navigation.pop(props.componentId);
    Keyboard.dismiss();
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon
          style={{ marginLeft: 10 }}
          name="angle-left"
          size={40}
          color={colors.boldGray}
          onPress={() => popScreen()}
        />
      </TouchableOpacity>

      <GooglePlacesAutocomplete
        placeholder="Nhập vị trí muốn tìm kiếm"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details);
          if (details) {
            console.log(details);
            const addressData = {
              lat: details.geometry.location.lat,
              long: details.geometry.location.lng,
              address:
                details.address_components[0].long_name +
                ' ' +
                details.address_components[1].long_name +
                ', ' +
                details.address_components[2].long_name,
              city: details.address_components[3].long_name,
            };
            returnAddress(addressData);
          }
        }}
        query={{
          key: MAP_API_KEY,
          language: 'vi',
        }}
        styles={{
          container: {
            flex: 1,
          },
          textInput: {
            backgroundColor: '#FFFFFF',
            height: 44,
            paddingVertical: 5,
            paddingLeft: 20,
            fontSize: 15,
            flex: 1,
          },
          listView: {
            marginLeft: -20,
          },
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
});

export default GooglePlacesInput;
