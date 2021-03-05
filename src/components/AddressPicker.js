import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../data';
const GooglePlacesInput = (props) => {
  const ref = useRef();
  console.log(props.address);
  useEffect(() => {
    ref.current?.setAddressText(props.address);
  }, []);
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={props.title}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details);
          if (details) {
            props.handleLocation(details.geometry.location.lat, details.geometry.location.lng);
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
