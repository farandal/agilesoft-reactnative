import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAgileSoftGetAuth } from '../utils/interfaces';

const PARSERS = {
  DEFAULT_ERROR_PARSING:  (json: any) => {
    return json;
  },
  LOGIN_SUCCESS:  (json: any): IAgileSoftGetAuth => {
    let auth_response: IAgileSoftGetAuth = json.data;
    return auth_response;
  }
};

export default PARSERS;
