export default {
  /**
   * 银行限额 -1 处理为无限额
   * @param str
   * @returns {string}
   */
  BankLimit(str) {
    if (!str) return '0.00'
    str = str + ''
    str = str.trim()
    if (str == '-1') {
      // 约定 后台返回 -1 说明无限额 注意处理额度控制
      return '无限额'
    }
    // if(str == '' || !str) return
    // if (!Number(str)) return str
    var newStr = "";
    var count = 0;
    if (str.indexOf(".") == -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      // str = newStr + ".00"; //自动补小数点后两位
      str = newStr //自动补小数点后两位
      return str + '元'
    } else {
      for (var i = str.indexOf(".") - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
        } else {
          newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
      }
      // str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
      str = newStr + str;
      return str + '元'
    }

  },
  /**
   * 格式化金额 千分位 加小数点
   * @param str  eg:30000
   * @returns {*} eg:3,000.00
   */
  formatNum(str) {
    if (!str) return '0.00'
    str = str + ''
    str = str.trim()
    // if(str == '' || !str) return
    // if (!Number(str)) return str
    var newStr = "";
    var count = 0;
    if (str.indexOf(".") == -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr + ".00"; //自动补小数点后两位
      return str
    } else {
      for (var i = str.indexOf(".") - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
        } else {
          newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
      }
      str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
      return str
    }
  },

  /**
   * 格式化利率。。最多显示小数点三位，大于四位直接截取。
   * @param str
   * @returns {*}
   */
  rateFormat(str, len = 3) {
    if (!str) return '0'
    str = str + ''
    if (str.indexOf(".") > -1) {
      let StrArr = str.split('.');
      if (StrArr[1].length > len) {
        str = StrArr[0] + '.' + StrArr[1].substr(0, len);
      }
    }
    return str
  },

  /**
   * 格式化时间
   * @param val
   * @returns {*}
   */
  timerFormat(val) {
    if (!val) return val;
    let date = new Date(parseInt(val));
    let Y = date.getFullYear() + '-',
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
      D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ',
      h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':',
      m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : +date.getMinutes() + ':',
      s = date.getSeconds() < 10 ? '0' + date.getSeconds() : +date.getSeconds();
    return Y + M + D + h + m + s;
  },

  /**
   * 格式化银行卡号 隔四位增减空格
   * @param val
   * @returns {*}
   * @constructor
   */
  BankNo_Filter(val) {
    if (!val) {
      return val
    } else {
      return val.replace(/(\d{4})(?=\d)/g, "$1" + " ")
    }
  },

  /**
   *
   * @param no
   * @returns {string}
   */
  formatBankNo(no) {
    if (!no) return ''
    no = no + ''
    return `****  ****  ****  ****  ` + no.substr(no.length - 4)
  },
  // 将 0 转换为 0.00
  fromatMoneyFilter(x) {
    // if(!num) return '0.00'
    // if(num.indexOf('.')!='-1'){
    //   // 有点
    //   return num
    // }else {
    //   return num + '.00'
    // }
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
      // alert('function:changeTwoDecimal->parameter error');
      return x;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0';
    }
    return s_x;
  },
}
