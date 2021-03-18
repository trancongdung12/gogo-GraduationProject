import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';
export const OrderTypes = makeConstantCreator(
  'USER_ORDER',
  'USER_ORDER_SUCCESS',
  'USER_ORDER_FAILURE',
);

const userOrder = (data) => makeActionCreator(OrderTypes.USER_ORDER, { data });

const userOrderSuccess = (response) =>
  makeActionCreator(OrderTypes.USER_ORDER_SUCCESS, { response });

const userOrderFailure = (error) => makeActionCreator(OrderTypes.USER_ORDER_FAILURE, { error });

export default {
  userOrder,
  userOrderSuccess,
  userOrderFailure,
};
