let Trim = {
  all(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  left(str) {
    return str.replace(/(^\s*)/g, "");
  },
  right(str) {
    return str.replace(/(\s*$)/g, "");
  }
}

export default {
  Trim: Trim,
  trim(str, type = '') {
    let msg;
    if (Trim.all(str) == '') {
      msg = `${type}不能为空`
    }
    return msg
  },
  tel(val) {
    let msg;
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (Trim.all(val) == '') {
      msg = '手机号码不能为空'
    }
    else if (val.length != 11) {
      msg = '手机号码不是11位'
    }

    else if (!reg.test(val)) {
      msg = '手机号格式错误'
    }
    else {

    }
    return msg
  },
  name(val) {
    let msg;
    let reg = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
    if (Trim.all(val) == '') {
      msg = '姓名不能为空'
    }
    else if (!reg.test(val)) {
      msg = '请填写2到5位中文姓名'
    }
    else {

    }
    return msg
  },
  idNumber(val) {
    let msg;
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/
    if (Trim.all(val) == '') {
      msg = '身份证号码不能为空'
    }
    else if (!reg.test(val)) {
      msg = '身份证号码格式错误'
    }
    else {

    }
    return msg
  },

  payPassLen(len) {
    let msg;
    if (len != 6) {
      msg = '交易密码有误，请重新输入'
    }
    return msg
  },
  loginPassLen(len) {
    let msg;
    if (len < 8 || len > 20) {
      msg = '登录密码有误，请重新输入'
    }
    return msg
  }
}