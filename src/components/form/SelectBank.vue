<template>
  <section class="input-box">
    <p class="left-p">选择银行
    </p>
    <img @click="showInfoHandle" class="xiane" src="@/assets/images/problom2@2x.png" alt="">
    <span class="input" @click="showUpSelectHandle">
          {{bankText}}
                  <img src="@/assets/images/list_icon_next@2x.png" alt="" class="img">
        </span>
  </section>
</template>

<script>
  export default {
    name: "SelectBank",
    props:{
      text:{
        type:String,
        default:'选择银行'
      },
      bankText:{
        type:String,
        default:'请选择开户银行'
      }
    },
    methods:{
      showInfoHandle(){
        this.$emit('showInfo')
      },
      showUpSelectHandle(){
        this.$emit('showUpBox')
      }
    }
  }
</script>

<style scoped lang="scss">
  .input-box {
    height: px2rem(44);
    line-height: px2rem(44);
    margin: 0 auto;
    padding: 0 px2rem(20);
    border-bottom: 1px #E5E5E5 solid;
    display: flex;
    font-size: px2rem(14);

    .xiane {
      margin-top: px2rem(15);
      margin-left: px2rem(5);
      width: px2rem(14);
      height: px2rem(14);
    }

    .left-p {
      box-sizing: border-box;
      color: #444;
    }

    input, .input {
      text-align: left;
      flex: 1;
      color: #333
    }


    .img {
      position: absolute;
      top: 50%;
      transform: translateY(-60%);
      right: 0;
      width: px2rem(12);
      height: px2rem(12);
      vertical-align: middle;
    }

    .input {
      text-align: right;
      padding-right: px2rem(20);
      position: relative;
      color: #508CEE;
    }

    button {
      margin-top: px2rem(12);
    }
  }
</style>
