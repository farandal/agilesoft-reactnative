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
  auth?: IAgileSoftGetAuth
  componentsState?: IComponentsState;
  currentNav?: any;
  authCheck?:"success" | "checking" | "expired"
}

export const InitialState:IState = {
  loading: true,
  action: {
    type: "FIRST_LOAD"
  },
  authCheck:"checking"
}

export interface IAgileSoftUser {
   email:string, firstName: string, lastName: string
}

export interface IAgileSoftGetAuth {
  user: IAgileSoftUser
  payload: {type:string,token:string,refreshToken:string}
}

export interface IAgileSoftMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IAgileSoftMovieResults {
  imageBaseUrl: string;
  data: IAgileSoftMovie[];
}

export interface IAgileSoftActor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface IAgileSoftActors {
  imageBaseUrl: string;
  data: IAgileSoftActor[];
}

export interface IAgileSoftUser {
    id: number;
    username: string;
    password?: any;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
}
