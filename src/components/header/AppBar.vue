<template>
  <div :class="{'header':true,'white':bgColor=='white','blue':bgColor=='blue'}" v-if="show">
    <a class="goBack" href="javascript:;" @click="goBack"></a>
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
      title: {
        type: null,
        default: ''
      },
      bgColor: {
        type: null,
        default: 'white'
      }
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
  .header {
    height: px2rem(40);
    line-height: px2rem(40);
    font-size: px2rem(18);
    background-color: #fff;
    /*padding: 0 px2rem(30);*/
    p {
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap
    }

    .goBack {
      display: block;
      z-index: 2;
      position: absolute;
      height: px2rem(11);
      width: px2rem(11);
      left: px2rem(18);
      top: px2rem(11);
      -webkit-transform: rotate(228deg);
      border-left: px2rem(2) solid transparent;
      border-bottom: px2rem(2) solid transparent;
    }

    &.blue {
      background-color: #508CEE;
      color: white;

      .goBack {
        border-right: px2rem(2) solid #fff;
        border-top: px2rem(2) solid #fff;
      }
    }

    &.white {
      background-color: #fff;
      color: #333;

      .goBack {
        border-right: px2rem(2) solid #333;
        border-top: px2rem(2) solid #333;
      }
    }

  }


</style>
