import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const OrderTypes = makeConstantCreator(
  'USER_ORDER',
  'USER_ORDER_SUCCESS',
  'GET_USER_ORDER_BY_ID',
  'GET_USER_ORDER_BY_ID_SUCCESS',
  'GET_LIST_ORDER',
  'GET_LIST_ORDER_SUCCESS',
  'UPDATE_ORDER_STATUS',
  'UPDATE_ORDER_STATUS_SUCCESS',
  'GET_PRICE',
  'GET_PRICE_SUCCESS',
  'GET_BILL_TRUCKER',
  'GET_BILL_TRUCKER_SUCCESS',
  'COMPLETE_ORDER',
);

const userOrder = (data, onSuccess) =>
  makeActionCreator(OrderTypes.USER_ORDER, { data, onSuccess });

const userOrderSuccess = (response) =>
  makeActionCreator(OrderTypes.USER_ORDER_SUCCESS, { response });

const getUserOrderById = (id, onSuccess) =>
  makeActionCreator(OrderTypes.GET_USER_ORDER_BY_ID, { id, onSuccess });

const getUserOrderByIdSuccess = (response) =>
  makeActionCreator(OrderTypes.GET_USER_ORDER_BY_ID_SUCCESS, { response });

const getListOrder = (onSuccess) => makeActionCreator(OrderTypes.GET_LIST_ORDER, { onSuccess });

const getListOrderSuccess = (response) =>
  makeActionCreator(OrderTypes.GET_LIST_ORDER_SUCCESS, { response });

const updateOrderStatus = (id, status, onSuccess) =>
  makeActionCreator(OrderTypes.UPDATE_ORDER_STATUS, { id, status, onSuccess });

const updateOrderStatusSuccess = (response) =>
  makeActionCreator(OrderTypes.UPDATE_ORDER_STATUS_SUCCESS, { response });

const getPrice = (data, onSuccess) => makeActionCreator(OrderTypes.GET_PRICE, { data, onSuccess });

const getPriceSuccess = (response) => makeActionCreator(OrderTypes.GET_PRICE_SUCCESS, { response });

const getBillTrucker = (id) => makeActionCreator(OrderTypes.GET_BILL_TRUCKER, { id });

const getBillTruckerSuccess = (response) =>
  makeActionCreator(OrderTypes.GET_BILL_TRUCKER_SUCCESS, { response });

const completeOrder = () => makeActionCreator(OrderTypes.COMPLETE_ORDER);
export default {
  userOrder,
  userOrderSuccess,
  getUserOrderById,
  getUserOrderByIdSuccess,
  getListOrder,
  getListOrderSuccess,
  updateOrderStatus,
  updateOrderStatusSuccess,
  getPrice,
  getPriceSuccess,
  getBillTrucker,
  getBillTruckerSuccess,
  completeOrder,
};
