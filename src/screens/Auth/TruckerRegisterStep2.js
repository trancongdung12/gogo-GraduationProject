import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Back from '../../components/Back';
import cmnd from '../../assets/image/cmnd.png';
import cmndBack from '../../assets/image/cmndback.jpg';
const Step2 = (props) => {
  return (
    <View style={styles.container}>
      <Back id={props.componentId} />
      <Text style={styles.title}>Ảnh chụp CMND hoặc CCCD</Text>
      <View style={styles.layoutContent}>
        <View style={styles.itemImage}>
          <Image style={styles.imgCMND} source={cmnd} />
          <Text style={styles.text}>Mặt trước</Text>
        </View>
        <View style={styles.itemImage}>
          <Image style={styles.imgCMND} source={cmndBack} />
          <Text style={styles.text}>Mặt trước</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Step2;
