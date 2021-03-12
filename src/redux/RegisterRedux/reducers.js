import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/Utils';
import { RegisterTypes } from './actions';

export const INITIAL_STATE = Immutable({
  loading: false,
  response: null,
  errorSignUp: null,
  token: null,
  phone: null,
  type: '',
});
export const userSignUpSavePhone = (state, { data }) =>
  state.merge({ phone: data, type: 'Sign up save phone' });
export const userSignUp = (state, { response }) =>
  state.merge({ loading: true, errorSignUp: null, type: 'Sign up' });

export const userSignUpSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    errorSignUp: null,
    type: 'Sign up success',
  });
export const userSignUpFailure = (state, { error }) =>
  state.merge({
    loading: false,
    errorSignUp: error,
    type: 'failure',
  });

const reducer = makeReducerCreator(INITIAL_STATE, {
  [RegisterTypes.USER_SIGNUP]: userSignUp,
  [RegisterTypes.USER_SIGNUP_SUCCESS]: userSignUpSuccess,
  [RegisterTypes.USER_SIGNUP_FAILURE]: userSignUpFailure,
  [RegisterTypes.USER_SIGNUP_SAVE_PHONE]: userSignUpSavePhone,
});

export default reducer;
