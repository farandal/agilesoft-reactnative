/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:20:26
 * @modify date 2021-06-30 22:20:26
 * @desc @farandal React Boilerplate Framework - 2020
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import ACTIONS from './actions';
import { InitialState, IResponseAction, IState } from './interfaces';
import PARSERS from './parsers';

const reducer = (state: IState = InitialState, action: IResponseAction) => {

  if(action.json && action.json.error && action.json.statusCode === 401) {
    //console.log("EXPIRED");
    return {
      ...state,
      authCheck: "expired",
      //auth: null,
      //user: null
    };
  }

  //Acumuladores


  if (action && action.type) {
    let _type = action.type;
    let _ACTION = _type.substring(0, _type.lastIndexOf('_'));
    if (ACTIONS[_ACTION]) {
      //console.log( `Lookign for parser for ${_ACTION} If action is Success or Failed`);
      switch (action.type) {
        case ACTIONS[_ACTION].FAILURE:
          if (ACTIONS[_ACTION].ERROR_PARSER) {
            //console.log(`PARSER FOUND FOR ACTION:  ${_ACTION} on ${action.type}`);
            if (action.json) {
              action.json = ACTIONS[_ACTION].ERROR_PARSER(action.json);
            }
          } else {
            //console.log( `NO PARSER FOUND FOR ACTION:  ${_ACTION} on ${action.type}` );
            action.json = PARSERS.DEFAULT_ERROR_PARSING;
          }
          break;
        case ACTIONS[_ACTION].SUCCESS:
          //console.log(`Success Action for ${_ACTION}`);
          if (ACTIONS[_ACTION].PARSER) {
            //console.log( `PARSER FOUND FOR ACTION: ${_ACTION} on ${action.type}` );
            if (action.json) {
              action.json = ACTIONS[_ACTION].PARSER(action.json);
            }
          } else {
            //console.log( `NO PARSER FOUND FOR ACTION:  ${_ACTION} on ${action.type}`  );
          }
          break;
      }
      //console.log(`SETTING STATE KEY ${[ACTIONS[_ACTION].ACTION]}`)
      state = { ...state, ...{ [ACTIONS[_ACTION].ACTION]: action.json } };
    }
  }



  switch (action.type) {

    case ACTIONS.CLEAN_CACHE.ACTION:
      return {
        ...state,
        GET_NOW_PLAYING: [],
        NOW_PLAYING_ACC: [],
        POPULAR_ACC: [],
        GET_POPULAR: []
      }

    case ACTIONS.GET_NOW_PLAYING.SUCCESS:
      return {
        ...state,
        NOW_PLAYING_ACC: PARSERS.ACUMULADOR_NOW_PLAYING(state["NOW_PLAYING_ACC"],action.json.data)
      }

    case ACTIONS.GET_POPULAR.SUCCESS:

        return {
          ...state,
          POPULAR_ACC: PARSERS.ACUMULADOR_POPULARES(state["POPULAR_ACC"],action.json.data)
        }


    case 'SET_COMPONENT_STATE':
      return {
        ...state,
        componentsState: {
          ...state.componentsState,
          [action.componentId]: action.state,
        },
      };
    case 'UNSET_COMPONENT_STATE':
      let componentStates = state.componentsState;
      delete componentStates[action.componentId];
      return {
        ...state,
        componentStates,
      };

    case ACTIONS.GET_ME.ACTION:

      return {
        ...state,
        authCheck:"checking"

      };
    case ACTIONS.GET_REFRESH_TOKEN.SUCCESS:
        console.log("REFRESH TOKEN SUCCESS", action);
        return {
          ...state,
          authCheck:"success",
        };
    case ACTIONS.GET_REFRESH_TOKEN.FAILURE:
      return {
        ...state,
        authCheck:"expired",
        user:null,
        token: null
      };

    case ACTIONS.GET_ME.SUCCESS:
        return {
          ...state,
          authCheck:"success",
        };
    case ACTIONS.GET_ME.FAILURE:
          return {
            ...state,
            authCheck:"expired",
            token: null,
            user: null
          };

    case ACTIONS.USER_LOGIN.ACTION:

      return {
        ...state,
        loading: true,
      };

    case ACTIONS.USER_LOGIN.SUCCESS:

        AsyncStorage.setItem('token',action.json.payload.token);
        return {
          ...state,
          user: action.json.user,
          token: action.json.payload.token,
          auth: action.json,
          loading: false,
          action,
          authCheck:"success",
        };

    case ACTIONS.USER_LOGIN.FAILURE:
    case ACTIONS.USER_LOGOUT.ACTION:
      console.log("LOGOUT");
    //case ACTIONS.GET_ME.FAILURE:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        user: null,
        loading: false,
        action,
      };
      case ACTIONS.NAVIGATION.ACTION:
        return {
          ...state,
          currentNav: action.payload
        };
    case ACTIONS.DEFAULT.ACTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
        action,
      };
  }
};

export default reducer;
