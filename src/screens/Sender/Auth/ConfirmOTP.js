import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { pushScreen } from '../../../navigation/pushScreen';
import Button from '../../../components/Button';
import Back from '../../../components/Back';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
const ConfirmOTP = ({ data, componentId }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const isMatchOTP = () => {
    if (value == '000000') {
      pushScreen(componentId, 'OptionScreen', '', '', false, '', '');
    } else {
      console.log(data);
      console.log(value);
    }
  };
  return (
    <View style={styles.container}>
      <Back id={componentId} />
      <View style={styles.layoutContent}>
        <Text style={styles.title}>Vui lòng nhập mã xác nhận gồm 6 chữ số!</Text>
        <View style={styles.itemInput}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
      </View>
      <Button title="Tiếp theo" handleFunc={isMatchOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { textAlign: 'center', fontSize: 25 },
  codeFieldRoot: { marginTop: 20, justifyContent: 'space-between', flexDirection: 'row', flex: 1 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
  },
  backText: {
    color: 'black',
    fontSize: 12,
  },
  layoutContent: {
    marginTop: 130,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 40,
  },
});

//make this component available to the app
export default ConfirmOTP;
