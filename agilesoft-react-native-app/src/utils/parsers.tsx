import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAgileSoftGetAuth } from '../utils/interfaces';

const PARSERS = {
  DEFAULT_ERROR_PARSING:  (json: any) => {
    return json;
  },
  LOGIN_SUCCESS:  (json: any): IAgileSoftGetAuth => {
    let auth_response: IAgileSoftGetAuth = json.data;
    return auth_response;
  },
  GET_ME:  (json: any): any => {
    return json.data;
  },
  GET_NOW_PLAYING: (json: any): any => {
    return json.data;
  },
  GET_POPULAR :(json: any): any => {
    return json.data;
  },
  GET_DETAIL : (json: any): any => {
    return json.data;
  }
};

export default PARSERS;
