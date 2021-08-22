/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:21:02
 * @modify date 2021-06-30 22:21:02
 * @desc @farandal React Boilerplate Framework - 2020
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const appendAuthToken: any = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
    const headerObj:any = {};
    if (token) {
      console.log("APPENDING TOKEN",token);
      headerObj['Authorization'] = `Bearer ${token}`;
    }
    return headerObj;
};
export default appendAuthToken;
