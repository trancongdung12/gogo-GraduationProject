import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/Utils';
import { LoginTypes } from './actions';

export const INITIAL_STATE = Immutable({
  loading: false,
  response: null,
  errorLogin: null,
  token: null,
  type: '',
});

export const userLogin = (state, { response }) =>
  state.merge({ loading: true, errorLogin: null, type: 'User Login' });

export const userLoginSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    errorLogin: null,
    token: response,
    type: 'User login success',
  });

export const userLoginFailure = (state, { error }) =>
  state.merge({
    loading: false,
    errorLogin: error,
    type: 'User login failure',
  });

export const userLogout = (state) =>
  state.merge({
    token: null,
    response: null,
  });

const reducer = makeReducerCreator(INITIAL_STATE, {
  [LoginTypes.USER_LOGIN]: userLogin,
  [LoginTypes.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [LoginTypes.USER_LOGIN_FAILURE]: userLoginFailure,
  [LoginTypes.USER_LOGOUT]: userLogout,
});

export default reducer;
