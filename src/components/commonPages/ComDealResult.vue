<template>
  <div>
    <section class="com-res-top">
      <slot name="resImg"></slot>
    </section>
    <section class="com-res-msg">
      <slot name="resMsg"></slot>
    </section>
    <section class="com-res-btn">
      <slot name="resBtn"></slot>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'ComDealResult',
  }
</script>

<style lang="scss" scoped>
  .com-res-top {
    text-align: center;
    margin-top: px2rem(40);

    img {
      width: px2rem(64);
      height: px2rem(64);
    }
  }

  .com-res-msg {
    margin-top: px2rem(20);
  }

  .com-res-btn {
    margin-top: px2rem(60);
  }

</style>
