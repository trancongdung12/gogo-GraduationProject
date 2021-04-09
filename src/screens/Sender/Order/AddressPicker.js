import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { MAP_API_KEY } from '../../../data';
import colors from '../../../themes/Colors';
import OrderActions from '../../../redux/OrderRedux/actions';
import _ from 'lodash';
const GooglePlacesInput = (props) => {
  const id = useSelector((state) => state.login.token);
  const [search, setSearch] = useState([]);
  const returnAddress = (addressData) => {
    const check = !_.some(search, { title: JSON.stringify(addressData) });
    if (check) {
      const data = {
        title: JSON.stringify(addressData),
        id_user: id,
      };
      dispatch(OrderActions.searchHistory(data));
    }

    props?.onCallBack && props?.onCallBack(addressData);
    popScreen(props.componentId);
  };
  const ref = useRef();
  const popScreen = () => {
    Navigation.pop(props.componentId);
    Keyboard.dismiss();
  };
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api-gogo.herokuapp.com/api/search-history/by/' + id,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setSearch(responses.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const dispatch = useDispatch();
  const removeSearch = (index) => {
    axios({
      method: 'DELETE',
      url: 'https://api-gogo.herokuapp.com/api/search-history/' + index,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (responses) {
        if (responses.status === 200) {
          setSearch(responses.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon
            style={{ marginLeft: 10 }}
            name="angle-left"
            size={35}
            color={colors.boldGray}
            onPress={() => popScreen()}
          />
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Nhập vị trí muốn tìm kiếm"
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
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
              height: 40,
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
      <View style={styles.searchContainer}>
        {search.map((item, index) => {
          return (
            <Item
              key={index}
              txt={item.title}
              id={item.id}
              onSetTextSearch={returnAddress}
              removeSearch={removeSearch}
            />
          );
        })}
      </View>
    </View>
  );
};
const Item = (props) => {
  return (
    <View style={styles.layoutSearchHistory}>
      <TouchableOpacity
        style={styles.itemSearchHistory}
        onPress={() => props.onSetTextSearch(JSON.parse(props.txt))}
      >
        <Icon name="history" size={15} color={colors.gray} />
        <Text style={styles.txtSearchHistory}>
          {JSON.parse(props.txt).address + ', ' + JSON.parse(props.txt).city}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.removeSearch(props.id)}>
        <Icon name="times" size={20} color={colors.gray} />
      </TouchableOpacity>
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
  searchContainer: {
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  layoutSearchHistory: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  itemSearchHistory: {
    flexDirection: 'row',
  },
  txtSearchHistory: {
    color: colors.gray,
    marginLeft: 15,
  },
});

export default GooglePlacesInput;
