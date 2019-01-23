<template>
  <div class="submit-box">
    <button :class="{canSubmit:canSubmit}" :disabled="!canSubmit" class="submit" @click="submitHandle">{{text}}</button>
  </div>
</template>

<script>
  export default {
    name: "SubmitButton",
    props: {
      canSubmit: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: '确定'
      }
    },
    methods: {
      submitHandle() {
        this.$emit('submit')
      }
    }

  }
</script>

<style scoped lang="scss">
  .submit-box{
    width: 100%;
    text-align: center;
  }
  .submit {
    font-size: px2rem(16);
    color: #fff;
    background: #ccc;
    border-radius: px2rem(6);
    line-height: px2rem(44);
    width: px2rem(255);
    height: px2rem(44);
    text-align: center;
    border: none;
    outline: none;
    &.canSubmit {
      background: #508CEE;
    }
  }
</style>
