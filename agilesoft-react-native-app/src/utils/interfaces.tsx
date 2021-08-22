export interface IRequestAction {
  ACTION?: string,
  SUCCESS?: string,
  FAILURE?: string,
  PATH?: string,
  METHOD?: "POST" | "GET" | "PATCH" | "PUT" | "UPDATE" | "DELETE",
  AUTH?: boolean,
  PARSER?: (json:Object) => Object
  ERROR_PARSER?: (json:Object) => Object
}

export interface IResponseAction {
  type: string,
  json?: any,
  message?: string
  toState?: any
  [key: string]: any
}

export interface IActions {
  [key: string]: IRequestAction;
}

export interface IRequestPayload {
  body?: object;
  params?: object;
  query?:object;
  config?: object;
}

export interface IPayload {
  [key:string]: any;
}

export type IComponentsState = {
  [componentId: string]: any
}

export type IState = {
  action?: IResponseAction
  loading?: boolean
  user?: IAgileSoftUser
  componentsState?: IComponentsState;
}

export const InitialState:IState = {
  loading: true,
  action: {
    type: "FIRST_LOAD"
  }
}

export interface IAgileSoftUser {
   email:string, firstName: string, lastName: string
}

export interface IAgileSoftGetAuth {
  user: IAgileSoftUser
  payload: {type:string,token:string,refreshToken:string}
}
