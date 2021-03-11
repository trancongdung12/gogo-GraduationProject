import { all } from 'redux-saga/effects';
import appSaga from './AppRedux/sagas';
import loginSaga from './AuthRedux/sagas';
export default function* root() {
  yield all([...appSaga, ...loginSaga]);
}
