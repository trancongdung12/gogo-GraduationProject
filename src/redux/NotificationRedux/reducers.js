import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/Utils';
import { NotiTypes } from './actions';

export const INITIAL_STATE = Immutable({
  loading: false,
  error: null,
  type: '',
  data: null,
  count: null,
});

export const getNotiById = (state, { response }) => state.merge({ error: null });

export const getNotiByIdSuccess = (state, { response }) =>
  state.merge({
    error: null,
    data: response,
  });
export const countNotiByIdSuccess = (state, { response }) =>
  state.merge({
    error: null,
    count: response,
  });

const reducer = makeReducerCreator(INITIAL_STATE, {
  [NotiTypes.GET_NOTI_BY_ID]: getNotiById,
  [NotiTypes.GET_NOTI_BY_ID_SUCCESS]: getNotiByIdSuccess,
  [NotiTypes.COUNT_NOTI_BY_ID_SUCCESS]: countNotiByIdSuccess,
});

export default reducer;
