<template>
  <section :class="{'input-box':true, 'active-input':ifActive}">
    <transition name="fade">
      <p class="label" v-show="valueShow">{{defaultPlaceholderText}}</p>
    </transition>
    <section class="input-small">
      <transition name="fade">
        <label :for="inputId" v-show="!valueShow" class="placeholder-text">{{valuePlaceholder}}</label>
      </transition>
      <input :id="inputId" class="input" :type="type"
             name="text1" :placeholder="text"
             :value="currentValue"
             @input="handleInput($event.target.value)"
             @change="handleChange($event.target.value)"
      >
      <slot name="btn" class="slot">
      </slot>
    </section>
  </section>
</template>

<script>
  import util from "@/libs/util";

  export default {
    name: "ActiveInput",
    props: {
      valuePlaceholder: { // placeholder值
        type: null,
        default: '请输入手机号码'
      },
      inputId: String,
      text: { // placeholder值
        type: null,
        default: '手机号码'
      },
      value: null,
      type: { // input类型
        type: null,
        default: 'tel'
      },
      checkType: { // 校验类型
        type: null,
        default: 'number'
      },
      max: { // 设置最大位数
        type: null,
        default: Infinity,
      },
    },
    data() {
      var currentValue = ''
      return {
        valueShow: false,
        placeholderText: '',
        defaultPlaceholderText: '',
        ifActive: true,
        currentValue: currentValue,
      }
    },
    created() {
      this.defaultPlaceholderText = this.valuePlaceholder// const
      this.placeholderText = this.valuePlaceholder

    },
    mounted() {
      if (this.currentValue) {
        this.ifActive = false
        this.placeholderText = ''
        this.valueShow = true
      }
    },

    methods: {
      handleChange(val) {
        this.$emit('changeHandle', val)
      },
      isValueNumber(value) {
        value = value - 0
        let reg;
        switch (this.checkType) {
          case 'number': // 只能输入数字 // 建议 同时 type传人 tel 在ios手机可以兼容
            // 用于校验手机号。。首字母不是
            reg = /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/
            return reg.test(value)
          case 'idCard': { // type设置text
            reg = /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9,x,X]*$)|(^-?0{1}$)/
            return reg.test(value)
          }
          case 'code': { // type设置text
            return true
          }
        }
      },
      throttle(cb, ms = 300, val) {
        console.log(val);
        let timer = true
        return () => {
          console.log('timer', timer);
          if (!timer) {
            return
          }
          timer = false
          setTimeout(() => {
            cb(val)
            timer = true
          }, ms)
        }
      },
      doInputThrottle(val) {
        this.throttle(this.handleInput, 1000, val)
      },
      handleInput(val) {
        this.controlInputStyle(val)
        this.controlInputValue(val)
      },
      controlInputStyle(val) {
        if (val === '') { // 删除到 '' 是触发
          this.ifActive = true
          this.valueShow = false
          this.placeholderText = this.defaultPlaceholderText
        } else {
          this.ifActive = false
          this.placeholderText = ''
          this.valueShow = true
        }
      },
      controlInputValue(val) {
        val = val + ''
        if (util.isEquipment().isIOS && this.checkType == 'idCard') {
          // ios限制字母输入有兼容问题  九宫格输入英文字母 不按套路
          this.currentValue = val
          this.$emit('input', this.currentValue); // 给父组件  传值
          return
        }
        val = val.toString().trim()
        if (this.isValueNumber(val)) {
          var max = this.max;
          this.currentValue = val;
          if (val.length > max) {
            this.currentValue = val.toString().substr(0, max)
          }
          ;
        } else {
          // 如果输入的非数字，则保留之前的数据
          if (val === '') {
            this.currentValue = '';
            event.target.value = ''
          } else {
            event.target.value = this.currentValue;
          }
        }
        this.$emit('input', this.currentValue); // 给父组件  传值
      },

    }
    ,
  }
</script>

<style lang="scss" scoped>


  .input-box {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: px2rem(70);
    background-size: 0.7rem 0.7rem;
    border-bottom: 1px #E5E5E5 solid;
    padding: px2rem(12) px2rem(20) 0;

    .input {
      position: absolute;
      left: 0;
      bottom: 0;
      @include placeholder(#444);
      height: px2rem(24);
      margin: px2rem(10) 0;
      width: 100%;
      padding: 0 px2rem(20);
      border: none;
      box-sizing: border-box;
      font-size: px2rem(20);
      color: #333;
      /* line-height: 40px; */
      outline: none;
    }

    .input-small {
      .placeholder-text {
        z-index: 10;
        position: absolute;
        top: px2rem(10);
        right: px2rem(20);
        color: #A4A9B0;
        font-size: px2rem(14);
      }
    }
  }

  .label {
    padding: 0;
    font-size: px2rem(12);
    color: #444;
  }


  .placeholder-info {

  }

  .slot {
    position: absolute;
    z-index: 3;
    right: 0;
  }

  .active-input {
    height: px2rem(42);

    .input {
      font-size: px2rem(14);
    }
  }
</style>
