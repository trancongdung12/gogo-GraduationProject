import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const OrderTypes = makeConstantCreator(
  'USER_ORDER',
  'USER_ORDER_SUCCESS',
  'USER_ORDER_FAILURE',
  'GET_USER_ORDER_BY_ID',
  'GET_USER_ORDER_BY_ID_SUCCESS',
  'GET_USER_ORDER_BY_ID_FAILURE',
);

const userOrder = (data, onSuccess) =>
  makeActionCreator(OrderTypes.USER_ORDER, { data, onSuccess });

const userOrderSuccess = (response) =>
  makeActionCreator(OrderTypes.USER_ORDER_SUCCESS, { response });

const userOrderFailure = (error) => makeActionCreator(OrderTypes.USER_ORDER_FAILURE, { error });

const getUserOrderById = (id) => makeActionCreator(OrderTypes.GET_USER_ORDER_BY_ID, { id });

const getUserOrderByIdSuccess = (response) =>
  makeActionCreator(OrderTypes.GET_USER_ORDER_BY_ID_SUCCESS, { response });

const getUserOrderByIdFailure = (error) =>
  makeActionCreator(OrderTypes.GET_USER_ORDER_BY_ID_FAILURE, { error });

export default {
  userOrder,
  userOrderSuccess,
  userOrderFailure,
  getUserOrderById,
  getUserOrderByIdSuccess,
  getUserOrderByIdFailure,
};
