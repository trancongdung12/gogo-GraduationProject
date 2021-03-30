import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/Utils';
import { AppTypes } from './actions';

export const INITIAL_STATE = Immutable({
  loadingApp: true,
  AppTypes: '',
  truck: null,
});

export const userStartApp = (state, { response }) =>
  state.merge({ loadingApp: false, AppTypes: 'Start App' });
export const getListTruckSuccess = (state, { response }) =>
  state.merge({ loadingApp: false, truck: response, AppTypes: 'Get List Truck' });
const reducer = makeReducerCreator(INITIAL_STATE, {
  [AppTypes.START_APP]: userStartApp,
  [AppTypes.GET_LIST_TRUCK_SUCCESS]: getListTruckSuccess,
});

export default reducer;
