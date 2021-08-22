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
  NAVIGATION: {
    ACTION: 'NAVIGATION',
    SUCCESS: 'NAVIGATION_SUCCESS',
    FAILURE: 'NAVIGATION_FAILURE'
  },
  USER_LOGIN: {
    ACTION: 'USER_LOGIN',
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
  GET_REFRESH_TOKEN: {
    ACTION: 'GET_REFRESH_TOKEN',
    SUCCESS: 'GET_REFRESH_TOKEN_SUCCESS',
    FAILURE: 'GET_REFRESH_TOKEN_FAILURE',
    PATH: "/auth/refresh",
    METHOD: "POST",
    AUTH: true
   // PARSER: PARSERS.GET_ME
  },
  GET_ME: {
    ACTION: 'GET_ME',
    SUCCESS: 'GET_ME_SUCCESS',
    FAILURE: 'GET_ME_FAILURE',
    PATH: "/user/me",
    METHOD: "GET",
    AUTH: true,
    PARSER: PARSERS.GET_ME
  },
  GET_NOW_PLAYING : {
    ACTION: 'GET_NOW_PLAYING',
    SUCCESS: 'GET_NOW_PLAYING_SUCCESS',
    FAILURE: 'GET_NOW_PLAYING_FAILURE',
    PATH: "/movies/now_playing",
    METHOD: "GET",
    AUTH: true,
    PARSER: PARSERS.GET_NOW_PLAYING
  },
  GET_POPULAR : {
    ACTION: 'GET_POPULAR',
    SUCCESS: 'GET_POPULAR_SUCCESS',
    FAILURE: 'GET_POPULAR_FAILURE',
    PATH: "/movies/popular",
    METHOD: "GET",
    AUTH: true,
    PARSER: PARSERS.GET_POPULAR
  },
  GET_DETAIL : {
    ACTION: 'GET_DETAIL',
    SUCCESS: 'GET_DETAIL_SUCCESS',
    FAILURE: 'GET_DETAIL_FAILURE',
    PATH: "/movies/:id/actors",
    METHOD: "GET",
    AUTH: true,
    PARSER: PARSERS.GET_DETAIL
  },
  CLEAN_CACHE : {
    ACTION: 'CLEAN_CACHE'
  }

};

export default ACTIONS;
