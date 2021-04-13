import { call, takeLatest, put } from 'redux-saga/effects';
import LoginActions, { LoginTypes } from './actions';
import { userLoginApi, userLogoutApi } from '../../api/auth';
import { userStartApp } from '../AppRedux/actions';
import AsyncStorage from '@react-native-community/async-storage';
const storeData = async (value, role) => {
  try {
    if (role === 1) {
      role = 'sender';
    } else {
      role = 'trucker';
    }
    await AsyncStorage.setItem('user_role', role);
    await AsyncStorage.setItem('token', JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};
export function* userLogin({ data }) {
  try {
    const response = yield call(userLoginApi, data);
    yield storeData(response.data.user_id, response.data.role);
    yield put(LoginActions.userLoginSuccess(response.data.user_id));
    yield put(userStartApp());
  } catch (error) {
    console.log(error);
    yield put(LoginActions.userLoginFailure(error));
  }
}

export function* userLogout() {
  try {
    const storeToken = yield AsyncStorage.getItem('token');
    const response = yield call(userLogoutApi, storeToken);
    console.log(response);
    yield AsyncStorage.clear();
    yield AsyncStorage.setItem('skip', JSON.stringify(true));
    yield put(userStartApp());
  } catch (error) {
    console.log(error);
  }
}

const userLoginSagas = () => [
  takeLatest(LoginTypes.USER_LOGIN, userLogin),
  takeLatest(LoginTypes.USER_LOGOUT, userLogout),
];
export default userLoginSagas();
