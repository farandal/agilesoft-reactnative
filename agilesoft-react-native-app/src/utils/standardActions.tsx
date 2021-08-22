/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:20:08
 * @modify date 2021-06-30 22:20:08
 * @desc @farandal React Boilerplate Framework - 2020
 */

 import { IRequestAction, IRequestPayload, IPayload } from './interfaces';
import thunkHttpRequest from './thunkHttpRequest';

 export const apiRequest =  (
   action: IRequestAction,
   payload: IRequestPayload
 ) => {

   let _obj = {
     type: action.ACTION,
     route: action,
     ...{ payload },
   }

   //return _obj
   return async (dispatch) => {
     //console.log("THUNK REQUEST",_obj);
     const response = await thunkHttpRequest(_obj);
     //console.log(response);
     dispatch(response);
   };

 };

 export const actionDispatch = (action: IRequestAction, payload?: IPayload) => {
   return ({
   type: action.ACTION,
   payload: payload,
 })};



export const setComponentState = (componentId: string, state: any) => {
  // debugger;
   return {
     type: "SET_COMPONENT_STATE",
     componentId,
     state
   };
 };

 export const unsetComponentState = (componentId: string) => ({
   type: "UNSET_COMPONENT_STATE",
   componentId
 });
