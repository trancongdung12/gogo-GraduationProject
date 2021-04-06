import { call, takeLatest, put } from 'redux-saga/effects';
import NotiActions, { NotiTypes } from './actions';
import { getNotifyById, countNotifyById } from '../../api/notification';
import AsyncStorage from '@react-native-community/async-storage';
export function* getNotificationById({ onSuccess }) {
  try {
    const id = yield AsyncStorage.getItem('token');
    const response = yield call(getNotifyById, id);
    console.log(response);
    yield put(NotiActions.getNotiByIdSuccess(response.data));
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}
export function* countNotificationById() {
  try {
    const id = yield AsyncStorage.getItem('token');
    const response = yield call(countNotifyById, id);
    yield put(NotiActions.countNotiByIdSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}
const userOrderSagas = () => [
  takeLatest(NotiTypes.GET_NOTI_BY_ID, getNotificationById),
  takeLatest(NotiTypes.COUNT_NOTI_BY_ID, countNotificationById),
];
export default userOrderSagas();
