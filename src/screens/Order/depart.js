import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes/Colors';
import { popScreen } from '../../navigation/pushScreen';
import AddressPicker from '../../components/AddressPicker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import marker from '../../assets/image/marker.png';
import { data } from '../../data/';
import Geolocation from '@react-native-community/geolocation';
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
const Depart = (props) => {
  const initialLocation = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };
  const initDistance = {
    minute: null,
    kilometer: null,
  };
  const initPosition = {
    lat: null,
    long: null,
  };
  const [distance, setDistance] = useState(initDistance);
  const [location, setLocation] = useState(initialLocation);
  const [position, setPosition] = useState(initPosition);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setLocation({
          ...location,
          latitude,
          longitude,
        });
      },
      (error) => alert(error.message),
      {
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.layoutHeader}>
        <View style={styles.itemHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => popScreen(props.componentId)}>
            <Icon name="angle-left" size={15} color="white" />
            <Text style={styles.backText}> Trở lại</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Địa chỉ vận chuyển</Text>
        </View>
        <View style={styles.layoutAddress}>
          <AddressPicker title="Điểm bốc hàng" />
          <AddressPicker title="Điểm dỡ hàng" />
        </View>
      </View>
      {location.latitude ? (
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={location}
        >
          {data.markers.map((item, index) => (
            <ItemMarker
              key={index}
              latitude={item.latitude}
              longitude={item.longitude}
              title={item.title}
              description={item.description}
            />
          ))}
          {/* <Marker
        coordinate={{
          latitude: position.lat,
          longitude: position.long,
        }}
        title={"test get  andress"}
        description={"props.description"}
      /> */}
          {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="hotpink"
          onReady={(result) => {
            setDistance({
              minute: Math.round(result.duration),
              kilometer: Math.round(result.distance * 100) / 100,
            });
          }}
        /> */}
        </MapView>
      ) : (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="green" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backText: {
    color: 'white',
    fontSize: 12,
  },
  layoutHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  itemHeader: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 70,
  },
  borderCircle: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 7.5,
    width: 15,
    height: 15,
    alignItems: 'center',
    left: 20,
  },
  messageCount: {
    color: 'white',
    fontSize: 10,
  },
  layoutAddress: {
    height: 100,
    marginTop: 20,
  },
});

//make this component available to the app
export default Depart;
