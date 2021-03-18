import { combineReducers } from 'redux';
import app from './AppRedux/reducers';
import login from './LoginRedux/reducers';
import register from './RegisterRedux/reducers';
import user from './UserRedux/reducers';
import order from './OrderRedux/reducers';
const rootReducer = combineReducers({
  app,
  login,
  register,
  user,
  order,
});
export default rootReducer;
