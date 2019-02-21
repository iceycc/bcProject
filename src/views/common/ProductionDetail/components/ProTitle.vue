<template>
  <section class="pro-name">
    <p class="pro-title">产品名称</p>
    <p class="pro-content">{{proName}}</p>
  </section>
</template>

<script>
  export default {
    name: "ProTitle",
    props: {
      proName: {
        type: String,
        default: '产品名称'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/px2rem";

  .pro-name {
    padding: 0 0.5rem;

    .pro-title {
      color: #000;
      font-size: 0.4rem;
      height: px2rem(48);
      line-height: px2rem(48);
      border-bottom: 1px solid #DCDCDC;
    }

    .pro-content {
      /*height: px2rem(48);*/
      /*line-height: px2rem(48);*/
      font-size: 0.4rem;
      padding: px2rem(14) 0;
      color: #666;
    }

    border-bottom: px2rem(10) solid #fafcff;
  }

</style>
