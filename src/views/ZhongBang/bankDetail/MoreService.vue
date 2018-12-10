<template>
  <div style="background: #f6f6f9;height: 100%">
    <app-bar title="更多服务"></app-bar>
    <section class="m-main">
      <section v-if="DOM_SHOW.fenxiang" class="more" @click="goPage(toPageName.fenxian)">
             <span class="more-left">
                        风险测评</span>
        <span class="more-right">
                    {{RISK_TOLERANCE_LEVEL | RISK_TOLERANCE_LEVEL_Filter}}
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
      </section>
      <!--BindingBank-->
      <section v-if="DOM_SHOW.BindingBank" class="more" @click="goPage(toPageName.BindingBank)">
             <span class="more-left">
                        银行卡管理</span>
        <span class="more-right">
                    已绑定{{CARD_BANK_NAME}}
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
      </section>
      <section v-if="DOM_SHOW.ChangeBank" class="more" @click="goPage(toPageName.ChangeBank)">
             <span class="more-left">
                        更换银行卡</span>
        <span class="more-right">
                    已绑定{{CARD_BANK_NAME}}
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
      </section>
      <section v-if="DOM_SHOW.ResetPhone" class="more" @click="goPage(toPageName.ResetPhone)">
             <span class="more-left">
                        更换绑定手机号</span>
        <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
      </section>
      <section v-if="DOM_SHOW.ResetPayPassword" class="more" @click="goPage(toPageName.ResetPayPassword)">
             <span class="more-left">
                        更换支付密码</span>
        <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
      </section>

    </section>
  </div>
</template>

<script>
  import IconFont from '@/components/commons/IconFont'
  import API from "@/service";
  import {LsName, PageName} from "@/Constant";
  import util from "libs/util";


  export default {
    name: "MoreService",
    components: {
      IconFont
    },
    mixins: [],
    data() {
      return {
        // 功能展示
        DOM_SHOW: {
          fenxiang: false,
          ChangeBank: false,
          BindingBank: true,
          ResetPhone: false,
          ResetPayPassword: false
        },
        RISK_TOLERANCE_LEVEL: '',
        CARD_BANK_NAME: '',
        toPageName: {
          fenxian: PageName.FengxianResult,
          ChangeBank: PageName.ChangeBank,
          BindingBank: PageName.BindingBank,
          ResetPhone: PageName.ResetPhone,
          ResetPayPassword: PageName.ResetPayPassword,
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
      getBankInfo() {
        let OldBankInfo = this.getComState.Infos.hasCardList[0]
        this.CARD_BANK_NAME = OldBankInfo.BANK_NAME
      },
      goPage(pageName) {
        let data = {}
        console.log(pageName);
        if (pageName == PageName.FengxianResult) {
          this.setComState({type: "loginType", value: PageName.MoreService})
          // util.storage.session.set(LsName.loginType,PageName.MoreService) // 用于跳转风险测评返回判断
          data = this.fenxianQuery
        }
        else {
          data = {}
        }
        this.$router.push({
          name: pageName,
          query: data
        })
      },
      getInfos() {
        // this.getRiskGrade()
        this.getBankInfo()
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
</style>
