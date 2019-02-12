<template>
  <p class="msg-infos">{{info}}</p>
</template>

<script>
  export default {
    name: "CallToBicai",
    props:{
      info:{
        type:String,
        default:'有疑问，请联系比财客服微信号: bicaikefu'
      }
    }
  }
</script>

<style scoped lang="scss">
  .msg-infos {
    width: 100%;
    position: fixed;
    bottom: px2rem(20);
    left: 0;
    text-align: center;
    color: #508CEE;
    font-size: px2rem(12);
  }
</style>
