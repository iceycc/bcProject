<template>
  <div>
    <app-bar title="存入"></app-bar>
    <com-deal-result>
      <section slot="resImg">
        <img src="@/assets/images/Verificationsuccess@2x.png" alt="">
      </section>
      <section slot="resMsg">
        <p class="p-first">存入成功</p>
        <section class="m-card">
          <p><span class="r-left">存款产品名称</span><span class="r-right">{{datas.prdName}}</span></p>
          <p><span class="r-left">交易银行</span><span class="r-right">{{datas.orgName}}</span></p>
          <p><span class="r-left">存入金额</span><span class="r-right">{{datas.payAmount}}</span></p>
          <p><span class="r-left">交易申请日期</span><span class="r-right">{{datas.payDate}}</span></p>
          <p><span class="r-left">预期开始收益日期</span><span class="r-right">{{datas.incDate}}</span></p>
          <p><span class="r-left">交易流水号</span><span class="r-right">{{datas.besharpOrderNo}}</span></p>
        </section>
      </section>
      <section slot="resBtn">
        <div class="btn" v-if="!shareHref">
          <span @click="goMyAssets('0')" class="begain">查看我的资产</span>
          <span @click="goBuyOther" class="begain">购买其他产品</span>
        </div>
        <div class="btn" v-if="shareHref">
          <span @click="goMyAssets('1')" class="begain">查看我的资产</span>
        </div>
      </section>
    </com-deal-result>
    <div v-if="shareHref" class="share">
      <p @click="share">活动不错，分享好友吧<img src="@/assets/images/share.png" alt=""></p>
    </div>
    <div class="copy-box" v-if="copyShow">
      <img @click="copyShow = false" class="close" src="@/assets/images/icon_ask_close.svg" alt="">
      <input type="text" class="content" v-model="shareHref" id="codeText">
      <button id="copybtn"
              data-clipboard-target="#codeText"
              @click="copyHandle">点击复制链接
      </button>
    </div>
  </div>
</template>
<script>

  import {BusName, PageName} from "@/Constant";
  import Mixins from "@/mixins";
  import Clipboard from 'clipboard'
  import Bus from '@/plugin/bus'
  import API from "@/service";
  import {ComDealResult} from '@/components'

  export default {
    mixins: [Mixins.storeMixin],
    data() {
      return {
        datas: {},
        downUrl: 'http://www.baidu.com',
        copyShow: false,
        shareHref: '',
        TEAM_ID: '',
        INVEST_ID: ''
      }
    },
    components: {ComDealResult},
    created() {
      this.datas = {...this.$route.query}
      this.shareHref = window.sessionStorage.getItem('h5_href') || ''
      this.INVEST_ID = this.$route.query.INVEST_ID
      this.TEAM_ID = this.$route.query.TEAM_ID
    },
    methods: {
      copyHandle() {
        let porId = this.$route.query.proId

        API.watchApi({
          FUNCTION_ID: 'ACB0G019', // 点位
          REMARK_DATA: '产品包装页-参与拼团-安全购买-购买成功-活动不错，分享给好友吧', // 中文备
          FROM_ID: porId,
          FROM_PR1: 3
        })

        let clipboard = new Clipboard('#copybtn')
        clipboard.on('success', (e) => {
          let porId = this.getComState.goBuy.ID
          API.watchApi({
            FUNCTION_ID: 'ACB0G019', // 点位
            REMARK_DATA: '产品包装页-参与拼团-安全购买-购买成功-活动不错，分享给好友吧', // 中文备
            FROM_ID: porId,
            FROM_PR1: '3'
          })
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
      goMyAssets(type) {
        if (type == 0) {
          // 正常购买
          API.watchApi({
            FUNCTION_ID: 'ptb0A008', // 点位
            REMARK_DATA: '异业合作-购买成功-查看我的资产',
          })
        }
        if (type == 1) {
          // 活动购买
          API.watchApi({
            FUNCTION_ID: 'ACB0G018', // 点位
            REMARK_DATA: '产品包装页-参与拼团-安全购买-购买成功-查看我的资产',
          })
        }
        this.$router.push({name: PageName.BankDetail})
      },
      goBuyOther() {
        API.watchApi({
          FUNCTION_ID: 'ptb0A009', // 点位
          REMARK_DATA: '异业合作-购买成功-购买其他产品',
        })
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
  .btn {
    margin-top: px2rem(20);
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

    p {
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

  .p-first {
    text-align: center;
    font-size: px2rem(18);
    color: #508CEE;
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


  .m-card {
    font-size: px2rem(14);
    color: #9199A1;
    border-top: 1px solid #eeeef0;
    margin-top: px2rem(20);

    p {
      display: flex;
      border-bottom: 1px solid #eeeef0;
      height: px2rem(44);
      line-height: px2rem(44);
      padding: 0 px2rem(20);
    }

    .r-left {
      text-align: left;
      flex: 1;
    }

    .r-right {
      text-align: right;
      flex: 1;
    }
  }
</style>
