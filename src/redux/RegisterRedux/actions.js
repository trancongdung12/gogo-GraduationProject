import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const RegisterTypes = makeConstantCreator(
  'USER_SIGNUP_SAVE_PHONE',
  'USER_SIGNUP',
  'USER_SIGNUP_SUCCESS',
  'USER_SIGNUP_FAILURE',
);

const userSignUpSavePhone = (data) =>
  makeActionCreator(RegisterTypes.USER_SIGNUP_SAVE_PHONE, { data });

const userSignUp = (data) => makeActionCreator(RegisterTypes.USER_SIGNUP, { data });

const userSignUpSuccess = (response) =>
  makeActionCreator(RegisterTypes.USER_SIGNUP_SUCCESS, { response });

const userSignUpFailure = (error) =>
  makeActionCreator(RegisterTypes.USER_SIGNUP_FAILURE, { error });

export default {
  userSignUp,
  userSignUpSuccess,
  userSignUpFailure,
  userSignUpSavePhone,
};
