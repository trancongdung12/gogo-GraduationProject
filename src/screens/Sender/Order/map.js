import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../themes/Colors';
import { popScreen } from '../../../navigation/pushScreen';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { data } from '../../../data';
import Button from '../../../components/Button';
import Geolocation from '@react-native-community/geolocation';
import { Dimensions } from 'react-native';
import ItemMarker from '../../../components/ItemMarker';
import Geocoder from 'react-native-geocoding';
import { MAP_API_KEY } from '../../../data';
import marker_2 from '../../../assets/image/marker_2.png';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from '../../../components/BottomSheet';
import { Navigation } from 'react-native-navigation';
const windowHeight = Dimensions.get('window').height;
const Map = (props) => {
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
  const initOrigin = {
    latitude: null,
    longitude: null,
  };
  const initDestination = {
    latitude: null,
    longitude: null,
  };
  const [distance, setDistance] = useState(initDistance);
  const [origin, setOrigin] = useState(initOrigin);
  const [destination, setDestination] = useState(initDestination);
  const [currentLocation, setCurrentLocation] = useState(iniCurrentLocation);
  const [currentAddress, setCurrentAddress] = useState('');
  const [modal, setModal] = useState(false);
  const [pointSend, setPointSend] = useState('');
  const [pointShip, setPointShip] = useState('');
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
        var addressComponent = {
          address:
            json.results[0].address_components[0].long_name +
            ' ' +
            json.results[0].address_components[1].long_name +
            ', ' +
            json.results[0].address_components[2].long_name,
          city: json.results[0].address_components[3].long_name,
        };

        setCurrentAddress(addressComponent);
      })
      .catch((error) => console.log(error));
  };
  getAddressByLocation();

  const convertMinute = (totalMinutes) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    var result = hours + ' giờ ' + minutes + ' phút ';
    return result;
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const dataModal = (infoReceiver) => {
    const dataMap = {
      info: infoReceiver,
      distance: distance,
      pointSend: pointSend ? JSON.stringify(pointSend) : JSON.stringify(currentAddress),
      pointShip: JSON.stringify(pointShip),
    };
    props?.onCallBack && props?.onCallBack(dataMap);
    popScreen(props.componentId);
  };
  const callBackAddress = (status) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'AddressPicker',
        passProps: {
          onCallBack: (dataReturn) => {
            if (status == 'send') {
              setPointSend(dataReturn);
              setOrigin({ latitude: dataReturn.lat, longitude: dataReturn.long });
              console.log('Address -> send', dataReturn);
            } else {
              setPointShip(dataReturn);
              setDestination({ latitude: dataReturn.lat, longitude: dataReturn.long });
              console.log('Address -> ship', dataReturn);
            }
          },
        },
        options: {
          topBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
      },
    });
  };

  return currentAddress ? (
    <View style={[styles.container, modal && { opacity: 0.9 }]}>
      {modal && <BottomSheet returnData={dataModal} closeModal={closeModal} />}
      <View style={styles.layoutHeader}>
        <View style={styles.itemHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => popScreen(props.componentId)}>
            <Icon name="back" size={15} color="white" />
            <Text style={styles.backText}> Trở lại</Text>
          </TouchableOpacity>
          <View style={styles.layoutTitle}>
            <Text style={styles.title}>Địa chỉ vận chuyển</Text>
          </View>
        </View>
        <View style={styles.layoutAddress}>
          <TouchableOpacity style={styles.itemAddress} onPress={() => callBackAddress('send')}>
            <Text style={styles.txtAddress}>
              {pointSend
                ? pointSend.address + ', ' + pointSend.city
                : currentAddress.address + ', ' + currentAddress.city}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemAddress} onPress={() => callBackAddress('ship')}>
            <Text style={[styles.txtAddress, { color: pointShip ? 'black' : colors.boldGray }]}>
              {pointShip ? pointShip.address + ', ' + pointShip.city : 'Điểm dỡ hàng'}
            </Text>
          </TouchableOpacity>
        </View>
        {destination.latitude && (
          <View style={styles.layoutDuration}>
            <Text style={styles.textDistance}>{distance.kilometer} km</Text>
            <Text style={styles.textDuration}>{convertMinute(distance.minute)}</Text>
          </View>
        )}
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
            latitude: origin.latitude ? origin.latitude : currentLocation.latitude,
            longitude: origin.latitude ? origin.longitude : currentLocation.longitude,
          }}
          title={'Điểm bốc hàng'}
          description={'Xe sẽ đến lấy hàng tại đây'}
        />
        {destination.latitude && (
          <Marker
            coordinate={{
              latitude: destination.latitude ? destination.latitude : currentLocation.latitude,
              longitude: destination.latitude ? destination.longitude : currentLocation.longitude,
            }}
            title={'Điểm dỡ hàng'}
            description={'Xe sẽ dỡ hàng tại đây'}
          >
            <Image source={marker_2} style={{ width: 50, height: 50 }} />
          </Marker>
        )}
        {destination.latitude && (
          <MapViewDirections
            origin={
              origin.latitude
                ? origin
                : {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }
            }
            destination={destination}
            apikey={MAP_API_KEY}
            strokeWidth={5}
            optimizeWaypoints={true}
            strokeColor="hotpink"
            onReady={(result) => {
              setDistance({
                minute: Math.round(result.duration),
                kilometer: Math.round(result.distance * 100) / 100,
              });
            }}
          />
        )}
      </MapView>
      <View style={styles.btnConfirm}>
        <Button title="XÁC NHẬN" handleFunc={openModal} />
      </View>
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
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
  backButton: {
    flexDirection: 'row',
    width: 70,
  },
  backText: {
    color: 'white',
    fontSize: 12,
  },
  layoutTitle: {
    flex: 1,
    alignItems: 'center',
    marginRight: 70,
  },
  btnConfirm: {
    position: 'absolute',
    bottom: 20,
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
  layoutDuration: {
    flexDirection: 'row',
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A8910',
    marginBottom: 10,
    height: 25,
    width: 200,
    borderRadius: 5,
  },
  textDuration: {
    marginLeft: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textDistance: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
  itemAddress: {
    backgroundColor: 'white',
    borderRadius: 3,
    marginBottom: 10,
  },
  txtAddress: {
    fontSize: 12,
    paddingVertical: 8,
    paddingLeft: 10,
  },
});

export default Map;
