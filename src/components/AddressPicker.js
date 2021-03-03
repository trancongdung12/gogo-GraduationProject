import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../data';
const GooglePlacesInput = (props) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={props.title}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details);
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
