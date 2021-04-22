import { takeLatest, put, call } from 'redux-saga/effects';
import userActions, { UserTypes } from './actions';
import { userProfile, userChangeAvatar, getListChat } from '../../api/users';
export function* userInfoSaga({ id, onSuccess }) {
  try {
    const response = yield userProfile(id);
    console.log(response);
    yield put(userActions.userInfoSuccess(response.data.user));
    onSuccess && onSuccess();
  } catch (error) {
    console.log(error);
  }
}
export function* userChangeAvatarSaga({ id, data }) {
  try {
    const response = yield call(userChangeAvatar, id, data);
    console.log(response);
    yield put(userActions.userChangeAvatarSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}
export function* userListChatSaga({ id }) {
  try {
    const response = yield call(getListChat, id);
    console.log(response);
    yield put(userActions.userChatListSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}
const userSagas = () => {
  return [
    takeLatest(UserTypes.USER_INFO, userInfoSaga),
    takeLatest(UserTypes.USER_CHANGE_AVATAR, userChangeAvatarSaga),
    takeLatest(UserTypes.USER_LIST_CHAT, userListChatSaga),
  ];
};

export default userSagas();
