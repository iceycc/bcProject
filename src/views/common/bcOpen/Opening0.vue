<template>
  <div class="main">
    <app-bar :title="pageInfos.TOP_1"></app-bar>
    <section class="banner">
      <img src="@/assets/images/bcopening0/opening0banner@2x.png" alt="">
      <section class="banner-info">
        <p class="p1">{{pageInfos.TOP_2}}</p>
        <p class="p2">{{pageInfos.TOP_3}}</p>
      </section>
    </section>
    <section class="op-container">
      <p class="title">{{pageInfos.MIDDLE_1}}</p>
      <ul class="open-step">
        <li>
          <img src="@/assets/images/bcopening0/icon_credentials@2x.png" alt="">
          <span>1、{{pageInfos.MIDDLE_2}}</span>
        </li>
        <li>
          <img src="@/assets/images/bcopening0/icon_bankcard@2x.png" alt="">
          <span>2、{{pageInfos.MIDDLE_3}}</span>
        </li>
        <li>
          <img src="@/assets/images/bcopening0/icon_password@2x.png" alt="">
          <span>3、{{pageInfos.MIDDLE_4}}</span>
        </li>
      </ul>
      <p class="title">{{pageInfos.BOTTOM_1}}</p>
      <ul class="open-need">
        <li>
          <div class="img">
            <img class="img-big" src="@/assets/images/bcopening0/pic_credentials@2x.png" alt="">
            <img class="img-duihao" src="@/assets/images/bcopening0/icon_authentication@2x.png" alt="">
          </div>
          <span>{{pageInfos.BOTTOM_2}}</span>
        </li>
        <li>
          <div class="img">
            <img class="img-big" src="@/assets/images/bcopening0/pic_bankcard@2x.png" alt="">
            <img class="img-duihao" src="@/assets/images/bcopening0/icon_authentication@2x.png" alt="">
          </div>
          <span>{{pageInfos.BOTTOM_3}}</span>
        </li>
      </ul>

      <section class="footer-info">
        <img class="img-duihao" src="@/assets/images/bcopening0/icon_bicailogo@2x.png" alt="">
        <span>{{pageInfos.BOTTOM_4}}</span>
      </section>
    </section>
    <section class="go-openging" @click="goOpening1">
      <img class="img-duihao" src="@/assets/images/bcopening0/icon_safety@2x.png" alt="">
      <span>{{pageInfos.BUTTON}}</span>
    </section>
  </div>
</template>
<script>
  import {PageName} from "@/Constant";
  import API from "@/service";
  import Check from './common'

  export default {
    data() {
      return {
        pageInfos: {
          TOP_1: '实名认证',
          TOP_2: '应国家监管要求',
          TOP_3: '购买理财需实名认证',

          MIDDLE_1: '实名认证只需简单三步',
          MIDDLE_2: '上传身份证件',
          MIDDLE_3: '绑定一张您本人的银行卡',
          MIDDLE_4: '设置交易密码',

          BOTTOM_1: '请准备好',
          BOTTOM_2: '身份证',
          BOTTOM_3: '银行卡',
          BOTTOM_4: '比财金融智能加密，实时保障您的信息安全',

          BUTTON: '去实名认证',
        }
      }
    },
    mixins: [Check],
    computed: {},
    created() {
      API.bicai.getAuthMemberText({}, (res) => {
        this.pageInfos = res
        document.title = res.TOP_1
      })
    },
    methods: {
      goOpening1() {
        console.log(1);
        this.$router.push({name: PageName.BcOpening1})
      }
    }

  }
</script>

<style lang="scss" scoped>


  .main {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F5F5F9;
  }

  .banner {
    position: relative;
    width: 100%;
    height: px2rem(145);

    img {
      width: 100%;
      height: 100%;
    }

    .banner-info {
      position: absolute;
      top: px2rem(20);
      left: px2rem(20);
      color: #fff;

      .p1 {
        font-size: px2rem(18);
      }

      .p2 {
        font-size: px2rem(16);
      }
    }

  }

  .op-container {
    padding: px2rem(20);

    .title {
      font-weight: bold;
      font-size: px2rem(16);
      color: #333;
    }

    .open-step {
      /*height: px2rem(28);*/
      /*line-height: px2rem(28);*/
      padding-left: px2rem(10);
      padding-bottom: px2rem(20);

      li {
        margin-top: px2rem(10);
      }

      img {
        width: px2rem(28);
        height: px2rem(28);
        vertical-align: middle;
      }

      span {
        font-size: px2rem(14);
        height: px2rem(28);
        line-height: px2rem(28);
        vertical-align: middle;
        padding-left: px2rem(6);
        color: #444;
      }
    }

    .open-need {
      display: flex;

      li {
        flex: 1;
        text-align: center;
      }

      .img {
        position: relative;
        margin: px2rem(15) auto px2rem(20);
        width: px2rem(84);
        height: px2rem(54);

        .img-big {
          width: 100%;
          height: 100%;
        }

        .img-duihao {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: px2rem(-9);
          width: px2rem(19);
          height: px2rem(18);
        }
      }
    }

    .footer-info {
      text-align: center;
      padding-top: px2rem(20);

      img {
        vertical-align: middle;
        width: px2rem(15);
        height: px2rem(15);
      }

      span {
        vertical-align: middle;
        color: #999;
        font-size: px2rem(12)
      }
    }

  }

  .go-openging {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: px2rem(48);
    background: #518BEE;
    text-align: center;
    line-height: px2rem(48);

    img {
      width: px2rem(14);
    }

    span {
      color: #fff;
      font-size: px2rem(16)
    }
  }
</style>
