import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const OrderTypes = makeConstantCreator(
  'USER_ORDER',
  'USER_ORDER_SUCCESS',
  'GET_USER_ORDER_BY_ID',
  'GET_USER_ORDER_BY_ID_SUCCESS',
  'GET_LIST_ORDER',
  'GET_LIST_ORDER_SUCCESS',
  'UPDATE_ORDER_STATUS',
  'UPDATE_ORDER_STATUS_FAILED',
  'GET_PRICE',
  'GET_PRICE_SUCCESS',
  'GET_BILL_TRUCKER',
  'GET_BILL_TRUCKER_SUCCESS',
  'DELIVERY_ORDER',
  'SEARCH_HISTORY',
  'SEARCH_HISTORY_SUCCESS',
  'ADD_LOCATION',
  'GET_LOCATION',
  'USER_COUPON',
  'USER_COUPON_SUCCESS',
  'USER_COUPON_FAILED',
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

const updateOrderStatus = (id, status, onSuccess, onFailed) =>
  makeActionCreator(OrderTypes.UPDATE_ORDER_STATUS, { id, status, onSuccess, onFailed });

const updateOrderStatusFailed = (response) =>
  makeActionCreator(OrderTypes.UPDATE_ORDER_STATUS_FAILED, { response });

const getPrice = (data, onSuccess) => makeActionCreator(OrderTypes.GET_PRICE, { data, onSuccess });

const getPriceSuccess = (response) => makeActionCreator(OrderTypes.GET_PRICE_SUCCESS, { response });

const getBillTrucker = (id) => makeActionCreator(OrderTypes.GET_BILL_TRUCKER, { id });

const getBillTruckerSuccess = (response) =>
  makeActionCreator(OrderTypes.GET_BILL_TRUCKER_SUCCESS, { response });

const deliveryOrder = () => makeActionCreator(OrderTypes.DELIVERY_ORDER);

const searchHistory = (data) => makeActionCreator(OrderTypes.SEARCH_HISTORY, { data });

const searchHistorySuccess = (response) =>
  makeActionCreator(OrderTypes.SEARCH_HISTORY_SUCCESS, { response });

const addLocation = (data) => makeActionCreator(OrderTypes.ADD_LOCATION, { data });

const getCoupon = (code, onSuccess, onFailed) =>
  makeActionCreator(OrderTypes.USER_COUPON, { code, onSuccess, onFailed });

const getCouponSuccess = (response) =>
  makeActionCreator(OrderTypes.USER_COUPON_SUCCESS, { response });

const getCouponFailed = () => makeActionCreator(OrderTypes.USER_COUPON_FAILED);
export default {
  userOrder,
  userOrderSuccess,
  getUserOrderById,
  getUserOrderByIdSuccess,
  getListOrder,
  getListOrderSuccess,
  updateOrderStatus,
  updateOrderStatusFailed,
  getPrice,
  getPriceSuccess,
  getBillTrucker,
  getBillTruckerSuccess,
  deliveryOrder,
  searchHistory,
  searchHistorySuccess,
  addLocation,
  getCoupon,
  getCouponSuccess,
  getCouponFailed,
};
