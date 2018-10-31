// import Crypto from "crypto-js";
import Bus from '../../plugin/bus'
import {BusName} from "../../Constant";


import EXIF from 'exif-js'

export default {
  //上传图片
  // throttle: 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
  throttle(cb, ms = 300) {
    let timer = true
    return () => {
      console.log('timer', timer);
      if (!timer) {
        return
      }
      timer = false
      setTimeout(() => {
        cb()
        timer = true
      }, ms)
    }
  },
  /**
   * 上传图片
   * @param  {string}   url          服务器上传请求地址
   * @param  {obj}      data         图片文件信息
   * @param  {string}   field        字段名
   * @param  {function} uploadingFn  上传中回调函数
   * @param  {function} successFn    上传成功回调函数
   * @param  {function} failerFn     上传失败回调函数
   * @return {Promise}
   */
  uploadImg(url, data, field, uploadingFn, successFn, failerFn) {
    field = field || 'file';
    var fmData = new FormData();
    fmData.append(field, data); //将文件转成二进制形式

    // 监听进度回调
    const uploadProgress = function (event) {
      if (event.lengthComputable) {
        let progress = 100 * Math.round(event.loaded) / event.total;
        console.log('上传进度：', progress);
        uploadingFn && uploadingFn(progress);
      }
    };

    // 上传文件
    return new Promise(function (resolve, reject) {
      let client = new XMLHttpRequest();
      client.open('POST', url, true);
      client.onreadystatechange = function () {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200 || this.status === 201) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(this.status);
        }
      };

      client.upload.addEventListener("progress", uploadProgress, false); //监听进度

      // 设置header
      if (typeof headers == 'object' && headers) {
        Object.keys(headers).forEach((k) => {
          client.setRequestHeader(k, headers[k]);
        })
      }

      client.send(fmData);
    }).then(
        // 上传成功
        function (resData) {
          console.log('上传成功：', resData);
          successFn && successFn(resData);
          return Promise.resolve(resData);
        },
        // 上传失败
        function (sts) {
          console.log('上传失败：', sts);
          failerFn && failerFn(sts);
          return Promise.reject(resData);
        }
    );
  }
  ,

  //图片压缩
  imgScale(imgUrl, fileList, quality) {
    return new Promise(function (resolve, reject) {
      let img = new Image();

      let _this = this;
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let base64 = null;
      img.src = imgUrl;

      img.onload = function () {
        // let s = util.getPhotoOrientation(fileList)
        // console.log(s);
        if ((fileList.size / 1024 / 1024) > 0) { //质量大于1m
          //缩放后图片的宽高
          // 500 k  800 x 500
          let rateW = img.naturalWidth / 400
          let rateH = img.naturalHeight / 250
          console.log(img.naturalWidth, img.naturalHeight)
          let width, height
          width = img.naturalWidth / rateW;
          height = img.naturalHeight / rateW;
          console.log(width, height)
          canvas.width = width;
          canvas.height = height;
          if (img.naturalWidth < img.naturalHeight) {
            console.log(1);
            canvas.height = width;
            canvas.width = height;
            ctx.rotate(-Math.PI / 2);
            ctx.translate(-width, 0);
          }
          ctx.drawImage(this, 0, 0, width, height);

          base64 = canvas.toDataURL('image/jpeg', 0.8);
          resolve(base64);
        } else {
          console.log(2);
          var expectWidth = img.naturalWidth;
          var expectHeight = img.naturalHeight;
          if (img.naturalWidth > img.naturalHeight && img.naturalWidth > 800) {
            expectWidth = 1200;
            expectHeight = expectWidth * img.naturalHeight / img.naturalWidth;
          } else if (img.naturalHeight > img.naturalWidth && img.naturalHeight > 1200) {
            expectHeight = 900;
            expectWidth = expectHeight * img.naturalWidth / img.naturalHeight;
          }
          canvas.width = expectWidth;
          canvas.height = expectHeight;
          cxt.drawImage(img, 0, 0, expectWidth, expectHeight);
          base64 = canvas.toDataURL("image/jpeg", 0.4);
          resolve(base64);
        }
      }
    })
  }
  ,
  // 传人 元素类名 或者 元素id 获取该元素的宽度和高度
  getDivSize(ele) {
    var divBox = document.querySelector(ele)
    return {
      with: divBox.offsetWidth,
      height: divBox.offsetHeight
    }
  },
  // 获取当前可使区域的高度 宽度
  getWinSize() {
    var winHeight, winWidth;
    if (window.innerHeight) {
      winHeight = window.innerHeight;
      winWidth = window.innerWidth;
    }
    else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight;
      winWidth = document.body.clientWidth;
    }
    return {
      winHeight,
      winWidth
    }
  },
  //
  getPhotoOrientation(img) {
    console.log('img', img);
    var orient;
    EXIF.getData(img, function () {
      orient = EXIF.getAllTags(this)
      ;
    });
    return orient;
  },
  canvasUpload(url, data, rawFile, type, uploadingFn, successFn, failerFn) {
    console.log("rawFile>>>>>>>>>", rawFile);
    var text = window.atob(data.split(",")[1]);
    var buffer = new ArrayBuffer(text.length);
    var ubuffer = new Uint8Array(buffer);
    var pecent = 0, loop = null;

    for (var i = 0; i < text.length; i++) {
      ubuffer[i] = text.charCodeAt(i);
    }

    var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
    var blob;

    if (Builder) {
      var builder = new Builder();
      builder.append(buffer);
      blob = builder.getBlob(type);
    } else {
      blob = new window.Blob([buffer], {type: type});
    }

    var fmData = new FormData();
    fmData.append("imagefile", blob, rawFile.name);

    // 监听进度回调
    const uploadProgress = function (event) {
      if (event.lengthComputable) {
        let progress = 100 * Math.round(event.loaded) / event.total;
        console.log('上传进度：', progress);
        uploadingFn && uploadingFn(progress);
      }
    };

    // 上传文件
    return new Promise(function (resolve, reject) {
      let client = new XMLHttpRequest();
      client.open('POST', url, true);
      client.onreadystatechange = function () {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200 || this.status === 201) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(this.status);
        }
      };

      client.upload.addEventListener("progress", uploadProgress, false); //监听进度

      // 设置header
      if (typeof headers == 'object' && headers) {
        Object.keys(headers).forEach((k) => {
          client.setRequestHeader(k, headers[k]);
        })
      }

      client.send(fmData);
    }).then(
        // 上传成功
        function (resData) {
          successFn && successFn(resData);
          return Promise.resolve(resData);
        },
        // 上传失败
        function (sts) {
          failerFn && failerFn(sts);
          return Promise.reject(sts);
        }
    );
  },

  //获取url查询字符串
  getQuery(url) {
    url = decodeURIComponent(url);
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
      var strs = url.substr(1).split("&");
      for (var i = 0, len = strs.length; i < len; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },

  //设置url查询字符串
  setQuery: function (params) {
    if (Object.prototype.toString.call(params) !== "[object Object]") {
      return "";
    }
    var url = "?";
    for (var i in params) {
      url += i + "=" + params[i] + "&";
    }
    url = url.replace(/\&$/g, "").replace(/^\?$/g, "");
    return url;
  },

  /**
   * 解析字符串
   *
   * @param      {string}  str     要解析的字符串
   * @param      {string}  places  分隔符
   * @param      {string}  query   查找参数
   */
  parseString(str, places, query) {
    places = places || '&';
    if (!str || !str.length) {
      return '';
    }

    str = decodeURIComponent(str);
    str = str.split('?')[1];
    let res = {};
    str.split(places).forEach(item => {
      let itemArr = item.split('=');
      res[itemArr[0]] = itemArr[1];
    });

    if (query) {
      return res[query];
    }

    return res;
  },
  isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value);
  }
  ,

  isTel: function (phone) {
    let reg = /^1[3578]\d{9}$|^(?:0\d{2,3}-?)?[2-9]\d{6,7}$/g;
    return reg.test(phone) ? true : false;
  }
  ,
  isAuthCode: function (authCode) {
    let reg = /^\d{4,6}$/g;
    return reg.test(authCode) ? true : false;
  }
  ,
  isNumber: function (dinnerNum) {
    let reg = /^\d{1,3}$/g;
    return reg.test(dinnerNum) ? true : false;
  }
  ,
  isNum: function (dinnerNum) {
    let reg = /^\d$/g;
    return reg.test(dinnerNum) ? true : false;
  }
  ,
  isEmail: function (email) {
    let reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
    return reg.test(email) ? true : false;
  }
  ,
  isMoney: function (mon) {
    let reg = /^(?:0|[1-9]\d*)\.\d{1,2}$|^[1-9]\d*$|^0$/g;

    return reg.test(mon) ? true : false;
  }
  ,
  isObject: function (obj) {
    return obj !== null && typeof obj === 'object'
  }
  ,
  //检测是否是微信浏览器
  isWeiXin: function () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/microMessenger/i) == 'micromessenger') {
      return true;
    }
    return false;
  }
  ,
  //检测是否是支付宝内置浏览器
  isAlipay: function () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/alipay/i) == 'alipay') return true;
    return false;
  }
  ,
  encryptPwdF: function (value) {
    let raw = Crypto.enc.Base64.stringify(Crypto.MD5(value, {asBytes: true}));
    raw = this.replaceAll(raw, "\\", "_");
    raw = this.replaceAll(raw, "/", "-");
    raw = this.replaceAll(raw, "+", "]");
    return raw;
  }
  ,
  encryptPwd: function (raw, key) {
    let enc = Crypto.HmacMD5(raw, key) + "";
    return enc.toUpperCase();
  }
  ,
  encryptEnc: function (pwd) {
    return 'RAW_' + pwd;
  }
  ,
  replaceAll: function (str, match, ment) {
    while (true) {
      let pos = str.indexOf(match);
      if (pos >= 0) {
        str = str.replace(match, ment);
      } else {
        break;
      }
    }
    return str;
  }
  ,
  format: function (date, fmt) {
    date = new Date(date);
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
  ,



  /**
   * 时间 转 时间戳
   * @param  {[type]} stringTime [时间]
   * @return {[type]}            [时间戳]
   */
  formatTimeStamp(stringTime) {
    var timestamp = stringTime ? new Date(stringTime).getTime() : '';
    return timestamp;
  },

  /**
   * 深拷贝
   *
   * @param {*} obj
   * @param {Array<Object>} cache
   * @return {*}
   */
  deepCopy(obj, cache = []) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    const hit = this.find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }
    const copy = Array.isArray(obj) ? [] : {}

    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache)
    })

    return copy
  },

  find(list, f) {
    return list.filter(f)[0]
  },

  /**
   * forEach for object
   */
  forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
  },

  //检查请求参数
  checkParams: function ({fn, param, fullresult}) {
    if (!fn || !fn.length) {
      console.error("请求方法(fn)必须传入！");
      return false;
    }
    if (!Array.isArray(param)) {
      console.error("请求参数(param)必须是数组！");
      return false;
    }
    return true;
  },
  //组合httpURL
  combHttpURL: function (baseURL, data) {
    let httpURL = baseURL.toString();
    if (!httpURL.includes("?")) {
      httpURL += "?"
    }
    for (var key of Object.keys(data)) {
      httpURL += (key + "=" + data[key]) + "&";
    }
    //没有内容
    if (httpURL.endsWith("?")) {
      httpURL = httpURL.substring(0, httpURL.length - 1);
    }
    if (httpURL.endsWith("&")) {
      httpURL = httpURL.substring(0, httpURL.length - 1);
    }
    return httpURL;
  }
  ,

  //input自动获取焦点
  autoFocus: function (ref, isFocus, isSelect) {
    if (isFocus) {
      ref.$el.children[0].focus();
    }
    if (isSelect) {
      ref.inputSelect();
    }
  }
  ,

  //组合httpURL
  combHttpURL: function (baseURL, data) {
    let httpURL = baseURL.toString();
    if (!httpURL.includes("?")) {
      httpURL += "?"
    }

    for (var key of Object.keys(data)) {
      httpURL += (key + "=" + data[key]) + "&";
    }

    //没有内容
    if (httpURL.endsWith("?")) {
      httpURL = httpURL.substring(0, httpURL.length - 1);
    }

    if (httpURL.endsWith("&")) {
      httpURL = httpURL.substring(0, httpURL.length - 1);
    }

    return httpURL;
  }
  ,

  getResultErrMsg(result) {
    return (result && (result.message || (result.target && result.target.message))) || "获取数据失败";
  }
  ,
  downLoad(callback1, callback2, fn) {

    /*
     *	callback1  安卓微信中打开指示图层指示用户在浏览器中下载
     *	callback2  判断浏览器失败跳转到推荐给好友页面
     */
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isAndroid) {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        window.location.href = "http://app.qq.com/#id=detail&appid=1105662720";
        Bus.$emit(BusName.showToast, '请在浏览器中下载')
        callback1 && callback1();
      } else {
        window.location.href = "http://app.qq.com/#id=detail&appid=1105662720";
        // window.location.href = "http://finsafe.geong.com:8989/down?ID=1";
      }
    } else if (isiOS) {
      // window.location.href = "https://itunes.apple.com/cn/app/%E6%AF%94%E8%B4%A2/id1149189800?mt=8";
      window.location.href = "https://itunes.apple.com/cn/app/id1149189800?mt=8";
      // https://itunes.apple.com/cn/app/id1149189800?mt=8
    } else {
      Bus.$emit(BusName.showToast, '请在浏览器中下载')

      callback2 && callback2();
    }
  }
  ,

  openApp(src) {
// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
// 否则打开a标签的href链接
    var ifr = document.createElement('iframe');
    ifr.src = src;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    window.setTimeout(function () {
      document.body.removeChild(ifr);
    }, 2000);
  }
  ,
  reDo(fn) {
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        fn && fn()
      }, 1000)
    }
  }
  ,
  IOSTitileUpdat() {
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe');
      hackIframe.style.display = 'none';
      hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
      document.body.appendChild(hackIframe);
      setTimeout(_ => {
        document.body.removeChild(hackIframe)
      }, 300)
    }
    var iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 0);
    };
    document.body.appendChild(iframe);
  },



}
;

