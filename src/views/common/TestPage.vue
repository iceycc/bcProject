<template>
  <div>
    <p class="msg">你请求的地址去旅行了，正在返回产品页</p>
  </div>
</template>
<script>
  import util from '../../libs/util'
  import {PageName} from "../../Constant";
  export default {
    name: "testPage",
    created() {
      setTimeout(()=>{
        this.$router.push({name:PageName.ProductList})
      },1000)
    },

  }
</script>
<style lang="scss" scoped>

  .msg{
    width: 100%;
    margin-top: px2rem(40);
    font-size: px2rem(18);
    text-align: center;
  }
</style>
