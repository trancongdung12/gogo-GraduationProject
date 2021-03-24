import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const OrderTypes = makeConstantCreator(
  'USER_ORDER',
  'USER_ORDER_SUCCESS',
  'GET_USER_ORDER_BY_ID',
  'GET_USER_ORDER_BY_ID_SUCCESS',
  'GET_LIST_ORDER',
  'GET_LIST_ORDER_SUCCESS',
);

const userOrder = (data, onSuccess) =>
  makeActionCreator(OrderTypes.USER_ORDER, { data, onSuccess });

const userOrderSuccess = (response) =>
  makeActionCreator(OrderTypes.USER_ORDER_SUCCESS, { response });

const getUserOrderById = (id) => makeActionCreator(OrderTypes.GET_USER_ORDER_BY_ID, { id });

const getUserOrderByIdSuccess = (response) =>
  makeActionCreator(OrderTypes.GET_USER_ORDER_BY_ID_SUCCESS, { response });

const getListOrder = (onSuccess) => makeActionCreator(OrderTypes.GET_LIST_ORDER, { onSuccess });

const getListOrderSuccess = (response) =>
  makeActionCreator(OrderTypes.GET_LIST_ORDER_SUCCESS, { response });

export default {
  userOrder,
  userOrderSuccess,
  getUserOrderById,
  getUserOrderByIdSuccess,
  getListOrder,
  getListOrderSuccess,
};
