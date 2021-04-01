import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../../../data';
import { popScreen } from '../../../navigation/pushScreen';
const GooglePlacesInput = (props) => {
  const returnAddress = (addressData) => {
    props?.onCallBack && props?.onCallBack(addressData);
    popScreen(props.componentId);
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={props.title}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details);
          if (details) {
            console.log(details);
            // props.handleLocation(details.geometry.location.lat, details.geometry.location.lng);
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
          textInput: {
            height: 30,
            color: '#5d5d5d',
            fontSize: 12,
          },
          listView: {
            elevation: 1,
            position: 'absolute',
            zIndex: 9999,
            top: 40,
          },
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GooglePlacesInput;
