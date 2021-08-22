/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:21:23
 * @modify date 2021-06-30 22:21:23
 * @desc @farandal React Boilerplate Framework - 2020
 */

 import HttpRequester from './HttpRequester';

 import { call, put } from 'redux-saga/effects';
 import {IRequestPayload } from './interfaces';
 import qs from "qs";
 import { Config } from '../config';

 export const replacePathParams = (path: string, params: any) => {
   return path
     .split('/')
     .map((param) => {
       return param.charAt(0) === ':'
         ? params[param.substring(1)]
           ? params[param.substring(1)]
           : param
         : param;
     })
     .join('/');
 };

 export default function* httpRequest(action: any) {
   let Api = new HttpRequester();

   const url = Config.API_URL;
   let payload:IRequestPayload = action && action.payload ?  action.payload : {}
   let config: any = {};

   console.log("HTTPREQUESTER Ha capturado el request");
   console.log(action);

   let queryString = "";
   if(payload && payload.query) {
     queryString = "?"+qs.stringify(payload.query, { encode: false });
   }

   try {
     let response: any = null;
     switch (action.route.METHOD) {
       case 'GET':

         response = yield call(
           Api.sendGetRequest,
           payload && payload.params
             ? replacePathParams(action.route.PATH, payload.params) + queryString
             : action.route.PATH + queryString,
           payload && payload.config
             ? payload.config
             : config,
           url,
           action.route.AUTH
         );


         break;
       case 'POST':
         console.log("POST");
         response = yield call(
           Api.sendPostRequest,
           payload && payload.params
             ? replacePathParams(
                 action.route.PATH,
                 payload && payload.params
                   ? payload.params
                   : null
               )  + queryString
             : action.route.PATH + queryString,
           payload && payload.body ? payload.body : {},
           payload && payload.config
             ? payload.config
             : config,
           url,
           action.route.AUTH
         );
         break;

       case 'DELETE':
         response = yield call(
           Api.sendDeleteRequest,
           payload && payload.params
             ? replacePathParams(
                 action.route.PATH,
                 payload && payload.params
                   ? payload.params
                   : null
               ) + queryString
             : action.route.PATH + queryString,
           payload && payload.config
             ? payload.config
             : config,
           url,
           action.route.AUTH
         );
         break;

       case 'PUT':

         response = yield call(
           Api.sendPutRequest,
           payload && payload.params
             ? replacePathParams(
                 action.route.PATH,
                 payload && payload.params
                   ? payload.params
                   : null
               )  + queryString
             : action.route.PATH + queryString,
           payload && payload.body ? payload.body : {},
           payload && payload.config
             ? payload.config
             : config,
           url,
           action.route.AUTH
         );
         break;
       case 'PATCH':

         response = yield call(
           Api.sendPatchRequest,
           payload && payload.params
             ? replacePathParams(
                 action.route.PATH,
                 payload && payload.params
                   ? payload.params
                   : null
               )  + queryString
             : action.route.PATH + queryString,
           payload && payload.body ? payload.body : {},
           payload && payload.config
             ? payload.config
             : config,
           url,
           action.route.AUTH
         );
         break;
     }
     console.log(response);
     if (response.status === 200) {
       console.log("response 200",response.data);
       yield put({
         type: action.route.SUCCESS,
         json: response.data,
         message: 'success',
       });
     } else {
      console.log("response errored",response.data);
       yield put({
         type: action.route.FAILURE,
         json: response.response && response.response.data ? response.response.data : {},
         message:
         response.response && response.response.data
             ? response.response.data.message
             : 'no-error-message',
       });
     }
   } catch (e:any) {
     yield put({ type: action.route.FAILURE, json: e, message: e.message });
   }

 }
