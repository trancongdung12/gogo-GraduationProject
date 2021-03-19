import { call, takeLatest, put } from 'redux-saga/effects';
import OrderActions, { OrderTypes } from './actions';
import { userOrderApi, getUserOrderByIdApi } from '../../api/orders';
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
export function* userOrderById({ id }) {
  try {
    const response = yield call(getUserOrderByIdApi, id);
    console.log(response);
    yield put(OrderActions.getUserOrderByIdSuccess(response.data.ordersByUser));
  } catch (error) {
    console.log(error);
  }
}
const userOrderSagas = () => [
  takeLatest(OrderTypes.USER_ORDER, userOrder),
  takeLatest(OrderTypes.GET_USER_ORDER_BY_ID, userOrderById),
];
export default userOrderSagas();
