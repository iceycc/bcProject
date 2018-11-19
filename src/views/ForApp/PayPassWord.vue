<template>
  <section class="bgbox">
    <section class="passbox">
      <p class="title">
        <img src="@/assets/images/icon_dunpai@2x.png" alt="">
        由郑州银行提供技术保障</p>
      <section class="field_row_wrap">
        <p class="field_row_key">
          交易密码
        </p>
        <div class="field_row_value">
          <pass-word-zhengzhou
            BankCardPass="payPasscc"
          ></pass-word-zhengzhou>
        </div>
        <p class="info">密码由数字组成，必须为6位</p>
      </section>
      <div class="btn">
        <mt-button @click="close" type="primary">取消</mt-button>
        <mt-button @click="submitBtn1" type="primary">提交</mt-button>
      </div>
    </section>
  </section>
</template>

<script>
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'

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
      submitBtn1() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let pass = $("#payPasscc").getKBD() + ''; //获取密码
        let len = $("#payPasscc").getLenKBD() + ''; //获取密码长度
        let lenCode = $("#payPasscc").getBDCode() + ''; //
        if (isAndroid) {
          window.android.getOnePasswordFromZhengZhou(pass,len,lenCode);
        }
        if (isiOS) {
          window.IOSWebJSInterface.getOnePasswordFromZhengZhouLengthPrefix(pass, len, lenCode);
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
  .bgbox {
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: fixed;
    padding-top: 1rem;
    top: 0;
    left: 0;
    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      padding: 0.4rem;
      box-sizing: border-box;
    }
    .field_row_key {
      font-size: 0.4rem;
    }
    .title {
      margin-bottom: 0.5rem;
      text-align: center;
      font-size: 0.4rem;
      color: #666;
      height: .6rem;
      line-height: .6rem;
      img {
        vertical-align: top;
        width: .5rem;
      }
    }
    .field_row_wrap {
      margin-bottom: 0.2rem;
    }
    .field_row_value {
      border-radius: 4px;
      border: 1px solid #9e9e9e;
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 0.2rem 0;
    }
    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }
    .btn {
      display: flex;
      button {
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }
</style>
