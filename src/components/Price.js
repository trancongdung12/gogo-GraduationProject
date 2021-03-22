import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumberFormat from 'react-number-format';
import colors from '../themes/Colors';

const Price = (props) => {
  return (
    <Text style={styles.price}>
      <NumberFormat
        value={props.price}
        displayType={'text'}
        thousandSeparator={true}
        renderText={(formattedValue) => <Text>{formattedValue}</Text>}
      />{' '}
      <Text style={styles.thousand}>(VND)</Text>
    </Text>
  );
};

export default Price;

const styles = StyleSheet.create({
  price: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  thousand: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
