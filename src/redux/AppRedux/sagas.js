import { takeLatest, select, put } from 'redux-saga/effects';
import { AppTypes } from './actions';
import {
  introScreen,
  loginScreen,
  homeScreen,
  homeTruckerScreen,
} from '../../navigation/pushScreen';
import AsyncStorage from '@react-native-community/async-storage';
import UserAction from '../UserRedux/actions';
import LoginAction from '../LoginRedux/actions';
export function* loadingAppSagas() {
  try {
    const storeToken = yield AsyncStorage.getItem('token');
    const role = yield AsyncStorage.getItem('user_role');
    let token = null;
    if (storeToken) {
      token = storeToken;
    } else {
      token = yield select((state) => state.login.token);
    }
    if (token) {
      if (storeToken !== null) {
        if (role === 'sender') {
          homeScreen();
        } else {
          homeTruckerScreen();
        }
        yield put(UserAction.userInfo(storeToken));
        yield put(LoginAction.userLoginSuccess(storeToken));
      }
    } else {
      loginScreen();
    }
  } catch (error) {
    loginScreen();
    console.log(error);
  }
}

export function* goToIntroSagas() {
  introScreen();
}

export function* makeSkipIntroSagas() {
  yield AsyncStorage.setItem('skip', JSON.stringify(true));
  yield loadingAppSagas();
}

const appSagas = () => [
  takeLatest(AppTypes.START_APP, loadingAppSagas),
  takeLatest(AppTypes.GO_TO_INTRO, goToIntroSagas),
  takeLatest(AppTypes.MAKE_SKIP_INTRO, makeSkipIntroSagas),
];
export default appSagas();
