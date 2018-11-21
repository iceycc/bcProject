
export default {
  /**
   * 格式化金额
   * @param str  eg:30000
   * @returns {*} eg:3,000.00
   */
  formatNum(str) {
    if (!str) return str
    str = str + ''
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
    }
    else {
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
   * 格式化时间
   * @param val
   * @returns {*}
   */
  timerFormat(val){
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
  BankNo_Filter(val){
    if (!val) {
      return val
    } else {
      return val.replace(/(\d{4})(?=\d)/g, "$1" + " ")
    }
  }
}
