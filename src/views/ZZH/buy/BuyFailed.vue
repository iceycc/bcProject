<template>
  <div class="app">
    <app-bar title="购买"></app-bar>
    <div class="chattuimg">
      <img src="@/assets/images/buyfail@2x.png" style="width:25%" alt="">
    </div>
    <div class="fenxiangcontent">
      <h2>很抱歉，购买失败!</h2>
      <p style="margin-top:0.6rem; color:#F22C17;">{{errMsg}}</p>
    </div>
    <div class="btn" v-if="!shareHref">
      <span @click="goMyAssets" class="begain">查看我的资产</span>
      <span @click="goBuyOther" class="begain">购买其他产品</span>
    </div>
    <div class="btn" v-if="shareHref">
      <span @click="goMyAssets" class="begain">查看我的资产</span>
    </div>
    <!--<div v-if="shareHref" class="share">-->
      <!--<p @click="share">活动不错，分享好友吧-->
        <!--<img src="@/assets/images/share.png" alt="">-->
      <!--</p>-->
    <!--</div>-->

    <div class="copy-box" v-if="copyShow">
      <img @click="copyShow = false" class="close" src="@/assets/images/icon_ask_close.svg" alt="">
      <input type="text" class="content" v-model="shareHref" id="codeText">
      <button id="copybtn"
              data-clipboard-target="#codeText"
              @click="copyHandle">点击复制链接
      </button>
      <!--<img src="@/assets/images/close.png" alt="">-->
    </div>
  </div>
</template>
<script>
  // import {WatchApi} from "@/service";
  import Clipboard from 'clipboard'
  import Bus from '@/plugin/bus'
  import {BusName, PageName} from "@/Constant";
  // import util from "libs/util";
  import API from "@/service";


  export default {
    created() {
      this.errMsg = this.$route.query.err || ''
      // this.shareHref = window.sessionStorage.getItem('h5_href') || ''

    },
    data() {
      return {
        errMsg: '',
        shareHref: '',
        copyShow: false
      }
    },
    methods: {
      copyHandle() {
        let porId = this.getComState.goBuy.ID
        API.watchApi({
          FUNCTION_ID: 'ACB0G019', // 点位
          REMARK_DATA: '产品包装页-参与拼团-安全购买-购买成功-活动不错，分享给好友吧', // 中文备
          FROM_ID: porId
        })
        let clipboard = new Clipboard('#copybtn')
        clipboard.on('success', (e) => {
          Bus.$emit(BusName.showToast, '复制活动链接成功')
          clipboard.destroy()
        })
        clipboard.on('error', () => {
          Bus.$emit(BusName.showToast, '浏览器不支持自动复制，请手动复制')
        })
      },
      share() {
        this.copyShow = true
      },
      goMyAssets() {
        this.$router.push({name: PageName.FinancialProducts})
      },
      goBuyOther() {
        if (this.shareHref) {
          let href = this.getComState.ProAndOrgType.H5HREF
          window.location.href = href
        } else {
          this.$router.push({name: PageName.ProductList})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>


  .app {
    width: 100%;
    margin: 0 auto;
  }

  .chattuimg {
    margin-top: 2rem;
    text-align: center;
  }

  .fenxiangcontent {
    text-align: center;
    padding: 0 .4rem;
    font-size: 0.4rem;
    color: #333;
    margin-top: 1rem;
  }

  .btn {
    margin-top: px2rem(60);
    text-align: center;

    .begain {
      margin: 0 px2rem(5);
      display: inline-block;
      color: #fff;
      background: #518BEE;
      border-radius: px2rem(6);
      font-size: px2rem(18);
      width: px2rem(255);
      height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      border: 0px;
      outline: none;
    }
  }

  .share {
    padding-top: px2rem(20);
    text-align: center;
    font-size: px2rem(13);
    color: #508CEE;
    p{
      display: inline-block;
    }
    img {
      margin-left: px2rem(5);
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      z-index: 100;
      /*background: #007aff;*/
    }
  }

  .copy-box {
    position: absolute;
    bottom: 40%;
    box-sizing: border-box;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: px2rem(300);
    padding: px2rem(20);
    background: #fefefe;
    border: 1px solid #ccc;

    .close {
      position: absolute;
      top: px2rem(10);
      right: px2rem(10);
      width: px2rem(14);
    }

    button {
      border: 1px solid #ccc;
      display: block;
      margin: 0 auto;
      width: px2rem(100);
      height: px2rem(30);
      line-height: px2rem(30);
      text-align: center;
    }

    input {
      height: px2rem(40);
      overflow-x: scroll;
    }
  }

</style>
