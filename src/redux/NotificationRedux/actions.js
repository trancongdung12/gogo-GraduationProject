import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const NotiTypes = makeConstantCreator(
  'GET_NOTI_BY_ID',
  'GET_NOTI_BY_ID_SUCCESS',
  'COUNT_NOTI_BY_ID',
  'COUNT_NOTI_BY_ID_SUCCESS',
);

const getNotiById = (onSuccess) => makeActionCreator(NotiTypes.GET_NOTI_BY_ID, { onSuccess });

const getNotiByIdSuccess = (response) =>
  makeActionCreator(NotiTypes.GET_NOTI_BY_ID_SUCCESS, { response });
const countNotiById = () => makeActionCreator(NotiTypes.COUNT_NOTI_BY_ID);
const countNotiByIdSuccess = (response) =>
  makeActionCreator(NotiTypes.COUNT_NOTI_BY_ID_SUCCESS, { response });
export default {
  getNotiById,
  getNotiByIdSuccess,
  countNotiById,
  countNotiByIdSuccess,
};
