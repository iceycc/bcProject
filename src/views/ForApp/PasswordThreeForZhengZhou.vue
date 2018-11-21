<template>
  <div class="bgbox">
    <app-bar title="重置支付密码" class="m-header"></app-bar>
    <div class="top">
        <div class="field_row_wrap">
          <p class="field_row_key">
            原密码
          </p>
          <div class="field_row_value">
            <pass-word-zhengzhou
              BankCardPass="payPasscc1"
            ></pass-word-zhengzhou>
          </div>
          <p class="info">密码由6位数字组成</p>
        </div>

        <div class="field_row_wrap">
          <p class="field_row_key">
            新密码
          </p>
          <div class="field_row_value">
            <pass-word-zhengzhou
              BankCardPass="payPasscc2"
            ></pass-word-zhengzhou>
          </div>

          <p class="info">密码由6位数字组成</p>
        </div>
        <div class="field_row_wrap">
          <p class="field_row_key">
            重复新密码
          </p>
          <div class="field_row_value">
            <pass-word-zhengzhou
              BankCardPass="payPasscc3"
            ></pass-word-zhengzhou>
          </div>

          <p class="info">密码由6位数字组成</p>
        </div>
      </div>
      <div class="btn">
        <button @click="close">取消</button>
        <button @click="submit">确定</button>
      </div>
  </div>
</template>

<script>
  import PassWordZhengzhou from '@/components/password/PassInputZhengZhouForMore'

  export default {
    data() {
      return {
        show: true
      }
    },
    components: {
      PassWordZhengzhou
    },
    name: "PayPassWord",
    created() {
      this.winLoad()
    },
    mounted(){
      $('#PWDKBD').remove();
      $(window).loadKBD();
    },
    methods: {
      close() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.clickOnBack();
        }
        if (isiOS) {
          window.IOSWebJSInterface.clickOnBack()
        }
      },
      submit() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let oldPass = {
          pass: $("#payPasscc1").getKBD() + '', //获取密码
          len: $("#payPasscc1").getLenKBD() + '',//获取密码长度
          passFix: $("#payPasscc1").getBDCode() + '' //
        }
        let newPass = {
          pass: $("#payPasscc2").getKBD() + '', //获取密码
          len: $("#payPasscc2").getLenKBD() + '',//获取密码长度
          passFix: $("#payPasscc2").getBDCode() + '' //
        }
        let reNewPass = {
          pass: $("#payPasscc3").getKBD() + '', //获取密码
          len: $("#payPasscc3").getLenKBD() + '',//获取密码长度
          passFix: $("#payPasscc3").getBDCode() + '' //
        }
        console.log(oldPass);
        console.log(newPass);
        console.log(reNewPass);
        let threePasswordObj = {
          oldPass,newPass,reNewPass
        }
        // let Base64 = require('js-base64').Base64;
        // Base64.encode()
        threePasswordObj = JSON.stringify(threePasswordObj)
        if (isAndroid) {
          window.android.getThreePasswordFromZhengZhou(threePasswordObj);
        }
        if (isiOS) {
          window.IOSWebJSInterface.getThreePasswordFromZhengZhou(threePasswordObj);
        }
      },
      winLoad() {
        window.sendParam = function (val) {
          let data = JSON.parse($.base64().decode(val));
        }
      }
// / 到此处结束  然后 替换掉原有的
    },
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/px2rem";
.top{
  padding: px2rem(20);
  .field_row_value{

  }
  .field_row_value{
    width: 100%;
    height: px2rem(30);
  }

}
</style>
