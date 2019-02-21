<template>
  <div class="header" v-if="show">
    <a class="goBack" href="javascript:;" @click="goBack">
      <img src="@/assets/images/back@2x.png" alt="" v-show="ifShow">
    </a>
    <p>{{title}}</p>
  </div>
</template>

<script>

  import util from "@/libs/util";

  export default {
    name: "AppBar",
    data() {
      return {
        show: true,
      }
    },
    props: {
      'title': {
        type: null,
        default: ''
      },
      'ifShow': {
        type: null,
        default:true
      },
    },
    created() {
      let isE = util.isEquipment()
      if (isE.isApp || isE.isWeixin || isE.isQQ || isE.isWeibo || isE.isDingTalk) {
        this.show = false
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";
  .header {
    height: px2rem(40);
    line-height: px2rem(40);
    font-size: px2rem(18);
    background-color: #fff;
    padding: 0 px2rem(30);
  }

  .header p {
    text-align: center;
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }

  .goBack {
    display: block;
    position: absolute;
    left: px2rem(20);
    top: px2rem(3);
    width: px2rem(17);
    height: px2rem(17);
    z-index: 2;
    img {
      width: px2rem(12);
    }
  }
</style>
