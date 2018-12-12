<template>
  <div class="bgbox">
    <app-bar title="更换支付密码" class="m-header"></app-bar>
    <div class="top">
      <div class="field_row_wrap">
        <p class="field_row_key"
           @click="()=>{this.oldPassShow =true;this.showBD('payPasscc1')}"
           v-if="!oldPassShow">
          <span class="left">原密码</span>
          <span class="right">密码由6位数字组成</span>
        </p>
        <transition name="fade">
          <p class="field_row_key low" v-if="oldPassShow">
            <span class="left">原密码</span>
          </p>
        </transition>
        <div class="field_row_value" v-show="oldPassShow">
          <pass-word-zhengzhou
            BankCardPass="payPasscc1"
          ></pass-word-zhengzhou>
        </div>
      </div>
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
          <span class="right">请重复输入新密码</span>
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
    </div>
    <div class="btn">
      <button @click="submit" :class="{active:canClick}" :disabled="!canClick">确定</button>
    </div>
  </div>
</template>

<script>
  import PassWordZhengzhou from '@/components/password/PassInputZhengZhouForMore'

  export default {
    data() {
      return {
        show: true,
        oldPassShow: false,
        newPassShow: false,
        preNewPassShow: false,
        len1: 0,
        len2: 0,
        len3: 0
      }
    },
    computed: {
      canClick() {
        if (this.len1 > 0 && this.len2 > 0 && this.len3 > 0) {
          return true
        } else {
          return false
        }
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
          _this.len1 = $("#payPasscc1").getLenKBD() + ''//获取密码长度
          _this.len2 = $("#payPasscc2").getLenKBD() + ''//获取密码长度
          _this.len3 = $("#payPasscc3").getLenKBD() + ''//获取密码长度

        }
      })
    },
    methods: {
      showBD(id) {
        $("#" + id).attr('title', '输入密码');
        $("#" + id).showKBD({
          "areaId": id + '_Pwd_Area',//必须
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
          oldPass, newPass, reNewPass
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
</style>
