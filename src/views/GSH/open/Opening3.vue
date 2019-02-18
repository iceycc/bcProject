<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <open-head :options="[
    {text: '开户信息验证', active: true},
    {text: '绑定银行卡', active: true},
    {text: '短信校验', active: false},
    ]"></open-head>
    <sms-code-input
      ref="smsInput"
      @sendTelCode="sendTelCodeHandle"
      v-model="smsCode"
      clickText="获取验证码"
    ></sms-code-input>
    <submit-button
      class="submit-btn"
      text="开户"
      :canSubmit="canSubmit"
      @submit="submit"
      bgColor="lightBlue"
    ></submit-button>
    <alert-box
      v-if="alertShow"
      :message="errMsg"
      @submit="sure"
      @cancel="close"
      left="取消开户"
      right="重新开户"
    ></alert-box>
    <call-to-bicai info="有疑问，请联系公众号: bicaikef"></call-to-bicai>
  </div>
</template>
<script>
  import API from "@/service";
  import {BusName, LsName, PageName} from "@/Constant";
  import Mixins from '@/mixins'
  import {
    OpenHead,
    SmsCodeInput,
    SubmitButton,
    CallToBicai,
    AlertBox
  } from '@/components'

  export default {
    data() {
      return {
        errMsg: '开户失效，重新开始',
        smsCode: '',
        alertShow: false,
        needData: {}
      }
    },
    components: {
      OpenHead,
      SmsCodeInput,
      SubmitButton,
      CallToBicai,
      AlertBox,
    },
    mixins: [ Mixins.redirectByFromPage],
    computed: {
      canSubmit() {
        if (this.smsCode) {
          return true
        } else {
          return false
        }
      }
    },
    created() {
      this.needData = this.$route.query
    },
    mounted(){
      // 怎么判断是从
      console.log();
      if(this.$route.params.flag){
        this.$refs.smsInput.doCountdown()
      }
      // if(this.$route)
    },
    methods: {
      sure() {
        this.alertShow = false
        this.$router.push({name:PageName.Opening2})
      },
      close() {
        this.alertShow = false
      },
      /**
       * 确定开户成功
       *
       */
      submit() {
        this.CheckMsg()
        console.log('submit');
      },
      async CheckMsg() {
        let data = {
          sernoOriginal: this.needData.reqSerial,
          sendNo: this.needData.smsSendNo, // 短信验证码编号
          shortCode: this.smsCode, // 短信验证码
          bizType: '1'
        }
        let res = await API.open.apiRigesisterShortCodeVerify(data)
        console.log(res);
        this.setComState({type: 'ISLogin', value: true})
        this.redirectByFromPage()
      },
      /**
       * @param success 发送短信验证吗 倒计时
       * @param error 错误是初始化按钮
       */
      async sendTelCodeHandle(success, error) {
        console.log('sendTelCodeHandle');
        let data = {
          sernoOriginal: this.needData.reqSerial,
        }
        try {
          let res = await API.common.apiSendPhoneCode(data)
          console.log(res);
          if(res.code=='98001600'){
            this.alertShow = true
          }
          success && success() //
        }catch (e) {
          
          error && error()
        }
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


  .submit-btn {
    margin-top: px2rem(88);
    margin-bottom: px2rem(10);
  }


</style>
