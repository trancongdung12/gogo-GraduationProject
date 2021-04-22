import Immutable from 'seamless-immutable';
import { UserTypes } from './actions';
import { makeReducerCreator } from '../../utils/Utils';

export const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
  chat: null,
});

const userInfoSuccess = (state, { response }) =>
  state.merge({
    loading: false,
    data: response,
  });
const userChangeAvatar = (state) =>
  state.merge({
    loading: true,
  });
const userChangeAvatarSuccess = (state, { response }) =>
  state.merge({
    data: response,
  });
const userChatList = (state) =>
  state.merge({
    loading: true,
  });
const userChatListSuccess = (state, { response }) =>
  state.merge({
    chat: response,
  });

const ACTION_HANDLERS = {
  [UserTypes.USER_INFO_SUCCESS]: userInfoSuccess,
  [UserTypes.USER_CHANGE_AVATAR]: userChangeAvatar,
  [UserTypes.USER_CHANGE_AVATAR_SUCCESS]: userChangeAvatarSuccess,
  [UserTypes.USER_LIST_CHAT]: userChatList,
  [UserTypes.USER_LIST_CHAT_SUCCESS]: userChatListSuccess,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
