import Bus from '@/plugin/bus'
import {BusName} from "@/Constant";

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
/**
 * 注意：需要时showToast设置为true，弹层展示错误信息
 */
export default {
  Trim: Trim,
  trim(val, type = '', showToast = false) {
    let msg;
    if (Trim.all(val) == '') {
      msg = `${type}不能为空`
    }
    if (showToast && msg) {
      Bus.$emit(BusName.showToast, msg)
    }
    return msg
  },
  /**
   * 电话号码校验
   */
  tel(val, showToast = false) {
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
    if (showToast && msg) {
      Bus.$emit(BusName.showToast, msg)
    }
    return msg
  },

  /**
   * 姓名
   */
  name(val, showToast = false) {
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
    if (showToast && msg) {
      Bus.$emit(BusName.showToast, msg)
    }
    return msg
  },
  /**
   * 身份证校验
   */
  idNumber(val, showToast = false) {
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
    if (showToast && msg) {
      Bus.$emit(BusName.showToast, msg)
    }
    return msg
  },
  /**
   * 交易密码校验  晋商密码空间只能获取密码长度，无法进行密码类型校验
   */
  payPassLen(len, showToast = false) {
    let msg;
    if (len != 6) {
      msg = '交易密码有误，请重新输入'
    }
    if (showToast && msg) {
      Bus.$emit(BusName.showToast, msg)
    }
    return msg
  },
  /**
   * 登录密码校验  8-20位
   * 晋商密码空间只能获取密码长度，无法进行密码类型校验
   */
  loginPassLen(len, showToast = false) {
    let msg;
    if (len < 8 || len > 20) {
      msg = '登录密码有误，请重新输入'
    }
    if (showToast && msg) {
      Bus.$emit(BusName.showToast, msg)
    }
    return msg
  }
}