import { call, takeLatest, put } from 'redux-saga/effects';
import RegisterActions, { RegisterTypes } from './actions';
import { userRegisterApi } from '../../api/auth';
import { completeRegisterScreen } from '../../navigation/pushScreen';
export function* userSignUpApi({ data }) {
  try {
    const response = yield call(userRegisterApi, data);
    yield put(RegisterActions.userSignUpSuccess(response));
    yield completeRegisterScreen();
  } catch (error) {
    console.log(error);
    yield put(RegisterActions.userSignUpFailure(error));
  }
}

const userRegisterSagas = () => [takeLatest(RegisterTypes.USER_SIGNUP, userSignUpApi)];
export default userRegisterSagas();
