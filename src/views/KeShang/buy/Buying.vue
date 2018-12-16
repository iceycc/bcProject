<template>
  <div id="app" class="app">
    <app-bar title="存入"></app-bar>
    <div class="buytitle">
      <div class="buytitleleft">
        <div class="buytitleleftimg">
          <img :src="imgSrc+proDetail.LOGO_URL" style="width:100%" alt="">
        </div>
        <div class="buytitleleftcontent">
          <!--<p>{{proDetail.ORG_NAME}}</p>-->
          <!--<p style="color:#666">{{proDetail.PRD_NAME}}</p>    -->
          <p>{{proDetail.PRD_NAME}}</p>
          <p style="color:#666">{{proDetail.DEPOSIT_CATEGORY}}</p>
        </div>
      </div>
      <div class="buytitleright">
        <p>起购金额{{proDetail.MIN_AMOUNT }}元</p>
        <p>最小递增{{proDetail.INCRE_AMOUNT }}元</p>
      </div>
    </div>

    <div class="buysuccessdetails">
      <div class="buysuccessdetailleft">可用金额 <strong>{{payNum | formatNum}}元</strong></div>
      <div class="buysuccessdetailright" @click="goReChang">充值</div>
    </div>
    <div class="buydetails">
      <p style="margin-top: 0.3rem">存入金额</p>
      <span class="buydetailsmoney">￥</span>
      <!--<input type="number" :placeholder="proDetail.MIN_AMOUNT" v-model="APPLY_AMOUNT">-->
      <input type="number" :placeholder="placeholder" v-model="APPLY_AMOUNT">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
    </div>
    <!--<p class="canpay">可投金额 {{proDetail.REMAIN_AMT | formatNum}}元</p>-->
    <section class="inputAmount">
            <span class="Amount">
                验证码
            </span>
      <input type="tel" v-model="msgCode" placeholder="输入验证码">
      <button
        :disabled="msgdisable"
        @click="getCode"
        class="button">{{codeText}}
      </button>
    </section>
    <button :class="{tijiao:true,active:canClick}" @click="goBuy" :disabled="!canClick">存入</button>
    <p @click="agree =!agree"
       :class="{'bang':true,'no':agree == false}">我已阅读并同意
      <a style=" color:#0096FE;" href="javascript:;" @click.stop="getAgreement('buy')">《客商产品服务协议》</a>
    </p>

  </div>
</template>
<script>
  import {PageName, BusName, imgSrc, LsName} from "@/Constant"
  import Bus from '@/plugin/bus'
  import API from "@/service"
  import Mixins from "@/mixins";
  import util from "libs/util";


  let time = 60
  let timer;
  export default {
    data() {
      return {
        proDetail: {},
        APPLY_AMOUNT: null,
        payNum: '0',
        agree: true,
        imgSrc: imgSrc,
        INCRE_AMOUNT: '',
        msgCode: '',
        msgdisable: false,
        codeText: '获取验证码',
        MESAGE_TOKEN: '',
        BANK_ACCT_NO: '', //电子账户
        BANK_USER_ID: '' //银行用户ID
      }
    },
    computed: {
      placeholder() {
        let num = this.proDetail.MIN_AMOUNT || '0'
        return num + '元起购'
      },
      ifCheckMoneyEmpty() {
        if (this.APPLY_AMOUNT) {
          return false
        } else {
          return true
        }
      },
      canClick() {
        if (Number(this.APPLY_AMOUNT) <= Number(this.payNum) && Number(this.APPLY_AMOUNT) >= this.proDetail.MIN_AMOUNT && this.msgCode && this.agree) {
          return true
        } else {
          return false
        }
      }
    },
    mixins: [Mixins.StoreMixin, Mixins.ToBuying],
    created() {
      // let ProID = util.storage.session.get('ProID') || this.$route.query.ProID // H5活动页外链过来的
      // let moneyNum = this.$route.query.moneyNum // H5活动页外链过来的
      // util.storage.session.set('moneyNum', moneyNum)
      // this.getInfo()
      // todo测试用
      // this.getProData(17897)
      // this.proDetail = this.getComState.goBuy // 数据
      // console.log(this.proDetail);
    },
    methods: {
      initData(proData) {
        this.getInfo() // 用于查询账户余额
        this.proDetail = proData
        // 判断是否有外链钱的数据 登录流程来的
        if (proData.AMOUNT) {
          this.APPLY_AMOUNT = proData.AMOUNT
        }
        // 链接流程来的
        let moneyNum = this.$route.query.moneyNum || util.storage.session.get('moneyNum')
        if (moneyNum) {
          this.APPLY_AMOUNT = moneyNum
        }

      },
      // 查询账户余额
      getInfo() {
        // 查询账户余额
        API.bank.apiQryEleAccount({}, res => {
          this.payNum = res.ACC_REST // 账户余额(可用余额)
          // this.payNum = 1000// 账户余额(可用余额)
        }, err => {
          // this.payNum =1000
        })
        API.safe.apiBandCard({}, res => {
          this.BANK_ACCT_NO = res.CARD_LIST[0].CARD_NUM
          this.BANK_USER_ID = res.BANK_USER_ID
        })
      },

      clearNumHandle() {
        this.APPLY_AMOUNT = ''
      },
      goReChang() {
        this.setComState({
          type: 'OriginPage',
          value: this.$route.fullPath
        })

        this.$router.push({
          name: PageName.Recharge,
        })
      },
      getAgreement(type) {
        this.agree = true
        this.$router.push({
          name: PageName.DocsPage,
          query: {
            type,
          }
        })
      },
      checkAPPLY_AMOUNT(num) {
        let a = this.proDetail.INCRE_AMOUNT
        if (num < parseInt(this.proDetail.MIN_AMOUNT)) {
          Bus.$emit(BusName.showToast, '投资金额小于起投金额，请调整投资金额')
          return true
          // } else if (num % a != 0) {
          // Bus.$emit(BusName.showToast, '请输入递增金额的整数倍')
          // return true
        } else {
          return false
        }
      },
      goBuy() {
        if (!this.agree) {
          Bus.$emit(BusName.showToast, '请同意相关协议')
          return
        }
        if (!this.APPLY_AMOUNT) {
          Bus.$emit(BusName.showToast, '请输入存入金额')
          return
        }
        if (typeof (this.APPLY_AMOUNT - 0) != 'number' || isNaN(this.APPLY_AMOUNT - 0)) {
          Bus.$emit(BusName.showToast, '请填写正确的金额')
          return
        }

        if (this.APPLY_AMOUNT - 0 > this.payNum) {
          Bus.$emit(BusName.showToast, '余额不足，请充值')
          return
        }
        if (this.checkAPPLY_AMOUNT(this.APPLY_AMOUNT)) {
          return
        }
        if (this.APPLY_AMOUNT - 0 > this.REMAIN_AMT) {
          Bus.$emit(BusName.showToast, '可投额度不足')
          return
        }

        this.Londing.open({
          spinnerType: 'triple-bounce'
        })
        setTimeout(() => {
          this.Londing.close()
        }, 500)
        this.doPay()
        // this.$router.push({
        //   name: PageName.SureBuy,
        //   query: {
        //     money: this.APPLY_AMOUNT,
        //     PRD_NAME: this.proDetail.PRD_NAME,
        //     id: this.proDetail.id,
        //     ORG_NAME: this.proDetail.ORG_NAME,
        //     logo: this.proDetail.logo,
        //   }
        // })

      },
      // 轮询查询交易状态！！

      getCode() { // 短信
        let TEL = this.getComState.Infos.PHONE_NUM
        let data = {
          PHONE_NUM: TEL,
          BIZ_TYPE: '4', // 购买众邦需要
          BANK_ACCT_NO: this.BANK_ACCT_NO,
          BANK_USER_ID: this.BANK_USER_ID
        }
        API.common.apiSendPhoneCode(data, res => {
          this.getMsg()
          this.MESAGE_TOKEN = res.MESSAGE_TOKEN
          Bus.$emit(BusName.showSendMsg, TEL)
        })
      },
      getMsg() {
        let times = time
        this.msgdisable = true
        timer = setInterval(() => {
          if (times == 0) {
            this.codeText = '重新发送'
            this.msgdisable = false
            clearInterval(timer)
            return
          }
          times--
          this.codeText = `${times}s`
        }, 1000)
      },
      polling(res) {
        let data = {
          BIZ_TYPE: '6', // 购买
          BESHARP_SEQ: res.BESHARP_BUY_SEQ
        }
        // 交易轮询
        this.Londing.open({
          text: '正在存入中'
        })
        let i = 1
        let timer = setInterval(() => {
          i++
          API.common.apiQueryBizStatus(data, result => {
            if ('1' == result.RES_CODE || i == 5) {
              this.Londing.close()
              clearInterval(timer)
              Bus.$emit(BusName.showToast, result.RES_MSG);
              this.$router.push({
                name: PageName.BuyFailed,
                query: {
                  err: result.RES_MSG
                }
              })
            } else if ('0' == result.RES_CODE) { // 成功
              clearInterval(timer)
              Bus.$emit(BusName.showToast, result.RES_MSG);
              this.Londing.close()
              this.setComState({type: 'buyData', value: result})
              this.$router.push({
                name: PageName.BuySuccess,
              })
              return
            } else {
              if (i > 5) {
                clearInterval(timer)
                Bus.$emit(BusName.showToast, result.RES_MSG);
                this.$router.push({
                  name: PageName.BuyFailed,
                  query: {
                    err: result.RES_MSG
                  }
                })
                return
              }
            }
          }, err => {
            clearInterval(timer)
            Bus.$emit(BusName.showToast, err);

          })
        }, 2000)
      },
      // 交易
      // TYPE	请求类型
      // ORG_ID	机构ID
      // PRD_ID	产品ID
      // APPLY_AMOUNT	购买金额
      // PHONE_CODE	短信验证码
      // ACCEPT_RISK	超出客户风险承受力时必填，需要确认  0 或空 表示未确认 1 表示已确认
      doPay() {

        let {
          COUPON_ID = '',
          COUPON_DETAIL_ID = '',
          TEAM_ID = '',
          INVEST_ID = ''
        } = this.getComState.ProAndOrgType

        let data = {
          PRD_ID: (this.proDetail.ID || this.proDetail.PRD_INDEX_ID) + '',
          TYPE: 'API_BUY',
          APPLY_AMOUNT: this.APPLY_AMOUNT + '',
          PHONE_CODE: this.msgCode,
          PRD_TYPE: this.proDetail.PRD_TYPE_ID + '',
          MESAGE_TOKEN: this.MESAGE_TOKEN,


          COUPON_ID: COUPON_ID + '', // 优惠券ID	非必填  字符型
          COUPON_DETAIL_ID: COUPON_DETAIL_ID + '', // 会员领券记录ID
          TEAM_ID: TEAM_ID + '', //活动ID
          INVEST_ID: INVEST_ID + '' // 	投资ID
        }
        console.log(data);
        API.buy.apiBuy(data, (res) => {
          this.polling(res)
        }, err => {
          this.Londing.close()
          this.setComState({type: "reload", value: true}) // reload-001
          this.$router.push({
            name: PageName.BuyFailed,
            query: {
              err: err
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  body {
    margin: 0;
    padding: 0;
  }

  .buytitle {
    width: 92%;
    padding: 0.4rem 0.4rem;
    border-top: 10px solid #F6F6F9;
    border-bottom: 0.5rem solid #F6F6F9;
    display: flex;

    .buytitleleft {
      display: inline-block;
      flex: 1;

      .buytitleleftimg {
        vertical-align: middle;
        padding-top: 0.2rem;
        width: 1rem;
        display: inline-block;

      }

      .buytitleleftcontent {
        vertical-align: middle;
        padding-top: -0.5rem;
        display: inline-block;
        padding-left: 0.4rem;
        font-size: 0.35rem;
      }
    }

    .buytitleright {
      float: right;
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 0.35rem;
      color: #666;
    }
  }

  .canpay {
    font-size: 0.3rem;
    padding: px2rem(20);
    color: #666
  }

  .buysuccessdetails {
    padding: 0 px2rem(20);
    line-height: 1.5rem;
    height: 1.5rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;

    .buysuccessdetailleft {
      float: left;
    }

    .buysuccessdetailright {
      color: #468EE5;
      float: right;
    }
  }

  .buydetails {
    position: relative;
    padding: 0 px2rem(20);
    height: 2.2rem;
    font-size: 0.4rem;

    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      right: px2rem(30);
    }

    border-bottom: 1px solid #EEEEF0;

    .buydetailsmoney {
      width: 1rem;
      margin-top: 0.5rem;
      font-size: 0.6rem;
    }

    input {
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: 14px; /*px*/
      color: #333;
      line-height: 40px;
      outline: none;
    }

    ::-webkit-input-placeholder {
      font-size: 0.6rem
    }

    /* 使用webkit内核的浏览器 */
    :-moz-placeholder {
      font-size: 0.6rem
    }

    /* Firefox版本4-18 */
    ::-moz-placeholder {
      font-size: 0.6rem
    }

    /* Firefox版本19+ */
    :-ms-input-placeholder {
      font-size: 0.6rem
    }
  }

  .tijiao {
    font-size: px2rem(18);
    color: #fff;
    background: #ccc;
    border-radius: px2rem(6);
    line-height: 1.2rem;
    width: px2rem(255);
    margin: px2rem(30) auto px2rem(10);
    text-align: center;
    border: 0px;
    outline: none;
    display: block;

    &.active {
      background: #508CEE;
    }
  }

  .bang {
    margin-left: 0.5rem;
    background: url(~@/assets/images/agree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.3rem 0.3rem;
    font-size: px2rem(12);
    color: #808080;
    padding: 0 0.5rem;

  }

  .no {
    background: url(~@/assets/images/onagree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.3rem 0.3rem;
  }

  .inputAmount {
    padding-left: px2rem(20);
    height: px2rem(40);
    line-height: px2rem(40);
    font-size: px2rem(14);
    border-bottom: 1px solid #EEEEF0;

    .button {
      vertical-align: middle;
      font-size: px2rem(14);
      width: px2rem(84);
      height: px2rem(28);
      line-height: px2rem(28);
      display: inline-block;
      border: 1px solid #508CEE;
      border-radius: px2rem(6);
      color: #508CEE
    }

    input {
      padding-left: px2rem(10);
      width: px2rem(200);
      border: none;
      box-sizing: border-box;
      font-size: px2rem(14);
      color: #333;
      outline: none;
    }
  }
</style>
