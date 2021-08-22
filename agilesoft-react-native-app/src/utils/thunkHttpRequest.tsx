/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:21:23
 * @modify date 2021-06-30 22:21:23
 * @desc @farandal React Boilerplate Framework - 2020
 */

 import HttpRequester from '../utils/HttpRequester';
 import { Config } from '../config';
 import { IRequestPayload } from './interfaces';
 import qs from "qs";

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


 const thunkHttpRequest = async (action: any) => {

   let Api = new HttpRequester();

   const url = Config.API_URL;
   let payload:IRequestPayload = action && action.payload ?  action.payload : {}
   let config: any = {};

   let queryString = "";
   if(payload && payload.query) {
     queryString = "?"+qs.stringify(payload.query, { encode: false });
   }

   try {
     let response: any = null;


     switch (action.route.METHOD) {
       case 'GET':
        try {
         response = await
           Api.sendGetRequest(
           payload && payload.params
             ? replacePathParams(action.route.PATH, payload.params) + queryString
             : action.route.PATH + queryString,
           payload && payload.config
             ? payload.config
             : config,
           url,
           action.route.AUTH
         );
           } catch(error:any) {
             response = error.response;

           }

         break;
       case 'POST':
         console.log(`POST THUNK REQUEST`)
         //console.log(payload.body);
         try {
         response = await
           Api.sendPostRequest(
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
       } catch(error:any) {
         response = error.response;

       }

         break;

       case 'DELETE':
         try {
         response = await
           Api.sendDeleteRequest(
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
       } catch(error:any) {
         response = error.response;

       }
         break;

       case 'PUT':
         try {
         //console.log(payload.body);
         response = await
           Api.sendPutRequest(
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
       } catch(error:any) {
         response = error.response;

       }
         break;
       case 'PATCH':
         try {
         //console.log(payload.body);
         response = await
           Api.sendPatchRequest(
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
       } catch(error:any) {
         response = error.response;

       }
         break;
     }

     //console.log("THUNK REQUEST POST RESPONSE ",response.status,response.data)
     if (response.status >= 200 && response.status <= 299) {

       return {
         type: action.route.SUCCESS,
         json: response.data,
         message: 'success',
       };
     } else {
       //console.log("FAILURE RESPONSE")
       let _object =  {type: action.route.FAILURE,
       json: response && response.data ? response.data : {},
       message: response && response.data && response.data.message
           ? response.data.message
           : ( response.data && response.data.error
             ? response.data.error : 'no-error-message')};
             //console.log(_object);
       return _object;
     }
   } catch (e:any) {
    return { type: action.route.FAILURE, json: e, message: e.message };
   }

 }


 export default thunkHttpRequest;
