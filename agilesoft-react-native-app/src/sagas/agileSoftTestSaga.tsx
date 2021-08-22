/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:20:48
 * @modify date 2021-06-30 22:20:48
 * @desc @farandal React Boilerplate Framework - 2020
 */

 import { takeEvery, takeLatest } from 'redux-saga/effects';
 import ACTIONS from '../utils/actions';
 import requestWorker from './../utils/requestWorker';

 export default [
   function* LOGIN() {
     yield takeLatest(ACTIONS.USER_LOGIN.ACTION, requestWorker);
   },
 ];

