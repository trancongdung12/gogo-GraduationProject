import { call, takeLatest, put } from 'redux-saga/effects';
import OrderActions, { OrderTypes } from './actions';
import { userOrderApi } from '../../api/orders';
export function* userLogin({ data }) {
  try {
    console.log(data);
    console.log('call api');
    const response = yield call(userOrderApi, data);
    console.log(response);
    yield put(OrderActions.userOrderSuccess(response.data.order));
  } catch (error) {
    console.log(error);
  }
}

const userOrderSagas = () => [takeLatest(OrderTypes.USER_ORDER, userLogin)];
export default userOrderSagas();
