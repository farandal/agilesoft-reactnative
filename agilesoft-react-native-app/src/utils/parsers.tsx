import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAgileSoftActors, IAgileSoftGetAuth, IAgileSoftMovieResults, IAgileSoftUser } from '../utils/interfaces';

const PARSERS = {
  DEFAULT_ERROR_PARSING:  (json: any) => {
    return json;
  },
  LOGIN_SUCCESS:  (json: any): IAgileSoftGetAuth => {
    let auth_response: IAgileSoftGetAuth = json.data;
    return auth_response;
  },
  GET_ME:  (json: any): IAgileSoftUser => {
    return json.data;
  },
  GET_NOW_PLAYING: (json: any): IAgileSoftMovieResults => {
    console.log("NOW PLAYING")
    console.log(json.data.length);
    return json;
  },
  GET_POPULAR :(json: any): IAgileSoftMovieResults => {
    return json;
  },
  GET_DETAIL : (json: any): IAgileSoftActors => {
    return json;
  }
};

export default PARSERS;
