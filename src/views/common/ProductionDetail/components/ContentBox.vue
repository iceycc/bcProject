<template>
  <section class="content-box">
    <p class="title">{{title}}</p>
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: "ContentBox",
    props:{
      title:{
        type:String,
        default:''
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-box {
    border-bottom: px2rem(10) solid #fafcff;
    .title {
      padding: 0 px2rem(20);
      height: px2rem(39);
      box-shadow: 0 1px 0 0 rgba(220, 220, 220, 0.5);
      line-height: px2rem(39);
      font-size: px2rem(16);
      color: #333;
    }
  }
</style>
