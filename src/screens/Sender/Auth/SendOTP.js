// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
// import { pushScreen } from '../../../navigation/pushScreen';
// import Button from '../../../components/Button';
// import colors from '../../../themes/Colors';
// import flag from '../../../assets/image/flag.png';
// import Back from '../../../components/Back';
// import { useDispatch } from 'react-redux';
// import registerActions from '../../../redux/RegisterRedux/actions';
// const Auth = (props) => {
//   const [phone, setPhone] = useState('');
//   const dispatch = useDispatch();
//   const confirmSMS = () => {
//     dispatch(registerActions.userSignUpSavePhone(phone));
//     let code = Math.floor(1000 + Math.random() * 9000);
//     console.log(code);
//     // const request = `https://http-api.d7networks.com/send?username=tgis8965&password=LRmayC6D&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=From GoGo App. Your verify code is ${code} &to=+84${phone}`;
//     // fetch(request)
//     //   .then((res) => {
//     //     if (res.ok) {
//     //       console.log(res);
//     //       pushScreen(props.componentId, 'ConfirmOTP', code, '', false);
//     //     } else {
//     //       console.log('Error sending message');
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//     pushScreen(props.componentId, 'ConfirmOTP', code, '', false);
//   };
//   return (
//     <View style={styles.container}>
//       <Back id={props.componentId} />
//       <View style={styles.layoutContent}>
//         <Text style={styles.title}>Vui lòng nhập số điện thoại của bạn tại đây!</Text>
//         <View style={styles.itemInput}>
//           <View style={styles.layoutRegion}>
//             <Image style={styles.imgRegion} source={flag} />
//             <Text style={styles.textRegion}>+84</Text>
//           </View>
//           <TextInput
//             autoFocus={true}
//             keyboardType="number-pad"
//             style={styles.input}
//             placeholder="0985452133"
//             onChangeText={(value) => setPhone(value)}
//           />
//         </View>
//       </View>
//       <Button title="Xác thực bằng SMS" handleFunc={confirmSMS} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 15,
//     marginTop: 20,
//   },
//   backButton: {
//     flexDirection: 'row',
//   },
//   backText: {
//     color: 'black',
//     fontSize: 12,
//   },
//   title: {
//     fontSize: 18,
//   },
//   layoutContent: {
//     marginTop: 150,
//     paddingHorizontal: 20,
//   },
//   itemInput: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: colors.lightGray,
//     borderRadius: 10,
//     marginTop: 40,
//     paddingLeft: 15,
//     marginBottom: 20,
//   },
//   input: {
//     width: 200,
//     height: 40,
//     fontSize: 14,
//     paddingLeft: 10,
//   },
//   layoutRegion: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRightColor: colors.lightGray,
//     borderRightWidth: 1,
//     paddingRight: 5,
//   },
//   imgRegion: {
//     height: 30,
//     width: 30,
//   },
//   textRegion: {
//     fontSize: 14,
//     marginLeft: 5,
//   },
// });

// //make this component available to the app
// export default Auth;
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAgCPqYrtqRioI4Koxj9XH0QOENuR4I7sA',
  projectId: 'gogoapp-e34b9',
  storageBucket: 'gogoapp-e34b9.appspot.com',
  messagingSenderId: '92122166236',
  appId: '1:92122166236:android:36d307d1fc299dae12d519',
  measurementId: 'G-5QR73XQCYY',
};
function PhoneSignIn() {
  firebase.initializeApp(firebaseConfig);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log('run');
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(confirmation);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmCode() {
    try {
      console.log(code);
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button title="Phone Number Sign In" onPress={() => signInWithPhoneNumber('+84585058709')} />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}
export default PhoneSignIn;