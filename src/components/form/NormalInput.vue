<template>
  <section class="input">
            <span class="name">
                {{text}}
            </span>
    <input :type="type"
           :placeholder="placeholder"
           :value="value"
           :disabled="disabled"
           @input="handleInput($event.target.value)"
           @change="handleChange($event.target.value)"
           @blur="handleBlur($event.target.value)"
           @focus="handleFocus($event.target.value)"
    >

  </section>
</template>

<script>
  export default {
    name: "NormalInput",
    props: {
      disabled: {
        type: null,
        default: false
      },
      type: {
        type: null,
        default: 'tel'
      },
      value: null,
      text: {
        type: null,
        default: '手机号码'
      },
      placeholder: {
        type: null,
        default: '银行预留手机号'
      }
    },
    data() {
      return {}
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

    }
  }
</script>

<style scoped lang="scss">
  .input {
    padding: 0 px2rem(20);
    height: px2rem(45);
    line-height: px2rem(45);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;
    display: flex;

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
      flex: 1;
      text-align: right;
      padding-left: px2rem(10);
      border: none;
      box-sizing: border-box;
      font-size: px2rem(14);
      color: #333;
      outline: none;
    }

  }

  .grey {
    .name {
      color: #A4A9B0;
    }

    input {
      color: #A4A9B0;
    }
  }
</style>
