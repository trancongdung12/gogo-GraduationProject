import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../themes/Colors';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
