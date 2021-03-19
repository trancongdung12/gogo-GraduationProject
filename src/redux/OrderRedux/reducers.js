import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/Utils';
import { OrderTypes } from './actions';

export const INITIAL_STATE = Immutable({
  loading: false,
  orderById: null,
  error: null,
  type: '',
  data: null,
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

export const userOrderFailure = (state, { error }) =>
  state.merge({
    loading: false,
    error: error,
    type: 'User Order Failure',
  });

export const getUserOrderById = (state, { response }) =>
  state.merge({ loading: true, error: null, type: 'Get User Order By Id' });

export const getUserOrderByIdSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    error: null,
    orderById: response,
    type: 'Get User Order By Id Success',
  });

export const getUserOrderByIdFailure = (state, { error }) =>
  state.merge({
    loading: false,
    error: error,
    type: 'Get User Order By Id Failure',
  });
const reducer = makeReducerCreator(INITIAL_STATE, {
  [OrderTypes.USER_ORDER]: userOrder,
  [OrderTypes.USER_ORDER_SUCCESS]: userOrderSuccess,
  [OrderTypes.USER_ORDER_FAILURE]: userOrderFailure,
  [OrderTypes.GET_USER_ORDER_BY_ID]: getUserOrderById,
  [OrderTypes.GET_USER_ORDER_BY_ID_SUCCESS]: getUserOrderByIdSuccess,
  [OrderTypes.GET_USER_ORDER_BY_ID_FAILURE]: getUserOrderByIdFailure,
});

export default reducer;
