import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../themes/Colors';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MAP_API_KEY_V2 } from '../../../data';
import marker_2 from '../../../assets/image/marker_2.png';
import marker from '../../../assets/image/marker.png';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import avt_trucker from '../../../assets/image/avt_trucker.png';
import { Navigation } from 'react-native-navigation';
const windowHeight = Dimensions.get('window').height;
const Map = (props) => {
  const data = props.data;
  const iniCurrentLocation = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };
  const initDestination = {
    latitude: JSON.parse(data.send_to).lat,
    longitude: JSON.parse(data.send_to).long,
  };
  const [destination, setDestination] = useState(initDestination);
  const [currentLocation, setCurrentLocation] = useState(iniCurrentLocation);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api-gogo.herokuapp.com/api/bill/location/' + data.id_trucker,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          const { latitude, longitude } = JSON.parse(responses.data.location);
          setCurrentLocation({
            ...currentLocation,
            latitude,
            longitude,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return currentLocation.latitude ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Navigation.pop(props.componentId)}>
          <Icons name="angle-left" size={35} />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <View style={styles.info}>
            <Text style={styles.title}>ĐƠN HÀNG #{data.id}</Text>
            <Text style={styles.desc}>Thời gian đến: 12:00</Text>
          </View>
          <View style={styles.imageLayout}>
            <Image style={styles.image} source={{ uri: data.trucker_avt }} />
            <Text style={styles.name}>{data.trucker_name}</Text>
            <Icon style={styles.icon} name="wechat" size={25} color={colors.primary} />
            <Icon style={styles.icon} name="phone" size={25} color={colors.primary} />
          </View>
        </View>
      </View>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentLocation}
      >
        <Marker
          coordinate={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
          }}
          title={'Xe của bạn'}
          description={'Vị trí xe hiện tại'}
        >
          <Image source={marker} style={{ width: 50, height: 50 }} />
        </Marker>
        <Marker
          coordinate={{
            latitude: destination?.latitude,
            longitude: destination?.latitude,
          }}
          title={'Điểm giao hàng'}
          description={'Xe sẽ giao hàng tại đây'}
        >
          <Image source={marker_2} style={{ width: 50, height: 50 }} />
        </Marker>
        <MapViewDirections
          origin={currentLocation}
          destination={destination}
          apikey={MAP_API_KEY_V2}
          strokeWidth={5}
          optimizeWaypoints={true}
          strokeColor="skyblue"
        />
      </MapView>
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} size="small" color={colors.primary} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: windowHeight,
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    flex: 1,
  },
  imageLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    borderRadius: 20,
    marginRight: 5,
  },
  name: {
    fontSize: 12,
  },
  icon: {
    marginLeft: 5,
  },
  load: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
  },
});

export default Map;
