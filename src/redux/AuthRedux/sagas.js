import { call, takeLatest, put } from 'redux-saga/effects';
import LoginActions, { LoginTypes } from './actions';
import { userLoginApi } from '../../api/auth';
import { userStartApp } from '../AppRedux/actions';
import AsyncStorage from '@react-native-community/async-storage';
export function* userLogin({ data }) {
  try {
    const response = yield call(userLoginApi, data);
    const newResponse = {
      data: response.data.user,
      token: response.data.token.access_token,
    };
    console.log('====================================');
    console.log(newResponse);
    console.log('====================================');
    // yield AsyncStorage.setItem('token', response.data.token.access_token);
    // yield put(LoginActions.userLoginSuccess(newResponse));
    // yield put(userStartApp());
  } catch (error) {
    console.log(error);
    yield put(LoginActions.userLoginFailure(error));
  }
}

export function* userLogout() {
  yield AsyncStorage.clear();
  yield AsyncStorage.setItem('skip', JSON.stringify(true));
  yield put(userStartApp());
}

const userLoginSagas = () => [
  takeLatest(LoginTypes.USER_LOGIN, userLogin),
  takeLatest(LoginTypes.USER_LOGOUT, userLogout),
];
export default userLoginSagas();
