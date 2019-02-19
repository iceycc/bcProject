<template>
  <div>
    <app-bar title="存入"></app-bar>
    <div class="buysuccessimg">
      <img src="@/assets/images/Verificationsuccess@2x.png" alt="">
      <p class="p-first">存入成功</p>
      <!--todo-->
      <!--<p v-if="TEAM_ID" class="p-second">拼团成功，持有30天，享受额外+2%收益</p>-->
      <!--<p v-if="INVEST_ID" class="p-second">持有30天，返现1%现金红包</p>-->
    </div>
    <div class="buysuccessdetail">
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">存款产品名称</div>
        <div class="buysuccessdetailright">{{datas.prdName}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">交易银行</div>
        <div class="buysuccessdetailright">{{datas.orgName}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">存入金额</div>
        <div class="buysuccessdetailright">{{datas.payAmount | formatNum}}元</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">交易申请日期</div>
        <div class="buysuccessdetailright">{{datas.payDate}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">预期开始收益日期</div>
        <div class="buysuccessdetailright">{{datas.incDate}}</div>
      </div>
      <div class="buysuccessdetails">
        <div class="buysuccessdetailleft">交易流水号</div>
        <div class="buysuccessdetailright">{{datas.besharpOrderNo}}</div>
      </div>

    </div>
    <div class="btn" v-if="!shareHref">
      <span @click="goMyAssets('0')" class="begain">查看我的资产</span>
      <span @click="goBuyOther" class="begain">购买其他产品</span>
    </div>
    <div class="btn" v-if="shareHref">
      <span @click="goMyAssets('1')" class="begain">查看我的资产</span>
    </div>
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
      <!--<img src="@/assets/images/close.png" alt="">-->
    </div>
  </div>
</template>
<script>

  import {BusName, PageName} from "@/Constant";
  import Mixins from "@/mixins";
  import Clipboard from 'clipboard'
  import Bus from '@/plugin/bus'
  import API from "@/service";

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


  .buytitle {
    width: 92%;
    height: 1.7rem;
    border-top: 10px solid #F6F6F9;
    border-bottom: 0.5rem solid #F6F6F9;
  }

  .buytitleleft {
    display: inline-block;
    width: 50%;
    height: 100%;
  }

  .buytitleright {
    float: right;
    width: 50%;
    height: 100%;
  }

  .header {

    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.4rem;
  }

  .header p {
    text-align: center;
    font-size: 0.5rem;
  }

  .buysuccessimg {
    text-align: center;
    margin-top: .6rem;

    img {
      width: 2.5rem;
      height: 2.5rem;
    }

    p.p-first {
      margin: px2rem(18) 0;
      font-size: px2rem(18);
      color: #2B74FE;
    }

    p.p-second {
      margin: 0.5rem 0;
      padding-bottom: 0.5rem;
      font-size: px2rem(13);
      color: #9199A1;
      border-bottom: 1px solid #EEEEF0;
    }
  }

  .buysuccessdetail {
    margin-top: -0.5rem;
    padding: 0 0.3rem;
  }

  .buysuccessdetails {
    line-height: px2rem(44);
    height: px2rem(44);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;
  }

  .buysuccessdetailleft {
    float: left;
    color: #9199A1
  }

  .buysuccessdetailright {
    float: right;
  }

  .xiazai {
    font-size: 0.4rem;
    color: #fff;
    background-color: #518BEE;
    border-radius: 0.2rem;
    line-height: 1.2rem;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 1rem;
    border: 0px;
    outline: none;
  }

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
