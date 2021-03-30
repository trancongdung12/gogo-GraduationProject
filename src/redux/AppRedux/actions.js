import { makeActionCreator, makeConstantCreator } from '../../utils/Utils';

export const AppTypes = makeConstantCreator(
  'START_APP',
  'MAKE_SKIP_INTRO',
  'GO_TO_INTRO',
  'GET_LIST_TRUCK',
  'GET_LIST_TRUCK_SUCCESS',
);

export const userStartApp = () => makeActionCreator(AppTypes.START_APP);

export const goToIntro = () => makeActionCreator(AppTypes.GO_TO_INTRO);

export const makeSkipIntro = () => makeActionCreator(AppTypes.MAKE_SKIP_INTRO);

export const getListTruck = () => makeActionCreator(AppTypes.GET_LIST_TRUCK);

export const getListTruckSuccess = (response) =>
  makeActionCreator(AppTypes.GET_LIST_TRUCK_SUCCESS, { response });
