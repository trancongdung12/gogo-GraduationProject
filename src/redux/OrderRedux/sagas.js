import { call, takeLatest, put } from 'redux-saga/effects';
import OrderActions, { OrderTypes } from './actions';
import {
  userOrderApi,
  getUserOrderByIdApi,
  getListOrderApi,
  updateOrderStatusApi,
  getPriceApi,
} from '../../api/orders';
export function* userOrder({ data, onSuccess }) {
  try {
    const response = yield call(userOrderApi, data);
    console.log(response);
    yield put(OrderActions.userOrderSuccess(response.data.order));
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}
export function* userOrderById({ id, onSuccess }) {
  try {
    const response = yield call(getUserOrderByIdApi, id);
    yield put(OrderActions.getUserOrderByIdSuccess(response.data));
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}
export function* getListOrderSaga({ onSuccess }) {
  try {
    const response = yield call(getListOrderApi);
    console.log(response);
    yield put(OrderActions.getListOrderSuccess(response.data));
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}

export function* updateOrderStatusSaga({ id, status, onSuccess }) {
  try {
    const response = yield updateOrderStatusApi(id, status);
    console.log(response);
    // yield put(OrderActions.updateOrderStatusSuccess());
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}
export function* getPriceSage({ data, onSuccess }) {
  try {
    const response = yield getPriceApi(data);
    console.log(response);
    yield put(OrderActions.getPriceSuccess(response.data));
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}
const userOrderSagas = () => [
  takeLatest(OrderTypes.USER_ORDER, userOrder),
  takeLatest(OrderTypes.GET_USER_ORDER_BY_ID, userOrderById),
  takeLatest(OrderTypes.GET_LIST_ORDER, getListOrderSaga),
  takeLatest(OrderTypes.UPDATE_ORDER_STATUS, updateOrderStatusSaga),
  takeLatest(OrderTypes.GET_PRICE, getPriceSage),
];
export default userOrderSagas();
