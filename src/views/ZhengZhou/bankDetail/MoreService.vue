<template>
  <div style="background: #f6f6f9;height: 100%">
    <app-bar title="更多服务"></app-bar>
    <section class="m-main">
      <section v-if="DOM_SHOW.fenxiang" class="more" @click="goFengxian(toPageName.fenxian)">
             <span class="more-left">
                        风险测评</span>
        <span class="more-right">
                    {{RISK_LEVEL | RISK_TOLERANCE_LEVEL_Filter}}
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
      <section v-if="DOM_SHOW.ChangePayPassword" class="more" @click="goPage(toPageName.ChangePayPassword)">
             <span class="more-left">
                        更改支付密码</span>
        <span class="more-right">
                <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
                    </span>
      </section>
      <section v-if="DOM_SHOW.ResetPayPassword" class="more" @click="goResetPassword()">
             <span class="more-left">
                        重置密码</span>
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
          fenxiang: true,
          ChangeBank: false,
          ResetPhone: false,
          ResetPayPassword: true,
          ChangePayPassword: true
        },
        RISK_LEVEL: '',
        CARD_BANK_NAME: '',
        toPageName: {
          fenxian: PageName.FengxianResult,
          ChangeBank: PageName.ChangeBank,
          ResetPhone: PageName.ResetPhone,
          ResetPayPassword: PageName.ResetPayPassword,
          ChangePayPassword: PageName.ChangePayPassword,
          ResetPayPasswordApply: PageName.ResetPayPasswordApply,
        },
        PHONE_NUM: '',
        fenxianQuery: {},
        IF_CEPING: false
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
            return '稳健型'
            break;

          case '3':
            return '平衡性'
            break;

          case '4':
            return '成长性'
            break;

          case '5':
            return '进取型'
            break;
          default:
            return '您还未测评'
        }
      }
    },
    methods: {
      goResetPassword() {
        this.resetPayPasswordStatus()
      },
      // 重置交易密码状态查询
      resetPayPasswordStatus() {
        let data = {}
        API.safe.apiUserPasswordModification(data, res => {
          // 1 判断是否提交过查询申请
          let IS_RESET = res.IS_RESET
          let STATUS = res.STATUS
          this.IF_CEPING = true
          this.setComState({type: 'resetPasswordStatus', value: res})
          if (IS_RESET == 1 || STATUS == '') {
            this.$router.push({name: PageName.ResetPayPasswordApply})
          } else {
            // this.$router.push({name: PageName.ResetPayPasswordApply})
            this.$router.push({name: PageName.ResetPayPasswordStatus})
          }
          // CARD_FRONT_URL
          // 身份证正面
          // CARD_BACK_URL
          // 身份证反面
          // STATUS
          // 审核状态
          // 1审批中，2审批通过，3审核拒绝，4验证码超时拒绝,5其它待重新申请
          // REFUSE_REASON
          // 拒绝原因
          // IS_RESET
          // 是否有密码未重置的审核记录       1：无密码未重置记录
          // USER_NAME
          // 用户名称
          // ID_CARD_NO
          // 证件号码
          // ELECTRONIC_ACCOUNT
          // 电子账户
        })
      },
      goFengxian() {
        this.setComState({type: "loginType", value: PageName.MoreService})
        // util.storage.session.set(LsName.loginType,PageName.MoreService) // 用于跳转风险测评返回判断
        let data = this.fenxianQuery
        if (this.IF_CEPING) {
          // 测评过
          this.$router.push({
            name: PageName.FengxianResult,
            query: data
          })
        } else {
          // 没测评
          this.$router.push({
            name: PageName.VerificationSuccess,
            query: data
          })
        }
      },
      goPage(pageName) {
        this.$router.push({
          name: pageName,
        })
      },
      getInfos() {

        this.getRiskGrade()
        // this.getBankCardInfo()
      },
      //  获取风险测评结果
      getRiskGrade() {
        API.risk.apiGetRiskEvalRes({}, res => {
          this.RISK_LEVEL = res.RISK_LEVEL
          if (this.RISK_LEVEL == '') {
            this.IF_CEPING = false
          } else {
            this.IF_CEPING = true
          }
          this.setComState({type: 'RiskResult', value: res})
        })
      },
      getBankCardInfo() {
        let data = {}
        API.safe.apiBandCard(data, (res) => {
          this.setComState({
            type: 'Infos',
            value: {
              PHONE_NUM: res.PHONE_NUM,
              USER_CARD_ID: res.USER_CARD_ID,
              USER_NAME: res.USER_NAME
            }
          })
          this.CARD_BANK_NAME = res.CARD_BANK_NAME
          this.toPageName.fenxian = res.HAS_GRADE == 2
            ? PageName.FengxianResult : PageName.Riskassessment
          this.fenxianQuery = {
            RISK_LEV_EXPLAIN: res.RISK_LEV_EXPLAIN,
            RISK_TOLERANCE_DESC: res.RISK_TOLERANCE_DESC, //
            RISK_TOLERANCE_SCORE: res.RISK_TOLERANCE_SCORE, // 分数
          }

        })
      }
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
