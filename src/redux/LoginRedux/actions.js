import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const LoginTypes = makeConstantCreator(
  'USER_LOGIN',
  'USER_LOGIN_SUCCESS',
  'USER_LOGIN_FAILURE',
  'USER_LOGOUT',
);

const userLogin = (data) => makeActionCreator(LoginTypes.USER_LOGIN, { data });

const userLoginSuccess = (response) =>
  makeActionCreator(LoginTypes.USER_LOGIN_SUCCESS, { response });

const userLoginFailure = (error) => makeActionCreator(LoginTypes.USER_LOGIN_FAILURE, { error });

const userLogout = (token, onSuccess) => makeActionCreator(LoginTypes.USER_LOGOUT, { token, onSuccess });
export default {
  userLogin,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
};
