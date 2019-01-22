<template>
  <div class="bgbox">
    <app-bar title="重置支付密码" class="m-header"></app-bar>
    <div class="top">
      <div class="field_row_wrap">
        <p class="field_row_key"
           @click="()=>{this.newPassShow =true;this.showBD('payPasscc2')}"
           v-if="!newPassShow">
          <span class="left">新密码</span>
          <span class="right">密码由6位数字组成</span>
        </p>
        <transition name="fade">
          <p class="field_row_key low" v-if="newPassShow">
            <span class="left">新密码</span>
          </p>
        </transition>
        <div class="field_row_value" v-show="newPassShow">
          <pass-word-zhengzhou
            BankCardPass="payPasscc2"
          ></pass-word-zhengzhou>
        </div>
      </div>
      <div class="field_row_wrap">
        <p class="field_row_key"
           @click="()=>{this.preNewPassShow =true;this.showBD('payPasscc3')}"
           v-if="!preNewPassShow">
          <span class="left">重复新密码</span>
          <span class="right">密码由6位数字组成</span>
        </p>
        <transition name="fade">
          <p class="field_row_key low" v-if="preNewPassShow">
            <span class="left">重复新密码</span>
          </p>
        </transition>

        <div class="field_row_value" v-show="preNewPassShow">
          <pass-word-zhengzhou
            BankCardPass="payPasscc3"
          ></pass-word-zhengzhou>
        </div>
      </div>
      <div class="field_row_wrap">
        <p class="field_row_key" @click="msgCodeShow =true" v-if="!msgCodeShow">
          <span class="left">验证码</span>
        </p>
        <transition name="fade">
          <p class="field_row_key low" v-if="msgCodeShow">
            <span class="left">验证码</span>
          </p>
        </transition>

        <div class="field_row_value" v-show="msgCodeShow">
          <input type="tel" v-model="CHECK_CODE">
        </div>
      </div>

    </div>
    <div class="btn">
      <button @click="submit" :class="{active:canClick}" :disabled="!canClick">确定</button>
    </div>
  </div>
</template>

<script>
  import PassWordZhengzhou from '@/components/password/PassInputZhengZhouForMore'
  import Bus from '@/plugin/bus'
  import {PageName, BusName, LsName} from "@/Constant";

  export default {
    data() {
      return {
        show: true,
        msgCodeShow: false,
        newPassShow: false,
        preNewPassShow: false,
        CHECK_CODE: ''
      }
    },
    components: {
      PassWordZhengzhou
    },
    name: "PayPassWord",
    created() {
      this.winLoad()
    },
    mounted() {
      $('#PWDKBD').remove();
      $(window).loadKBD();
      let _this = this
      jQuery.fn.extend({
        validKBD: function () {
          console.log('Input的onchange事件');
          //类似Input的onchange事件，写密码检验
          _this.len2 = $("#payPasscc2").getLenKBD() + ''//获取密码长度
          _this.len3 = $("#payPasscc3").getLenKBD() + ''//获取密码长度
        }
      })
    },
    computed: {
      canClick() {
        if (this.CHECK_CODE && this.len2 > 0 && this.len3 > 0) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      showBD(id) {
        $("#" + id).attr('title', '输入密码');
        $("#" + id).showKBD({
          "areaId": id+ '_Pwd_Area',//必须
          "pageId": id,//非必须
          "minLen": 0,
          "maxLen": 6,
          "cursor": true,
          "mask": true,
        });
      },
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
        let CHECK_CODE = this.CHECK_CODE + ''
        let PasswordObj = {
          newPass, reNewPass, CHECK_CODE
        }
        console.log(PasswordObj);
        if (newPass.len != 6) {
          Bus.$emit(BusName.showToast, '请输入6位密码')
          return
        }
        if (reNewPass.len != 6) {
          Bus.$emit(BusName.showToast, '请输入6位密码')
          return
        }
        if (!CHECK_CODE) {
          Bus.$emit(BusName.showToast, '请输入手机验证码')
          return
        }
        PasswordObj = JSON.stringify(PasswordObj)
        if (isAndroid) {
          window.android.getTwoPasswordFromZhengZhou(PasswordObj);
        }
        if (isiOS) {
          window.IOSWebJSInterface.getTwoPasswordFromZhengZhou(PasswordObj);
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


  .top {
    padding: 0 px2rem(20) px2rem(20);

    .field_row_value {
      font-size: px2rem(14);
      width: 100%;
      height: px2rem(30);
    }

    .low {
      font-size: px2rem(12);
      color: #858E9F;
    }

    .field_row_wrap {
      border-bottom: 1px solid #e5e5e5;

      .field_row_key {
        display: flex;
        height: px2rem(56);
        line-height: px2rem(56);

        span {
          flex: 1;
        }

        .left {
          font-size: px2rem(16);
        }

        .right {
          color: #6e6e6e;
          font-size: px2rem(16);
          text-align: right;
        }
      }
    }

  }

  .btn {
    margin-top: px2rem(40);
    text-align: center;

    button {
      width: px2rem(255);
      height: px2rem(44);
      color: #fff;
      font-size: px2rem(18);
      background: #ccc;
      border: 1px solid #ccc;
      border-radius: px2rem(6);

      &.active {
        color: #fff;
        background: #007aff;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
