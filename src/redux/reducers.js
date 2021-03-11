import { combineReducers } from 'redux';
import app from './AppRedux/reducers';
import login from './AuthRedux/reducers';
const rootReducer = combineReducers({
  app,
  login,
});
export default rootReducer;
