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
    <div class="btn" v-if="!FromH5Active">
      <span @click="goMyAssets" class="begain">查看我的资产</span>
      <span @click="goBuyOther" class="begain">购买其它产品</span>
    </div>
    <div class="btn" v-if="FromH5Active">
      <span @click="goMyAssets" class="begain">查看我的资产</span>
    </div>
    <div v-if="FromH5Active" class="share" @click="share">
      <p>活动不错，分享好友吧</p>
      <!--<img src="@/assets/images/share.png" alt="">-->
    </div>

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
  import {WatchApi} from "@/service";
  import Clipboard from 'clipboard'
  import Bus from '@/plugin/bus'
  import {BusName, PageName} from "@/Constant";
  // import util from "libs/util";


  export default {
    created() {
      this.errMsg = this.$route.query.err || '系统繁忙，请稍后再试'
      this.FromH5Active = this.getComState.FromH5Active || false
      this.shareHref = this.getComState.ProAndOrgType.H5HREF
    },
    data() {
      return {
        errMsg: '',
        FromH5Active:false,
        shareHref:'',
        copyShow:false
      }
    },
    methods: {
      copyHandle() {
        let clipboard = new Clipboard('#copybtn')
        clipboard.on('success', (e) => {
          Bus.$emit(BusName.showToast, '复制活动链接成功')
          clipboard.destroy()
        })
        clipboard.on('error', () => {
          Bus.$emit(BusName.showToast, '浏览器不支持自动复制，请手动复制')
        })
      },
      share(){
        this.copyShow = true
      },
      goMyAssets(){
        this.$router.push({name:PageName.FinancialProducts})
      },
      goBuyOther(){
        if(this.FromH5Active){
          let href = this.getComState.ProAndOrgType.H5HREF
          window.location.href = href
        }else {
          this.$router.push({name: PageName.ProductList})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";
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

  .btn{
    margin-top: px2rem(60);
    text-align: center;
    .begain {
      margin: 0 px2rem(5);
      display: inline-block;
      color: #fff;
      background: #508CEE;
      border-radius: px2rem(6);
      font-size: px2rem(18);
      width: px2rem(160);
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

    img {
      display: inline-block;
      width: px2rem(50);
      height: px2rem(50);
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
