import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/Utils';
import { OrderTypes } from './actions';

export const INITIAL_STATE = Immutable({
  loading: false,
  response: null,
  error: null,
  type: '',
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

export const userLogout = (state) =>
  state.merge({
    token: null,
    response: null,
  });

const reducer = makeReducerCreator(INITIAL_STATE, {
  [OrderTypes.USER_ORDER]: userOrder,
  [OrderTypes.USER_ORDER_SUCCESS]: userOrderSuccess,
  [OrderTypes.USER_ORDER_FAILURE]: userOrderFailure,
});

export default reducer;
