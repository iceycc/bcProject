<template>
  <div class="app">
    <app-bar title="购买"></app-bar>
    <div class="buytitle">
      <div class="buytitleleft">
        <div class="buytitleleftimg">
          <img :src="imgSrc+proDetail.logo" style="width:100%" alt="">
        </div>
        <div class="buytitleleftcontent">
          <p>{{proDetail.ORG_NAME}}</p>
          <p style="color:#666">{{proDetail.PRD_NAME}}</p>
        </div>
      </div>
      <div class="buytitleright">
        <p>起购金额{{proDetail.MIN_AMOUNT | formatNum}}元</p>
        <p>最小递增{{proDetail.INCRE_AMOUNT | formatNum}}元</p>
        <!--<p>最小递增0.00元</p>-->
      </div>
    </div>

    <div class="buysuccessdetails">
      <div class="buysuccessdetailleft">可用金额 <strong>{{payNum | formatNum}}元</strong></div>
      <div class="buysuccessdetailright" @click="goReChang">充值</div>
    </div>
    <div class="buydetails">
      <p style="margin-top: 0.3rem">购买金额</p>
      <span class="buydetailsmoney">￥</span>
      <input type="number" :placeholder="placeHolder" v-model="moneyNum">
      <img
        v-show="!ifCheckMoneyEmpty"
        src="@/assets/images/icon_clear@2x.png" alt="" class="close-icon" @click="clearNumHandle">
    </div>
    <!--<p style="font-size:0.3rem;padding:  0.4rem;color:#666">可投金额 {{proDetail.REMAIN_AMT | formatNum}}元</p>-->
    <button :class="{tijiao:true,active:canClick}" @click="goBuy" :disabled="!canClick">购买</button>
    <p @click="agree =!agree"
       :class="{'bang':true,'no':agree == false}">我已阅读并同意
      <a style=" color:#0096FE;" href="javascript:;" @click.stop="getAgreement('buy')">《日添利-博时基金 ”产品业务服务协议》</a>
    </p>

    <section v-if="show" class="bgbox">
      <section class="passbox">
        <p class="title">
          <img src="@/assets/images/icon_dunpai@2x.png" alt="">
          由郑州银行提供技术保障</p>
        <section class="field_row_wrap">
          <p class="field_row_key">
            交易密码
          </p>
          <div class="field_row_value">
            <!--<PassInputZhengzhou></PassInputZhengzhou> -->
            <pass-word-zhengzhou
              BankCardPass="payPasscc"
            ></pass-word-zhengzhou>
          </div>
          <p class="info">密码由数字组成，必须为6位</p>
        </section>
        <div class="btn">
          <mt-button @click="show =!show" type="primary">取消</mt-button>
          <mt-button @click="doPay" type="primary">提交</mt-button>
        </div>
      </section>
    </section>

  </div>
</template>
<script>
  import {PageName, BusName, imgSrc, LsName} from "@/Constant"
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import Bus from '@/plugin/bus'
  import API from "@/service"
  import Mixins from "@/mixins";
  import util from "libs/util";
  import Check from './check'

  export default {
    data() {
      return {
        proDetail: {
          MIN_AMOUNT: '200',
          INCRE_AMOUNT: '10'
        },
        moneyNum: null,
        payNum: '',
        agree: true,
        imgSrc: imgSrc,
        INCRE_AMOUNT: '',
        show: false,
        ProID: ''
      }
    },
    components: {
      PassWordZhengzhou
    },
    computed: {
      placeHolder() {
        return this.proDetail.MIN_AMOUNT + '元起购'
      },
      canClick() {
        if (Number(this.moneyNum) >= this.proDetail.MIN_AMOUNT && this.agree) {
          return true
        } else {
          return false
        }
      },
      ifCheckMoneyEmpty() {
        if (this.moneyNum) {
          return false
        } else {
          return true
        }
      }
    },
    mixins: [Mixins.HandleMixin, Mixins.StoreMixin, Check],
    created() {
      let ProID = util.storage.session.get('ProID') || this.$route.query.ProID // H5活动页外链过来的
      let query = this.$route.query // H5活动页外链过来的
      let moneyNum = query.moneyNum // H5活动页外链过来的
      let ProAndOrgType = this.getComState.ProAndOrgType
      this.setComState({type: 'ProAndOrgType', value: {...ProAndOrgType, ...query}})
      util.storage.session.set('moneyNum', moneyNum)
      if (ProID) {
        this.ProID = ProID
        this.getData(ProID)
      } else {
        this.getInfo()
        let proData = this.getComState.goBuy
        this.proDetail.MIN_AMOUNT = proData.MIN_AMOUNT // 数据
        this.proDetail.INCRE_AMOUNT = proData.INCRE_AMOUNT || '0'// 数据
        this.proDetail.logo = proData.logo || proData.LOGO_URL// 数据
        this.proDetail.id = proData.id || proData.ID// 数据
        this.proDetail.ORG_NAME = proData.ORG_NAME // 数据
        this.proDetail.PRD_NAME = proData.PRD_NAME // 数据
        this.proDetail.REMAIN_AMT = proData.REMAIN_AMT || '10000'// 数据
        this.proDetail.IDENTICAL_PRD_TAG = proData.IDENTICAL_PRD_TAG
        let ProAndOrgType = this.getComState.ProAndOrgType || {}
        if (ProAndOrgType.AMOUNT) {
          this.moneyNum = ProAndOrgType.AMOUNT
        }
        console.log(proData);
      }
    },

    methods: {
      clearNumHandle() {
        this.moneyNum = ''
      },
      getInfo() {
        // 查询账户余额
        API.bank.apiQryAsset({}, res => {
          console.log(res);
          this.payNum = res.ACC_REST // 账户余额(可用余额)
          // this.payNum = 1000// 账户余额(可用余额)
        })
      },
      getData(id) {
        let data = {
          ID: id + ""
        };
        // API.commonApi.apiGetChannelPrdInfo(data, res => {
        API.bicai.getPrdInfo(data, res => {
          this.checkAuthStatus()
          let proData = res

          this.proDetail.MIN_AMOUNT = proData.MIN_AMOUNT // 数据
          this.proDetail.INCRE_AMOUNT = proData.INCRE_AMOUNT || '0.01'// 数据
          this.proDetail.logo = proData.logo || proData.LOGO_URL// 数据
          this.proDetail.id = proData.id // 数据
          this.proDetail.ORG_NAME = proData.ORG_NAME // 数据
          this.proDetail.PRD_NAME = proData.PRD_NAME // 数据
          this.proDetail.REMAIN_AMT = proData.REMAIN_AMT || '10000'// 数据
          this.proDetail.IDENTICAL_PRD_TAG = proData.IDENTICAL_PRD_TAG
          let moneyNum = util.storage.session.get('moneyNum')
          this.moneyNum = moneyNum
          this.setComState({type: 'PRD_TYPE', value: this.proDetail.PRD_TYPE})
          this.removeComState('ProDuctData')
          let goBuyData = {
            id: id,
            logo: this.proDetail.LOGO_URL,
            ...this.proDetail
          };
          this.setComState({type: 'loginType', value: '安全购买'})
          this.setComState({type: 'goBuy', value: goBuyData})
        });
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
      checkMoneyNum(num) {
        // let a = this.proDetail.INCRE_AMOUNT
        if (num < parseInt(this.proDetail.MIN_AMOUNT)) {
          Bus.$emit(BusName.showToast, '投资金额小于起投金额，请调整投资金额')
          return true
        }
        // else if (num * 100 % (a * 100) != 0) {
        //   Bus.$emit(BusName.showToast, '请输入递增金额的整数倍')
        //   return true
        // }
        else {
          return false
        }
      },
      goBuy() {
        if (!this.agree) {
          Bus.$emit(BusName.showToast, '请同意相关协议')
          return
        }
        if (!this.moneyNum) {
          Bus.$emit(BusName.showToast, '请输入购买金额')
          return
        }
        if (typeof (this.moneyNum - 0) != 'number' || isNaN(this.moneyNum - 0)) {
          Bus.$emit(BusName.showToast, '请填写正确的金额')
          return
        }

        if (this.moneyNum - 0 > this.payNum) {
          Bus.$emit(BusName.showToast, '余额不足，请充值')
          return
        }
        if (this.checkMoneyNum(this.moneyNum)) {
          return
        }
        if (this.moneyNum - 0 > this.REMAIN_AMT) {
          Bus.$emit(BusName.showToast, '可投额度不足')
          return
        }

        this.Londing.open({
          spinnerType: 'triple-bounce'
        })
        setTimeout(() => {
          this.Londing.close()
        }, 500)

        // this.$router.push({
        //   name: PageName.SureBuy,
        //   query: {
        //     money: this.moneyNum,
        //     PRD_NAME: this.proDetail.PRD_NAME,
        //     id: this.proDetail.id,
        //     ORG_NAME: this.proDetail.ORG_NAME,
        //     logo: this.proDetail.logo,
        //   }
        // })
        this.buyHandle()
      },
      buyHandle() {
        this.Londing.open()
        setTimeout(() => {
          this.show = true
          this.Londing.close()
        }, 500)
      },
      // 交易
      doPay() {
        let pass = $("#payPasscc").getKBD(); //获取密码
        let len = $("#payPasscc").getLenKBD(); //获取密码长度
        let lenCode = $("#payPasscc").getBDCode(); //获取密码长度
        console.log(pass);

        let {
          COUPON_ID = '',
          COUPON_DETAIL_ID = '',
          TEAM_ID = '',
          INVEST_ID = ''
        } = this.getComState.ProAndOrgType
        let data = {
          TYPE: 'API_BUY',
          PRD_ID: (this.proDetail.id || this.ProID) + '',
          APPLY_AMOUNT: util.fromatMoney(this.moneyNum),
          BANK_PAY_PW: pass + '',
          PREFIX: lenCode,
          FUN_TYPE: '1', // 基金种类 基金种类 1:货币 2:非货币
          ORDER_TYPE: '1',

          COUPON_ID: COUPON_ID + '', // 优惠券ID	非必填  字符型
          COUPON_DETAIL_ID: COUPON_DETAIL_ID + '', // 会员领券记录ID
          TEAM_ID: TEAM_ID + '', //活动ID
          INVEST_ID: INVEST_ID + '' // 	投资ID
        }

        if (util.Check.payPassLen(len, true)) return;
        this.show = false
        API.buy.apiBuy(data, (res) => {
          this.polling(res)
        }, err => {
          this.Londing.close()
          this.$router.push({
            name: PageName.BuyFailed,
            query: {
              err: err
            }
          })
        })
      },
      // 轮询查询交易状态！！
      polling(res) {
        let data = {
          BIZ_TYPE: '6', // 购买
          BESHARP_SEQ: res.BESHARP_BUY_SEQ
        }
        // 交易轮询
        this.Londing.open({
          text: '正在购买中'
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
          })
        }, 2000)
      },
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
      font-size: 0.35rem;
      color: #666;
    }
  }

  .buysuccessdetails {
    padding: 0 0.4rem;
    line-height: 1.5rem;
    height: 1.5rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;
  }

  .buydetails {
    position: relative;
    padding: 0 0.4rem;
    height: 2.2rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;

    .close-icon {
      position: absolute;
      display: inline-block;
      width: px2rem(15);
      height: px2rem(15);
      top: 50%;
      right: px2rem(30);
    }
  }

  .buydetailsmoney {
    width: 1rem;
    margin-top: 0.5rem;
    font-size: 0.6rem;
  }

  .buysuccessdetailleft {
    float: left;
  }

  .buysuccessdetailright {
    color: #468EE5;
    float: right;
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
    font-size: 0.35rem;
    color: #808080;
    padding: 0 0.5rem;

  }

  .no {
    background: url(~@/assets/images/onagree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.3rem 0.3rem;
  }


  .bgbox {
    z-index: 10;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    padding-top: px2rem(70);
    top: 0;
    left: 0;
    background: rgba(1, 1, 1, .7);

    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      padding: 0.4rem;
      box-sizing: border-box;
    }

    .field_row_key {
      font-size: 0.4rem;
    }

    .title {
      margin-bottom: 0.5rem;
      text-align: center;
      font-size: 0.4rem;
      color: #666;
      height: .6rem;
      line-height: .6rem;

      img {
        vertical-align: top;
        width: .5rem;
      }
    }

    .field_row_wrap {
      margin-bottom: 0.2rem;
    }

    .field_row_value {
      border-radius: 4px;
      border: 1px solid #9e9e9e;
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 0.2rem 0;
    }

    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }

    .btn {
      display: flex;

      button {
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }
</style>
