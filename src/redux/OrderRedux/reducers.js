import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/Utils';
import { OrderTypes } from './actions';

export const INITIAL_STATE = Immutable({
  loading: false,
  orderById: null,
  error: null,
  type: '',
  data: null,
  orderList: null,
  price: null,
});

export const userOrder = (state, { response }) =>
  state.merge({ loading: true, error: null, type: 'User Order' });

export const userOrderSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    error: null,
    data: response,
    type: 'User Order Success',
  });

export const getUserOrderById = (state, { response }) =>
  state.merge({ error: null, type: 'Get User Order By Id' });

export const getUserOrderByIdSuccess = (state, { response }) =>
  state.merge({
    error: null,
    orderById: response,
    type: 'Get User Order By Id Success',
  });
export const getListOrder = (state) =>
  state.merge({ loading: true, error: null, type: 'Get List Order' });

export const getListOrderSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    error: null,
    orderList: response,
    type: 'Get List Order Success',
  });
export const updateOrderStatus = (state) =>
  state.merge({ loading: true, error: null, type: 'Update Order' });

export const updateOrderStatusSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    error: null,
    orderList: response,
    type: 'Update Order Success',
  });
export const getPrice = (state) =>
  state.merge({ loading: true, price: null, error: null, type: 'Get Price' });

export const getPriceSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    error: null,
    price: response,
    type: 'Get Price Success',
  });
const reducer = makeReducerCreator(INITIAL_STATE, {
  [OrderTypes.USER_ORDER]: userOrder,
  [OrderTypes.USER_ORDER_SUCCESS]: userOrderSuccess,
  [OrderTypes.GET_USER_ORDER_BY_ID]: getUserOrderById,
  [OrderTypes.GET_USER_ORDER_BY_ID_SUCCESS]: getUserOrderByIdSuccess,
  [OrderTypes.GET_LIST_ORDER]: getListOrder,
  [OrderTypes.GET_LIST_ORDER_SUCCESS]: getListOrderSuccess,
  [OrderTypes.UPDATE_ORDER_STATUS]: updateOrderStatus,
  [OrderTypes.UPDATE_ORDER_STATUS_SUCCESS]: updateOrderStatusSuccess,
  [OrderTypes.GET_PRICE]: getPrice,
  [OrderTypes.GET_PRICE_SUCCESS]: getPriceSuccess,
});

export default reducer;
