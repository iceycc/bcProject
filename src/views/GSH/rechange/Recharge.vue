<template>
  <div class="main">
    <app-bar title="充值"></app-bar>
    <div class="s-title">充值到{{orgName}}</div>
    <div class="bank-card">
      <span class="logo">
        <img :src="imgSrc + logo" style="width:75%" alt="">
      </span>
      <div class="card-info">
        <p>{{orgName}}</p>
        <p>**** **** **** {{bankUserCode.substr(bankUserCode.length - 4)}}</p>
      </div>

    </div>
    <div class="s-title">银行卡</div>
    <div class="bank-card" @click="clickBank" style="border-bottom:1px solid #EEEEF0">
      <span class="logo">
        <img :src="imgSrc + cardBankUrl" style="width:75%" alt="">
      </span>
      <div class="card-info">
        <p>{{cardBankName}}</p>
        <p>**** **** **** {{cardNum.substr(cardNum.length - 4)}}</p>
      </div>
      <icon-font iconClass="icon-xiangyou" iconStyle="detail"></icon-font>
    </div>
    <div class="money-limit">
      <p>每日限额：{{dayQuota | BankLimit}}，单笔限额：{{singleQuota | BankLimit}}</p>
      <!--<p></p>-->
      <!--<p>单笔限额：{{SINGLE | formatNum}}</p>-->
    </div>
    <section class="money-box">
      <span class="left">金额</span>
      <input
        @input="inputHandle"
        v-model="amount" type="number" placeholder="请输入金额">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
    </section>
    <submit-button
      bgColor="lightBlue"
      class="submit-btn"
      text="确认充值"
      :canSubmit="canClick"
      @submit="doNext"
    ></submit-button>
    <sign-areement
      v-if="ifHasArgreement"
      :agree="agree"
      @sign="agree =!agree"
      :options="[{name:'《充值委托代扣协议》',type:'recharge'}]"
    ></sign-areement>
    <up-select
      title="选择银行卡"
      :show="upseletShow"
      :BankList="mainBankList"
      @chooseBank="chooseBank"
      @addBank="addBankHandle"
      bottomText="绑定其它银行卡"
    ></up-select>
  </div>
</template>
<script>
  import {HOST_API, LsName} from '@/Constant'
  import Bus from '@/plugin/bus'
  import {PageName, imgSrc, BusName} from "@/Constant";
  import util from "@/libs/util";
  import Mixins from "@/mixins";
  import RechangeMixins from "./Rechange";
  import API from "@/service"
  import {
    SubmitButton,
    SignAreement,
    IconFont,
    UpSelect
  } from '@/components'

  export default {
    data() {
      return {
        page: false,
        amount: '',
        toUrl: '',
        ifGet: false,
        write: false, // 是否签约
        agree: true, // 是否阅读

        orgName: '',
        cardNum: '', //一类户卡号
        bankUserCode: '', //二类户卡号
        userCardId: '', //银行用户ID
        MESAGE_TOKEN: '', //短信验证码标识
        imgSrc: imgSrc,
        logo: '',
        cardBankName: '',
        cardBankUrl: '',
        dayQuota: '-1', // 单日限额
        singleQuota: '-1', // 单比限额
        upseletShow: false,
        mainBankList: [],
        passCode: '',
        phoneNum: '',

        ORIGIN_PAGE: '',// 来源页面
        SINGLE: '',

        ifHasArgreement: false, // 是否有协议
      }
    },
    components: {
      UpSelect,
      IconFont,
      SubmitButton,
      SignAreement
    },
    mixins: [Mixins.queryStatus, RechangeMixins],
    created() {
      this.getRechargeAgreementByAjax()
      this.getInfos()
      this.ORIGIN_PAGE = this.$route.query.ORIGIN_PAGE || ''
    },
    computed: {
      ifCheckMoneyEmpty() {
        if (this.amount) {
          return false
        } else {
          return true
        }
      },
      canClick() {
        if (Number(this.amount - 0) && this.agree) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      inputHandle(e) {
        console.log(Number('' + this.amount));
      },
      chooseBank(bank) {
        console.log(bank);
        this.cardBankName = bank.cardBankName;// 银行名称
        this.cardBankUrl = bank.cardBankUrl
        this.dayQuota = bank.dayQuota
        this.singleQuota = bank.singleQuota
        this.cardNum = bank.cardNum
      },
      addBankHandle() {
        // todo 添加完成后跳回
        this.$router.push({name: PageName.AddNewBank, query: {fromPage: this.$route.fullPath}})
      },
      clearNumHandle() {
        this.amount = ''
      },
      doAgreeHandle() {
        this.agree = true
        this.page = false
      },
      cancel() {
        this.page = false
      },
      // 获取充值协议 现阶段是为了判断是否有协议返回，动态配置是否有协议
      async getRechargeAgreementByAjax() {
        let data = {}
        try {
          let res = await API.doc.rechargeAgreement(data)
          if (res && res.url) {
            this.ifHasArgreement = true
          } else {
            this.ifHasArgreement = false
          }
        } catch (e) {
          this.ifHasArgreement = false
        }
      },
      doNext() {
        API.watchApi({
          FUNCTION_ID: 'ptb0A016', // 点位
          REMARK_DATA: '异业合作-购买页面-充值-确认充值按钮', // 中文备注
          FROM_ID: util.storage.session.get('ORG_ID') || ''
        })
        console.log(this.write);
        // 校验
        // // 空值 通过按钮置灰提前校验
        if (this.amount - 0 > this.dayQuota - 0 && this.dayQuota != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行每日限额规定，请调整充值金额')
          return
        }
        if (this.amount - 0 > this.singleQuota - 0 && this.singleQuota != '-1') {
          Bus.$emit(BusName.showToast, '充值金额大于银行单笔限额规定，请调整充值金额')
          return
        }
        this.handleApiRecharge()
      },
      doAgree() {
        this.agree = !this.agree
      },
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #f6f6f9;
  }

  .s-title {
    padding-left: px2rem(20);
    height: px2rem(30);
    line-height: px2rem(30);
    background: #F6F6F9;
    color: #444444;
    font-size: px2rem(12);
  }

  .bank-card {
    position: relative;
    padding-left: px2rem(20);
    height: px2rem(72);
    font-size: px2rem(20);
    display: flex;
    align-items: center;
    background: #fff;

    .logo {
      width: px2rem(50);
    }

    .card-info {
      font-size: px2rem(16);

      p:last-child {
        color: #9199A1;
      }
    }

    .detail {
      right: px2rem(20);
      top: px2rem(15);
      color: #999999;
      position: absolute;
    }
  }

  .money-limit {
    padding-left: px2rem(20);
    height: px2rem(45);
    line-height: px2rem(45);
    color: #999;
    font-size: px2rem(14);
    background: #fff;
  }

  .money-box {
    position: relative;
    padding: 0 px2rem(20);
    font-size: px2rem(16);
    height: px2rem(44);
    line-height: px2rem(44);
    border-bottom: 1px solid #EEEEF0;
    background: #fff;
    display: flex;
    margin-top: px2rem(12);

    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      transform: translateY(-50%);
      right: px2rem(30);
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      padding-right: px2rem(30);
      box-sizing: border-box;
      font-size: px2rem(20);
      color: #333;
    }

    .left {
      display: inline-block;
      color: #444;
      width: px2rem(60);
    }
  }

  .submit-btn {
    margin-top: px2rem(60);
    margin-bottom: px2rem(20);
  }

</style>
