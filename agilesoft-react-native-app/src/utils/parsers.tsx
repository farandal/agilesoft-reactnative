import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAgileSoftActors, IAgileSoftGetAuth, IAgileSoftMovie, IAgileSoftMovieResults, IAgileSoftUser } from '../utils/interfaces';

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
    //console.log("NOW PLAYING")
    //console.log(json.data.length);
    return json;
  },
  ACUMULADOR_NOW_PLAYING: (stateResults:IAgileSoftMovie[],newResults:IAgileSoftMovie[]):IAgileSoftMovie[] => {
    //deduplicar.
    /* return stateResults.concat(newResults).filter((itemObj, index, self) =>
      index === self.findIndex((t) => (
        t.id === itemObj.id
      ))
    )*/
    /*let dedup = [
      ...new Map(results.map(item => [item.id, item])).values()
    ]
    return dedup;*/


    if(stateResults) {
      return stateResults.concat(newResults);
    } else {
      return newResults;
    }

  },
  ACUMULADOR_POPULARES: (stateResults:IAgileSoftMovie[],newResults:IAgileSoftMovie[]):IAgileSoftMovie[] => {
    /*return [...stateResults,...newResults].filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.id === thing.id
    ))
    )*/
    return [...stateResults,...newResults]
  },
  GET_POPULAR :(json: any): IAgileSoftMovieResults => {
    return json;
  },
  GET_DETAIL : (json: any): IAgileSoftActors => {
    return json;
  }
};

export default PARSERS;
