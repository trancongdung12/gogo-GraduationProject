import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';

export const UserTypes = makeConstantCreator(
  'USER_INFO',
  'USER_INFO_SUCCESS',
  'USER_CHANGE_AVATAR',
  'USER_CHANGE_AVATAR_SUCCESS',
);

const userInfo = (id, onSuccess) => makeActionCreator(UserTypes.USER_INFO, { id, onSuccess });
const userInfoSuccess = (response) => makeActionCreator(UserTypes.USER_INFO_SUCCESS, { response });
const userChangeAvatar = (id, data) =>
  makeActionCreator(UserTypes.USER_CHANGE_AVATAR, { id, data });
const userChangeAvatarSuccess = (response) =>
  makeActionCreator(UserTypes.USER_CHANGE_AVATAR_SUCCESS, { response });

export default {
  userInfo,
  userInfoSuccess,
  userChangeAvatar,
  userChangeAvatarSuccess,
};
