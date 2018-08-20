// import Crypto from "crypto-js";

/*========本地存储===========*/
const STORE_PREFIX = '_MX_'
export let storage = {
  getPrefix: () => STORE_PREFIX,
  cookies: {
    get(sKey) {
      if (!sKey) return null
      sKey = STORE_PREFIX + sKey
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
    },
    set(sKey, sValue, vEnd = 1800, sPath = '/', sDomain = '', bSecure = false) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) return false

      sKey = STORE_PREFIX + sKey
      let sExpires = ''
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number: // 单位秒
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
            break
          case String:
            sExpires = '; expires=' + vEnd
            break
          case Date:
            sExpires = '; expires=' + vEnd.toUTCString()
            break
        }
      }
      document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
      return true
    },
    remove(sKey, sPath = '/', sDomain = '') {
      if (!this.has(sKey)) return false

      sKey = STORE_PREFIX + sKey
      document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
      return true
    },
    has(sKey) {
      if (!sKey) return false
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
    },
    keys() {
      let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
      for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
      return aKeys
    }
  },
  session: {
    set(key, value) {
      if (!key) return false
      window.sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value || {}))
    },
    get(key) {
      if (!key) return null
      return JSON.parse(window.sessionStorage.getItem(STORE_PREFIX + key))
    },
    remove(key) {
      window.sessionStorage.removeItem(STORE_PREFIX + key)
    },
    removeAll() {
      window.sessionStorage.clear()
    }
  },
  local: {
    getUsedSize() {
      return unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
    },
    getFreeSize() { //5M
      return 1024 * 1024 * 5 - this.getUsedSize();
    },
    set(key, value, ms = 1000 * 3600 * 24 * 365) {
      if (!key) return false

      key = STORE_PREFIX + key
      let newValue = {
        value: value,
        expires: ms,
        time: new Date().getTime()
      }
      window.localStorage.setItem(key, JSON.stringify(newValue))
    },
    get(key) {
      if (!key) return null
      key = STORE_PREFIX + key

      let value = JSON.parse(window.localStorage.getItem(key))
      if (value && (new Date().getTime() - value.time < value.expires)) {
        value = value.value
      } else {
        value = null
      }
      return value
    },
    remove(key) {
      window.localStorage.removeItem(STORE_PREFIX + key)
    },
    removeAll() {
      window.localStorage.clear()
    }
  }
}

export const util = {
  //本地存储
  storage: storage,

  //上传图片
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
    const uploadProgress = function(event) {
      if (event.lengthComputable) {
        let progress = 100 * Math.round(event.loaded) / event.total;
        console.log('上传进度：', progress);
        uploadingFn && uploadingFn(progress);
      }
    };

    // 上传文件
    return new Promise(function(resolve, reject) {
      let client = new XMLHttpRequest();
      client.open('POST', url, true);
      client.onreadystatechange = function() {
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
      function(resData) {
        console.log('上传成功：', resData);
        successFn && successFn(resData);
        return Promise.resolve(resData);
      },
      // 上传失败
      function(sts) {
        console.log('上传失败：', sts);
        failerFn && failerFn(sts);
        return Promise.reject(resData);
      }
    );
  },

  //图片压缩
  imgScale(imgUrl,fileList,quality){
    return new Promise(function(resolve,reject){
      let img = new Image();
      let _this = this;
      let canvas = document.createElement('canvas');
      let cxt = canvas.getContext('2d');
      let base64 = null;
      img.src = imgUrl;
      img.onload = function() {
          if((fileList.size / 1024 /1024) > 1){
              //缩放后图片的宽高
              let width = img.naturalWidth/quality;
              let height = img.naturalHeight/quality;
              canvas.width = width;
              canvas.height = height;
              cxt.drawImage(this, 0, 0, width, height);
              base64 = canvas.toDataURL('image/jpeg',0.2);
              resolve(base64);
          }else{
              var expectWidth = img.naturalWidth;
              var expectHeight = img.naturalHeight;
              if (img.naturalWidth > img.naturalHeight && img.naturalWidth > 800) {
                  expectWidth =1200 ;
                  expectHeight = expectWidth * img.naturalHeight / img.naturalWidth;
              } else if (img.naturalHeight > img.naturalWidth && img.naturalHeight > 1200) {
                  expectHeight = 900;
                  expectWidth = expectHeight * img.naturalWidth / img.naturalHeight;
              }
              canvas.width = expectWidth;
              canvas.height = expectHeight;
              cxt.drawImage(img, 0, 0, expectWidth, expectHeight);
              base64 = canvas.toDataURL("image/jpeg",0.2);
              resolve(base64);
          }
      }
  })
},

canvasUpload(url, data, rawFile,type, uploadingFn, successFn, failerFn) {
  console.log("rawFile>>>>>>>>>",rawFile);
    var text = window.atob(data.split(",")[1]);
    var buffer = new ArrayBuffer(text.length);
    var ubuffer = new Uint8Array(buffer);
    var pecent = 0 , loop = null;

    for (var i = 0; i < text.length; i++) {
        ubuffer[i] = text.charCodeAt(i);
    }

    var Builder = window.WebKitBlobBuilder ||  window.MozBlobBuilder;
    var blob;

    if (Builder) {
        var builder = new Builder();
        builder.append(buffer);
        blob = builder.getBlob(type);
    } else {
        blob = new window.Blob([buffer], {type: type});
    }

    var fmData = new FormData();
    fmData.append("imagefile", blob,rawFile.name);

    // 监听进度回调
    const uploadProgress = function(event) {
      if (event.lengthComputable) {
        let progress = 100 * Math.round(event.loaded) / event.total;
        console.log('上传进度：', progress);
        uploadingFn && uploadingFn(progress);
      }
    };

    // 上传文件
    return new Promise(function(resolve, reject) {
      let client = new XMLHttpRequest();
      client.open('POST', url, true);
      client.onreadystatechange = function() {
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
      function(resData) {
        successFn && successFn(resData);
        return Promise.resolve(resData);
      },
      // 上传失败
      function(sts) {
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
  setQuery: function(params) {
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

  isTel: function(phone) {
    let reg = /^1[3578]\d{9}$|^(?:0\d{2,3}-?)?[2-9]\d{6,7}$/g;
    return reg.test(phone) ? true : false;
  },
  isAuthCode: function(authCode) {
    let reg = /^\d{4,6}$/g;
    return reg.test(authCode) ? true : false;
  },
  isNumber: function(dinnerNum) {
    let reg = /^\d{1,3}$/g;
    return reg.test(dinnerNum) ? true : false;
  },
  isNum: function(dinnerNum) {
    let reg = /^\d$/g;
    return reg.test(dinnerNum) ? true : false;
  },
  isEmail: function(email) {
    let reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
    return reg.test(email) ? true : false;
  },
  isMoney: function(mon) {
    let reg = /^(?:0|[1-9]\d*)\.\d{1,2}$|^[1-9]\d*$|^0$/g;

    return reg.test(mon) ? true : false;
  },
  isObject: function(obj) {
    return obj !== null && typeof obj === 'object'
  },
  //检测是否是微信浏览器
  isWeiXin: function() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/microMessenger/i) == 'micromessenger') {
      return true;
    }
    return false;
  },
  //检测是否是支付宝内置浏览器
  isAlipay: function() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/alipay/i) == 'alipay') return true;
    return false;
  },
  // encryptPwd: function(key, value) {
  //   let raw = Crypto.enc.Base64.stringify(Crypto.MD5(value, { asBytes: true }));
  //   raw = this.replaceAll(raw, "\\", "_");
  //   raw = this.replaceAll(raw, "/", "-");
  //   raw = this.replaceAll(raw, "+", "]");
  //   let enc = Crypto.HmacMD5(raw, key) + "";
  //   return enc.toUpperCase();

  // },
  encryptPwdF: function(value) {
    let raw = Crypto.enc.Base64.stringify(Crypto.MD5(value, { asBytes: true }));
    raw = this.replaceAll(raw, "\\", "_");
    raw = this.replaceAll(raw, "/", "-");
    raw = this.replaceAll(raw, "+", "]");
    return raw;
  },
  encryptPwd: function(raw,key){
    let enc = Crypto.HmacMD5(raw, key) + "";
    return enc.toUpperCase();
  },
  encryptEnc: function(pwd) {
    return 'RAW_' + pwd;
  },
  replaceAll: function(str, match, ment) {
    while (true) {
      let pos = str.indexOf(match);
      if (pos >= 0) {
        str = str.replace(match, ment);
      } else {
        break;
      }
    }
    return str;
  },

  /*doSign: function(data) {

      let sign = "";
      for (let p in data) {
          sign += `${p}=${data[p]}&`;
      }
      sign = sign.replace(/\&$/g, "").split("&").filter((item, index) => /^p\d\=/g.test(item)).join("&");

      sign += storage.local.get('signKey') || "";
      sign = Crypto.enc.Utf8.parse(sign);
      sign = Crypto.MD5(sign, { asBytes: true });
      sign = Crypto.enc.Hex.stringify(sign);
      return sign;
  },*/
  format: function(date, fmt) {
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
  },

  /**
   * 时间 转 时间戳
   * @param  {[type]} stringTime [时间]
   * @return {[type]}            [时间戳]
   */
  formatTimeStamp(stringTime) {
    var timestamp = stringTime ? new Date(stringTime).getTime() :'';
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

  //URL包含
  urlExclude: function(url) {
    let excludeFns = [
      'hydsite.printerHandler.availablePrinter', //打印机上报
      'hydsite.printHandler.getReceiptPrintData' //打印任务处理
    ];

    let query = util.getQuery(url);
    if (query && query['p0']) {
      return excludeFns.includes(query['p0']);
    }

    return false;
  },

  //跳过网络检测
  skipCheckNet(url) {
    let excludeFns = [
      'hydsite.localServiceHandler.getLocalServiceId', //获取本地服务ID
      'hydsite.printHandler.getReceiptPrintData', //打印任务处理
      'hydsite.printerHandler.availablePrinter' //打印机上报
    ];

    let query = util.getQuery(url);
    if (query && query['p0']) {
      return excludeFns.includes(query['p0']);
    }

    return false;
  },

  //检查请求参数
  checkParams: function({ fn, param, fullresult }) {
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
  combHttpURL: function(baseURL, data) {
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
  },

  //input自动获取焦点
  autoFocus: function(ref, isFocus, isSelect) {
    if (isFocus) {
      ref.$el.children[0].focus();
    }
    if (isSelect) {
      ref.inputSelect();
    }
  },

  //组合httpURL
  combHttpURL: function(baseURL, data) {
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
  },

  getResultErrMsg(result) {
    return (result && (result.message || (result.target && result.target.message))) || "获取数据失败";
  }



};

export default util;
