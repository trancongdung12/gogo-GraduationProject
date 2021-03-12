import { combineReducers } from 'redux';
import app from './AppRedux/reducers';
import login from './LoginRedux/reducers';
import register from './RegisterRedux/reducers';
const rootReducer = combineReducers({
  app,
  login,
  register,
});
export default rootReducer;
