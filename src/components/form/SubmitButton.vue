<template>
  <div class="submit-box">
    <button :class="{submit:true,gray:bgColor==='gray',lightBlue:bgColor==='lightBlue',canSubmit:canSubmit}"
            :disabled="!canSubmit" @click="submitHandle">{{text}}
    </button>
  </div>
</template>

<script>
  export default {
    name: "SubmitButton",
    props: {
      bgColor: {
        type: String,
        default: 'gray'
      },
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
  .submit-box {
    width: 100%;
    text-align: center;

    .submit {
      font-size: px2rem(16);
      color: #fff;
      border-radius: px2rem(6);
      line-height: px2rem(44);
      width: px2rem(255);
      height: px2rem(44);
      text-align: center;
      border: none;
      outline: none;

      &.gray {
        background: #ccc;
      }

      &.lightBlue {
        background: #C0D7FE;
      }

      &.canSubmit {
        background: #508CEE;
      }
    }
  }

</style>
