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
    padding: 0 px2rem(20);

    .pro-title {
      color: #333;
      font-size: px2rem(16);
      height: px2rem(48);
      line-height: px2rem(48);
      box-shadow: 0px 1px 0px 0px rgba(220, 220, 220, 0.5);
    }

    .pro-content {
      height: px2rem(48);
      line-height: px2rem(48);
      color: #666;
    }

    border-bottom: px2rem(10) solid #fafcff;
  }

</style>
