import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AppTypes } from './actions';
import {
  introScreen,
  loginScreen,
  homeScreen,
  homeTruckerScreen,
  completeTruckerRegisterScreen,
} from '../../navigation/pushScreen';
import AsyncStorage from '@react-native-community/async-storage';
import LoginAction from '../LoginRedux/actions';
import { getListTruckSuccess } from './actions';
import { getListTruckApi } from '../../api/app';
export function* loadingAppSagas() {
  try {
    const storeToken = yield AsyncStorage.getItem('token');
    console.log(storeToken);
    const role = yield AsyncStorage.getItem('user_role');
    if (storeToken !== null) {
      if (role === 'sender') {
        homeScreen();
      } else {
        homeTruckerScreen();
      }
      yield put(LoginAction.userLoginSuccess(storeToken));
    } else if (role === 'user') {
      completeTruckerRegisterScreen();
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

export function* getListTruck({ onSuccess }) {
  try {
    const response = yield call(getListTruckApi);
    yield put(getListTruckSuccess(response.data));
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}

const appSagas = () => [
  takeLatest(AppTypes.START_APP, loadingAppSagas),
  takeLatest(AppTypes.GO_TO_INTRO, goToIntroSagas),
  takeLatest(AppTypes.MAKE_SKIP_INTRO, makeSkipIntroSagas),
  takeLatest(AppTypes.GET_LIST_TRUCK, getListTruck),
];
export default appSagas();
