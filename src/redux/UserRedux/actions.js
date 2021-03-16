import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';

export const UserTypes = makeConstantCreator(
  'USER_INFO',
  'USER_INFO_SUCCESS',
  'USER_EDIT',
  'USER_EDIT_SUCCESS',
  'USER_CHANGE_PASSWORD',
  'USER_CHANGE_PASSWORD_SUCCESS',
  'USER_CHANGE_PASSWORD_FAILURE',
  'USER_UPDATE_PROFILE',
  'USER_UPDATE_PROFILE_SUCCESS',
  'USER_UPDATE_PROFILE_FAILURE',
);

// users get infomation
const userInfo = (id) => makeActionCreator(UserTypes.USER_INFO, { id });
const userInfoSuccess = (response) => makeActionCreator(UserTypes.USER_INFO_SUCCESS, { response });
const userEdit = (data) => makeActionCreator(UserTypes.USER_EDIT, { data });
const userEditSuccess = (response) => makeActionCreator(UserTypes.USER_EDIT_SUCCESS, { response });

// user change password
const userChangePassword = (data) => makeActionCreator(UserTypes.USER_CHANGE_PASSWORD, { data });
const userChangePasswordSuccess = (response) =>
  makeActionCreator(UserTypes.USER_CHANGE_PASSWORD_SUCCESS, { response });
const userChangePasswordFailure = (error) =>
  makeActionCreator(UserTypes.USER_CHANGE_PASSWORD_FAILURE, { error });

// user update profile
const userUpdateProfile = (data) => makeActionCreator(UserTypes.USER_UPDATE_PROFILE, { data });
const userUpdateProfileSuccess = (response) =>
  makeActionCreator(UserTypes.USER_UPDATE_PROFILE_SUCCESS, { response });
const userUpdateProfileFailure = (error) =>
  makeActionCreator(UserTypes.USER_UPDATE_PROFILE_FAILURE, { error });
export default {
  userInfo,
  userInfoSuccess,
  userChangePassword,
  userChangePasswordSuccess,
  userEdit,
  userEditSuccess,
  userChangePasswordFailure,
  userUpdateProfile,
  userUpdateProfileSuccess,
  userUpdateProfileFailure,
};
