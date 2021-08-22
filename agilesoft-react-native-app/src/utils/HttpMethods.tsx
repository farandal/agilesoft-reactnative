/**
 * @author Francisco Aranda - @farandal - http://www.linkedin.com/in/farandal
 * @email farandal@gmail.com
 * @create date 2021-06-30 22:21:09
 * @modify date 2021-06-30 22:21:09
 * @desc @farandal React Boilerplate Framework - 2020
 */

 export default interface HttpMethods {
  sendPostRequest(
    path: string,
    requestBody: any,
    config?: any,
    url?: string
  ): any;
  sendGetRequest(path: string, config?: any, url?: string): any;
  sendPutRequest(
    path: string,
    requestBody: any,
    config?: any,
    url?: string
  ): any;
  sendPatchRequest(
    path: string,
    requestBody: any,
    config?: any,
    url?: string
  ): any;
  sendDeleteRequest(
    path: string,
    config?: any,
    url?: string
  ): any;
}
