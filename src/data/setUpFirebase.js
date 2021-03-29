import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD2HaB1034xKK-L2rH5jBKY0qaaJIuQRNU',
  authDomain: 'gogoapp-e34b9.firebaseapp.com',
  projectId: 'gogoapp-e34b9',
  storageBucket: 'gogoapp-e34b9.appspot.com',
  messagingSenderId: '92122166236',
  appId: '1:92122166236:web:985c41340b8afe2412d519',
  measurementId: 'G-5QR73XQCYY',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default () => {
  return { firebase, auth };
};
