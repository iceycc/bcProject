/**
 * Created
 */
import Qs from 'qs';

/**
 * 1. 非简单请求,如果跨域会多一次option请求来验证是否支持跨域和支持的动作. http://www.ruanyifeng.com/blog/2016/04/cors.html
 *
 * 2. https://www.npmjs.com/package/qs
 */
import {HOST} from "../Constant";
// const BaseUrl = 'http://192.168.10.154:8080/finsuit'
export default {
    method: 'post',
    baseURL:HOST,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    // `transformRequest`允许在请求数据发送到服务器之前对其进行更改
    // 这只适用于请求方法'PUT'，'POST'和'PATCH'
    // 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer 或一个 Stream
    // transformRequest: [function (data) {
    //     return data;
    // }],
    // // `transformResponse`允许在 then / catch之前对响应数据进行更改
    // transformResponse: [function (data) {
    //     console.log('data>>' + data);
    //     return data;
    // }],
    // // `paramsSerializer`是一个可选的函数，负责序列化`params`
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params, {arrayFormat: 'brackets'});
    // },
    // // `timeout`指定请求超时之前的毫秒数。
    // timeout: 100000,
    // // `withCredentials`指示是否跨站点访问控制请求
    // withCredentials: false,
    // // “responseType”表示服务器将响应的数据类型
    // // 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    // responseType: 'json',
    // //打开会多一次 options请求
    // /*    // `onUploadProgress`允许处理上传的进度事件
    //     onUploadProgress: function (progressEvent) {
    //     },
    //     // `onDownloadProgress`允许处理下载的进度事件
    //     onDownloadProgress: function (progressEvent) {
    //         // Do whatever you want with the native progress event
    //     },*/
    // maxContentLength: 2000,
    // // `validateStatus`定义是否解析或拒绝给定的promise
    // validateStatus: function (status) {
    //     return status >= 200 && status < 300;
    // },
    // // `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
    // maxRedirects: 5,
    // // 自定义参数部分
    // custom: {
    //     handleError: true //是否在interceptors处理错误状态.
    // },
    // proxy: {
    //   host: '127.0.0.1',
    //   port: 9000,
    //   auth : {
    //     username: 'mikeymike',
    //     password: 'rapunz3l'
    //   }
    // },

};
