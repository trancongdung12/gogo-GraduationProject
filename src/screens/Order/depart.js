import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes/Colors';
import { popScreen } from '../../navigation/pushScreen';
import AddressPicker from '../../components/AddressPicker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { data } from '../../data/';
import Button from '../../components/Button';
import Geolocation from '@react-native-community/geolocation';
import { Dimensions } from 'react-native';
import ItemMarker from '../../components/ItemMarker';
import Geocoder from 'react-native-geocoding';
import { MAP_API_KEY } from '../../data';
const windowHeight = Dimensions.get('window').height;
const Depart = (props) => {
  const iniCurrentLocation = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };
  const initDistance = {
    minute: null,
    kilometer: null,
  };
  const [distance, setDistance] = useState(initDistance);
  const [currentLocation, setCurrentLocation] = useState(iniCurrentLocation);
  const [currentAddress, setCurrentAddress] = useState('');
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setCurrentLocation({
          ...currentLocation,
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
  const getAddressByLocation = () => {
    Geocoder.init(MAP_API_KEY, { language: 'vi' });
    Geocoder.from(currentLocation)
      .then((json) => {
        var addressComponent =
          json.results[0].address_components[0].long_name +
          ' ' +
          json.results[0].address_components[1].long_name +
          ' ' +
          json.results[0].address_components[2].long_name +
          ' ' +
          json.results[0].address_components[3].long_name;
        // console.log(addressComponent);
        setCurrentAddress(addressComponent);
      })
      .catch((error) => console.log(error));
  };
  getAddressByLocation();
  return currentAddress ? (
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
          <AddressPicker address={currentAddress} title="Điểm bốc hàng" />
          <AddressPicker address="" title="Điểm dỡ hàng" />
        </View>
      </View>

      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentLocation}
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
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title={'test get  address'}
          description={'description'}
        />
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
      <View style={styles.btnConfirm}>
        <Button title="XÁC NHẬN" />
      </View>
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} size="large" color="green" />
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
    height: windowHeight,
  },
  backText: {
    color: 'white',
    fontSize: 12,
  },
  btnConfirm: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
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

export default Depart;
