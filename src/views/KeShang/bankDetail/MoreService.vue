<template>
  <div style="background: #f6f6f9;height: 100%;position:relative">
    <app-bar title="更多服务"></app-bar>
    <section class="m-main">
      <!--BindingBank-->
      <section v-if="DOM_SHOW.BindingBank" class="more" @click="goPage(toPageName.BindingBank)">
             <span class="more-left">
                        绑定银行卡管理</span>
        <span class="more-right">
                    <!--已绑定{{CARD_BANK_NAME}}-->
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
      </section>
    </section>
    <section class="waiting" v-if="infoShow">
      <p>暂不支持</p>
      <button @click="close">确定</button>
    </section>
  </div>
</template>

<script>
  import IconFont from '@/components/commons/IconFont'
  import {LsName, PageName} from "@/Constant";
  import {BusName} from "../../../Constant";
  import Bus from '@/plugin/bus'
  import API from "@/service";


  export default {
    name: "MoreService",
    components: {
      IconFont
    },
    mixins: [],
    data() {
      return {
        infoShow: false,
        // 功能展示
        DOM_SHOW: {
          BindingBank: true,
        },
        RISK_TOLERANCE_LEVEL: '',
        CARD_BANK_NAME: '',
        toPageName: {
          BindingBank: PageName.BindingBank,
        },
        PHONE_NUM: '',
        fenxianQuery: {},

      }
    },
    created() {
      this.getInfos()
    },
    filters: {
      RISK_TOLERANCE_LEVEL_Filter(val) {
        switch (val) {
          case '1':
            return '保守型'
            break;

          case '2':
            return '谨慎型'
            break;

          case '3':
            return '稳健型'
            break;

          case '4':
            return '积极型'
            break;

          case '5':
            return '激进型'
            break;
        }
      }
    },
    methods: {
      close() {
        this.infoShow = false
      },
      getBankInfo() {
        API.safe.apiBandCard({}, res => {
          let OldBankInfo = res.CARD_LIST[0]
          this.CARD_BANK_NAME = OldBankInfo.CARD_BANK_NAME
        })
        // let OldBankInfo = this.getComState.Infos.hasCardList[0]
        // this.CARD_BANK_NAME = OldBankInfo.BANK_NAME
      },
      goPage(pageName) {
        // this.infoShow = true
        // return
        let data = {}
        console.log(pageName);
        if (pageName == PageName.FengxianResult) {
          this.setComState({type: "loginType", value: PageName.MoreService})
          // util.storage.session.set(LsName.loginType,PageName.MoreService) // 用于跳转风险测评返回判断
          data = this.fenxianQuery
        } else {
          data = {}
        }
        this.$router.push({
          name: pageName,
          query: data
        })
      },
      getInfos() {

        // this.getRiskGrade()
        // this.getBankInfo()
      },
      //  获取风险测评结果
      getRiskGrade() {
        // API.risk.apiRiskGrade({},res=>{})
      },
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .m-main {
    margin-top: px2rem(10);
  }

  .more {
    font-size: px2rem(14);
    padding: 0 px2rem(20);
    height: px2rem(50);
    line-height: px2rem(50);
    box-sizing: border-box;
    display: flex;
    background: #fff;

    .more-left {
      flex: 1;
      vertical-align: middle;
    }

    .more-right {
      color: #6e6e6e;
      font-size: px2rem(12);
    }

    .detail {
      color: #6e6e6e;
      font-size: px2rem(12);

    }

    margin-bottom: px2rem(1);
  }

  .waiting {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: px2rem(270);
    height: px2rem(107);
    background: #fff;
    border-radius: px2rem(6);
    z-index: 100;
    text-align: center;

    p {
      padding-top: px2rem(20);
      font-size: px2rem(16);
      color: #333;
    }

    button {
      padding-top: px2rem(25);
      color: #508CEE;
      font-size: px2rem(17);
    }
  }
</style>
