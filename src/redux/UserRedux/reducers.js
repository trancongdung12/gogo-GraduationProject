import Immutable from 'seamless-immutable';
import { UserTypes } from './actions';
import { makeReducerCreator } from '../../utils/Utils';

export const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
  dataChangePass: null,
  dataUpdateProfile: null,
  errorUpdateProfile: null,
});
const userInfo = (state) =>
  state.merge({
    loading: true,
  });

const userInfoSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    data: response,
  });

const userEditSuccess = (state, { response }) =>
  state.merge({
    data: response,
  });

// reducer user change password
const userChangePassword = (state) => state.merge({ loading: true });
const userChangePasswordSuccess = (state, { response }) =>
  state.merge({ loading: false, dataChangePass: response });
const userChangePasswordFailure = (state, { error }) =>
  state.merge({ error: error, loading: false });

// user update profile
const userUpdateProfile = (state) => state.merge({ loading: true });
const userUpdayeProfileSuccess = (state, { response }) =>
  state.merge({ loading: false, errorUpdateProfile: null, dataUpdateProfile: response });
const userUpdateProfileFailure = (state, { error }) =>
  state.merge({ loading: false, dataUpdateProfile: null, errorUpdateProfile: error });
const ACTION_HANDLERS = {
  [UserTypes.USER_INFO]: userInfo,
  [UserTypes.USER_INFO_SUCCESS]: userInfoSuccess,
  [UserTypes.USER_EDIT_SUCCESS]: userEditSuccess,
  [UserTypes.USER_CHANGE_PASSWORD]: userChangePassword,
  [UserTypes.USER_CHANGE_PASSWORD_SUCCESS]: userChangePasswordSuccess,
  [UserTypes.USER_CHANGE_PASSWORD_FAILURE]: userChangePasswordFailure,
  [UserTypes.USER_UPDATE_PROFILE]: userUpdateProfile,
  [UserTypes.USER_UPDATE_PROFILE_SUCCESS]: userUpdayeProfileSuccess,
  [UserTypes.USER_UPDATE_PROFILE_FAILURE]: userUpdateProfileFailure,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
