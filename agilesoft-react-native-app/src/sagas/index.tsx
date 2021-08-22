import {all,call} from 'redux-saga/effects';
//import users from './usersSagas';
import agileSoftTestSaga from './agileSoftTestSaga';

export default function* root() {
  yield all([
   // ...authSagas.map( saga => { return call(saga) } ),
   // ...userSagas.map( saga => { return call(saga) } ),
    ...agileSoftTestSaga.map( saga => { return call(saga) } ),
  ]);

}
