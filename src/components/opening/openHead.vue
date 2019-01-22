<template>
  <section class="wrapicon">
    <section :class="['circle', {'active':item.active}]"
             v-for="item,index in options" :key="index"
    >
                <span
                  :class="['line',
                  {'center':index!=0&&index!=options.length-1},
                  {'first':index==0},
                  {'last':index==options.length-1}]"
                >
                    <img :src='item.active?stepImg:stepImgArr[index]' alt="">
                </span>
      <span class="step-text">{{item.text}}</span>
    </section>
  </section>
</template>

<script>
  export default {
    name: "openHead",
    props: {
      options: { // 数组最少两项，少了不兼容
        type: Array,
        default: function () {
          return [
            {text: '开户信息验证', active: true},
            {text: '绑定银行卡', active: false},
            {text: '设置密码', active: false},
          ]
        }
      },
    },
    data() {
      return {
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImgArr: [
          require('@/assets/images/account_icon_green2@2x.png'), // 默认第一个一定是选中的
          require('@/assets/images/step2@2x.png'), // 第二步
          require('@/assets/images/step3.png'), // 第三步
        ],
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapicon {
    width: 100%;
    height: px2rem(44);
    box-sizing: border-box;
    padding: 0 px2rem(50);
    text-align: center;
    display: flex;
    position: relative;
    margin-bottom: px2rem(20);
    margin-top: px2rem(4);

    .circle {
      position: relative;
      display: flex;
      flex: 2;
      flex-direction: column;

      .step-text {
        position: absolute;
        width: 100%;
        text-align: center;
        top: px2rem(30);
        left: 0;
        color: #999;
        font: px2rem(14);
      }

      &:first-child {
        flex: 1;
        text-align: left;

        .step-text {
          width: px2rem(100);
          top: px2rem(30);
          left: px2rem(-40);
          right: auto;

        }
      }

      &:last-child {
        flex: 1;
        text-align: right;

        .step-text {
          width: px2rem(100);
          top: px2rem(30);
          right: px2rem(-40);
          left: auto;
        }
      }

      .line {
        position: relative;

        img {
          width: px2rem(16);
        }
      }

      .center {
        overflow: hidden;

        &:after {
          display: block;
          position: absolute;
          top: 50%;
          right: px2rem(-8);
          transform: translateY(-100%);
          content: '';
          width: 50%;
          background: #dee1e3;
          height: px2rem(4);
          overflow: hidden;
        }

        &:before {
          display: block;
          position: absolute;
          top: 50%;
          left: px2rem(-8);
          transform: translateY(-100%);
          content: '';
          width: 50%;
          background: #dee1e3;
          height: px2rem(4);
          overflow: hidden;
        }
      }

      .first {
        overflow: hidden;

        &:after {
          display: block;
          position: absolute;
          top: 50%;
          right: px2rem(-16);
          transform: translateY(-100%);
          content: '';
          width: 100%;
          background: #dee1e3;
          height: px2rem(4);
          overflow: hidden;
        }
      }

      .last {
        overflow: hidden;

        &:before {
          display: block;
          position: absolute;
          top: 50%;
          left: px2rem(-16);
          transform: translateY(-100%);
          content: '';
          width: 100%;
          background: #dee1e3;
          height: px2rem(4);
          overflow: hidden;
        }
      }

      &.active {
        .step-text {
          color: #444;
        }

        .center {
          &:after {
            background: #92d048;

          }

          &:before {
            background: #92d048;

          }
        }

        .first {
          &:after {
            background: #92d048;
          }
        }

        .last {
          &:before {
            background: #92d048;
          }
        }
      }
    }

  }
</style>
