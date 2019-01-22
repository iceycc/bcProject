<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <open-head :options="[
    {text: '开户信息验证', active: true},
    {text: '绑定银行卡', active: true},
    {text: '短信校验', active: false},
    ]"></open-head>
    <sms-code-input
    @sendTelCode="sendTelCodeHandle"
    v-model="smsCode"
    ></sms-code-input>
    <div class="Tips" v-if="errMsg">
      <span>{{errMsg}}</span>
    </div>
    <button
      :class="{'tijiao':true, 'agree':!disabled}"
      :disabled="disabled">开户
    </button>
  </div>
</template>
<script>

  import {BusName, LsName, PageName} from "@/Constant";
  import OpenHead from '@/components/opening/OpenHead'
  import SmsCodeInput from '@/components/form/SmsCodeInput'
  import Mixins from "@/mixins";
  import Opening3Mixins from './Opening3'


  export default {
    data() {
      return {
        disabled: true,
        errMsg: '',
        smsCode:''
      }
    },
    components: {
      OpenHead,
      SmsCodeInput
    },
    mixins: [ Opening3Mixins],
    created() {

    },
    methods: {
      /**
       *
       * @param success 发送短信验证吗 倒计时
       * @param error 错误是初始化按钮
       */
      sendTelCodeHandle(success,error){
        console.log('sendTelCodeHandle');
        success() //
        setTimeout(()=>{
          error()
        },3000)
      },

    }

  }
</script>

<style lang="scss" scoped>


  .bgbox {
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: absolute;
    padding-top: 0.7rem;
    top: 0;
    left: 0;

    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .top {
      padding: 0.4rem;
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
      border-radius: px2rem(4);
      border: 1px solid #DDD;
      height: px2rem(34);
      line-height: px2rem(34);
      padding-left: px2rem(3);
      margin: 0.2rem 0;
    }

    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }

    .btn {
      border-top: 1px solid #efefef;
      padding: px2rem(14) 0;
      display: flex;

      button {
        color: #108EE9;
        font-size: px2rem(17);
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }

  .warp {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .opening_box p {
    margin-left: 0.533333rem;
    background-repeat: no-repeat;
    background-color: #fff;
    line-height: 1.2rem;
    width: 90%;
    background-position: 0.2rem 0.3rem;
    border-bottom: 1px #E5E5E5 solid;
  }

  .opening_box p span {
    font-family: PingFangSC-Regular;
    color: #444444;
    font-size: 14px;
    display: inline-block;
    width: 80px;
  }

  .opening_box p .limit {
    color: #0096FE;
    font-family: PingFangSC-Regular;
  }

  .opening_box p .getpassword {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    width: 80px;
    height: 30px;
    border: 1px solid #2B74FE;
    color: #2B74FE;
    border-radius: 6px;
  }

  .opening_box input {
    width: 50%;
    border: none;
    box-sizing: border-box;
    font-size: 14px; /*px*/
    color: #333;
    line-height: 40px;
    outline: none;
  }

  .tijiao {
    background: #e4e4e4;
    color: #fff;
    font-size: px2rem(18);
    border-radius: px2rem(5);
    width: px2rem(261);
    height: px2rem(44);
    line-height: px2rem(44);
    margin: px2rem(50) auto 0;
    text-align: center;
    display: block;

    &.agree {
      background: #0072ff;
    }
  }

  .Tips {
    margin: px2rem(17) auto 0;
    text-align: center;

    span {
      box-sizing: border-box;
      display: inline-block;
      background-color: #FF5B05;
      color: #fff;
      min-width: px2rem(261);
      height: px2rem(29);
      line-height: px2rem(29);
      padding: 0 px2rem(6);
      border-radius: px2rem(4);

    }
  }




</style>
