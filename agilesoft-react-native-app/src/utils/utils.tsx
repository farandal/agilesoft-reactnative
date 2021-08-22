import { IRequestAction, IResponseAction } from "./interfaces";

export const ignoreDispatchedActions = (actions:IRequestAction[],receivedActionTypeUpdate:IResponseAction) => {
  let actionTypesStr:string[] = []
  actions.forEach((action:IRequestAction) => {
     if(action && action.ACTION) actionTypesStr.push(action.ACTION);
     if(action && action.FAILURE) actionTypesStr.push(action.FAILURE);
     if(action && action.SUCCESS) actionTypesStr.push(action.SUCCESS);
  })
  return receivedActionTypeUpdate && receivedActionTypeUpdate.type && actionTypesStr.includes(receivedActionTypeUpdate.type)
}
