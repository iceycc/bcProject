<template>
  <section class="input">
            <span class="name">
                {{text}}
            </span>
    <input type="tel"
           :placeholder="placeholderText"
           :value="value"
           @input="handleInput($event.target.value)"
           @change="handleChange($event.target.value)"
           @blur="handleBlur($event.target.value)"
           @focus="handleFocus($event.target.value)"
    >
    <button
      :disabled="msgdisable"
      @click="getCode"
      class="button">{{codeText}}
    </button>
  </section>
</template>

<script>
  export default {
    name: "SmsCodeInput",
    props: {
      value: null,
      text: {
        type: null,
        default: '验证码'
      },
      placeholderText: {
        type: null,
        default: '请输入短信验证码'
      }
    },
    data() {
      return {
        msgCode: '',
        codeText: '获取验证码',
        msgdisable: false,
        totalTime: 60,
        timer: null,// setInterval实例
      }
    },
    methods: {
      handleInput(value) {
        this.$emit('input', value)
      },
      handleBlur(value) {
        this.$emit('blur', value)
      },
      handleFocus(value) {
        this.$emit('focus', value)
      },
      handleChange(value) {
        this.$emit('change', value)
      },
      /**
       * 通知父组件进行发送短信验证码操作
       */
      getCode() {
        this.$emit('sendTelCode', this.doCountdown, this.init)
      },
      /**
       * 成功时 倒计时
       */
      doCountdown() {
        console.log('doCountdown')
        let times = this.totalTime
        this.msgdisable = true // 禁止按钮点击
        this.timer = setInterval(() => {
          if (times == 0) {
            this.init()
            return
          }
          times--
          this.codeText = `${times}s`
        }, 1000)
      },
      /**
       * 失败时，或者倒计时结束 初始化 init
       */
      init(text = '重新发送') {
        // 错误时重置按钮
        this.codeText = text
        this.msgdisable = false
        clearInterval(this.timer)
      }
    }
  }
</script>

<style scoped lang="scss">
  .input {
    padding-left: px2rem(20);
    height: px2rem(45);
    line-height: px2rem(45);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;

    .name {
      color: #444;
    }

    .button {
      vertical-align: middle;
      font-size: px2rem(14);
      width: px2rem(84);
      height: px2rem(28);
      line-height: px2rem(28);
      display: inline-block;
      border: 1px solid #508CEE;
      border-radius: px2rem(6);
      color: #508CEE
    }

    input {
      text-align: center;
      padding-left: px2rem(10);
      width: px2rem(200);
      border: none;
      box-sizing: border-box;
      font-size: px2rem(14);
      color: #333;
      outline: none;
    }
  }
</style>
