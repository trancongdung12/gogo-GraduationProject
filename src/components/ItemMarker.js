import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import marker from '../assets/image/marker.png';

const ItemMarker = (props) => {
  return (
    <Marker
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      title={props.title}
      description={props.description}
    >
      <Image source={marker} style={{ width: 50, height: 50 }} />
    </Marker>
  );
};

export default ItemMarker;
