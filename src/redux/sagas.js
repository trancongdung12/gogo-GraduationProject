import { all } from 'redux-saga/effects';
import appSaga from './AppRedux/sagas';
import loginSaga from './LoginRedux/sagas';
import registerSaga from './RegisterRedux/sagas';
import userSage from './UserRedux/sagas';
import orderSage from './OrderRedux/sagas';
export default function* root() {
  yield all([...appSaga, ...loginSaga, ...registerSaga, ...userSage, ...orderSage]);
}
