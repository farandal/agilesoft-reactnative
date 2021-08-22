import { createAsyncAction } from "typesafe-actions";
import { IActions, IRequestAction, IRequestPayload } from "./interfaces";
import PARSERS from "./parsers";

const ACTIONS:IActions = {
  SET_LOADING : {
    ACTION: 'SET_LOADING',
    SUCCESS: 'SET_LOADING_SUCCESS',
    FAILURE: 'SET_LOADING_FAILURE'
  },
  DEFAULT: {
    ACTION: 'DEFAULT',
    SUCCESS: 'DEFAULT_SUCCESS',
    FAILURE: 'DEFAULT_FAILURE'
  },
  USER_LOGIN: {
    ACTION: 'USER_LOGIN_REQUEST',
    SUCCESS: 'USER_LOGIN_SUCCESS',
    FAILURE: 'USER_LOGIN_FAILURE',
    PATH: "/auth/login",
    METHOD: "POST",
    AUTH: false,
    PARSER: PARSERS.LOGIN_SUCCESS
  },
  USER_LOGOUT: {
    ACTION: 'USER_LOGOUT',
    SUCCESS: 'USER_LOGOUT_SUCCESS',
    FAILURE: 'USER_LOGOUT_FAILURE',
  },
};

export default ACTIONS;
