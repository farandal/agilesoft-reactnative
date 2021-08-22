/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:21:15
 * @modify date 2021-06-30 22:21:15
 * @desc @farandal React Boilerplate Framework - 2020
 */

import axios, { AxiosResponse } from 'axios';
import qs from 'query-string';
import HttpMethodsInterface from './HttpMethods';
import appendAuthToken from './appendAuthToken';
import { Config } from '../config';

class HttpRequester implements HttpMethodsInterface {
  private url: string;
  private config: any;

  constructor(url?: string) {

    this.url = url ? url : Config.API_URL;
    this.config = {
      headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
    };
  }

  public sendPostRequest = async (
    path: string,
    requestBody: any,
    config?: any,
    url?: string,
    auth?: boolean
  ): Promise<AxiosResponse> => {
    if (auth) {
      const tokenHeader = await appendAuthToken();
      console.log("TOKEN HEADER",tokenHeader)
      if (config && config.headers) {
        config.headers = { ...config.headers, ...tokenHeader };
      } else {
        config.headers = tokenHeader;
      }
    }

    if (
      config &&
      config.headers &&
      !config.headers.hasOwnProperty('Content-Type')
    ) {
      config.headers = { ...config.headers, ...this.config.headers };
    }
    console.log(`POST ${(url ? url : this.url) + path}`,requestBody,config);
    return await axios.post((url ? url : this.url) + path, requestBody, config);
  };

  public sendDeleteRequest = async (
    path: string,
    config?: any,
    url?: string,
    auth?: boolean
  ): Promise<AxiosResponse> => {
    if (auth) {
      const tokenHeader = await appendAuthToken();
      if (config.headers) {
        config.headers = { ...config.headers, ...tokenHeader };
      } else {
        config.headers = tokenHeader;
      }
    }
    config.headers = { ...config.headers, ...this.config.headers };

    return await axios.delete((url ? url : this.url) + path, config);
  };

  public sendGetRequest = async (
    path: string,
    config?: any,
    url?: string,
    auth?: boolean
  ): Promise<AxiosResponse> => {
    if (!config) {
      config = {};
    }

    if (auth) {
      const tokenHeader = await appendAuthToken();
      if (config.headers) {
        config.headers = { ...config.headers, ...tokenHeader };
      } else {
        config.headers = tokenHeader;
      }
    }
    config.headers = { ...config.headers, ...this.config.headers };
    console.log(`GET ${(url ? url : this.url) + path}`,config);
    return await axios.get((url ? url : this.url) + path, config);
  };

  public sendPutRequest = async (
    path: string,
    requestBody: any,
    config?: any,
    url?: string,
    auth?: boolean
  ): Promise<AxiosResponse> => {
    if (auth) {
      const tokenHeader = await appendAuthToken();
      if (config.headers) {
        config.headers = { ...config.headers, ...tokenHeader };
      } else {
        config.headers = tokenHeader;
      }
    }
    config.headers = { ...config.headers, ...this.config.headers };

    return await axios.put(
      (url ? url : this.url) + path,
      qs.stringify(requestBody),
      config
    );
  };

  public sendPatchRequest = async (
    path: string,
    requestBody: any,
    config?: any,
    url?: string,
    auth?: boolean
  ): Promise<AxiosResponse> => {
    if (auth) {
      const tokenHeader = await appendAuthToken();
      if (config.headers) {
        config.headers = { ...config.headers, ...tokenHeader };
      } else {
        config.headers = tokenHeader;
      }
    }
    config.headers = { ...config.headers, ...this.config.headers };

    return await axios.patch(
      (url ? url : this.url) + path,
      qs.stringify(requestBody),
      config
    );
  };
}

export default HttpRequester;
