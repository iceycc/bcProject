<template>
  <div class="app">
    <app-bar title="购买"></app-bar>
    <div class="buytitle" style=" padding:0 0.4rem">
      <div>
        <div class="buytitleleftimg">
          <img :src="imgSrc+datas.logo" style="width:100%" alt="">
        </div>
        <div class="buytitleleftcontent">
          <p>{{datas.PRD_NAME}}</p>
          <p style="color:#666">理财产品</p>
        </div>

      </div>
    </div>
    <div class="buytitlemoney">
      <p class="buytitlemoneyjine">购买金额</p>
      <p class="buytitlemoneyshu"> ￥ {{datas.money}}</p>
    </div>
    <div class="jiaoyibank">
      <div class="jiaoyibankname">交易银行</div>
      <div class="jiaoyibankzhixiaoname">{{datas.ORG_NAME}}</div>
    </div>
    <section class="inputAmount">
            <span class="Amount">
                验证码
            </span>
      <input type="text" v-model="msgCode" placeholder="请填写短信验证码">
      <button
        :disabled="msgdisable"
        @click="getMsg"
        class="button">{{codeText}}
      </button>
    </section>
    <mt-button @click="buyHandle" class="tijiao">确认购买</mt-button>
    <p class="bang">我已阅读并同意注册
      <a style=" color:#0096FE;" href="javascript:;" @click="getAgreement('S')">《投融资平台服务协议（投资人版）》</a>
      <a style=" color:#0096FE;" href="javascript:;" @click="getAgreement('B')">《晋商银行直销银行"安鑫富"投融资协议》</a>
    </p>

  </div>
</template>
<script>
  import API from "@/service";
  import {PageName, BusName, LsName, imgSrc} from "@/Constant";
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import Bus from '@/plugin/bus'
  import util from "libs/util";
  // import {HandleMixin, } from '@/mixins'
  import Mixins from "@/mixins";


  let time = 60
  let timer;
  export default {
    data() {
      return {
        msgdisable: false,
        msgCode: '',
        disable: false,
        codeText: '获取验证码',
        show: false,
        money: null,
        datas: {},
        imgSrc: imgSrc,
        toUrl: '',
        pass: "",
        len: 0,
        banck: '',
      }
    },
    mixins: [Mixins.HandleMixin],
    components: {
      PassWordZhengzhou
    },
    created() {
      this.datas = this.$route.query
    },
    methods: {
      getCode() { // 充值短信
        let data = {
          PHONE_NUM: this.PHONE_NUM,
          BIZ_TYPE: '1008', // 购买众邦需要
          AMOUNT: this.APPLY_AMOUN
        }
        API.common.apiSendPhoneCode(data)
      },
      getMsg() {
        let times = time
        this.disable = true
        timer = setInterval(() => {
          if (times == 0) {
            this.codeText = '重新发送'
            this.disable = false
            clearInterval(timer)
            return
          }
          times--
          this.codeText = `${times}s`
        }, 1000)
        this.getCode()
      },
      getAgreement(type) {
        this.$router.push({
          name: PageName.DocsPage,
          query: {
            type,
            id: this.datas.id
          }
        })

      },
      buyHandle() {
        this.doPay()
      },
      // 轮询查询交易状态！！
      polling(res) {
        let data = {
          BIZ_TYPE: '6', // 购买
          BESHARP_SEQ: res.BESHARP_ORDER_NO
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
            }
            else if ('0' == result.RES_CODE) { // 成功
              clearInterval(timer)
              Bus.$emit(BusName.showToast, result.RES_MSG);
              this.Londing.close()
              let buyData = {
                money: this.datas.money, // 金额
                PRD_NAME: this.datas.PRD_NAME, // 产品名称
                ORG_NAME: this.datas.ORG_NAME, // 机构名称
                OPERA_DATE: res.OPERA_DATE, // 交易日期
                BESHARP_BUY_SEQ: res.BESHARP_SEQ, // 流水号
                EXPECT_PROFIT_DATE: res.INC_DATE// TODO 缺字段 预计收益日期

              }
              this.setComState({type: 'buyData', value: buyData})
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
        let data = {
          PRD_ID: '17819',
          // PRD_ID: this.datas.id + '',
          TYPE: 'API_BUY',
          APPLY_AMOUNT: this.datas.money + '',
          PHONE_CODE: this.msgCode,
          ACCEPT_RISK: '1'
        }
        API.buy.apiBuy(data, (res) => {
          this.polling(res)
        }, err => {
          this.Londing.close()
          this.setComState({type: "reload", value: true}) // reload-001
          this.$router.push({
            name: PageName.BuyFailed,
            query: {
              err: err.RES_MSG
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .buytitle {
    padding: 0 0.4rem;
  }

  .buytitleleftimg {
    padding-top: 0.3rem;
    width: 1rem;
    display: inline-block;
  }

  .buytitleleftcontent {
    font-size: 0.4rem;
    padding-top: -0.5rem;
    display: inline-block;
    padding-left: 0.4rem;
    font-size: 0.35rem
  }

  .buytitlemoney {
    text-align: center;
    margin-top: 0.4rem
  }

  .buytitlemoneyjine {
    color: #666
  }

  .buytitlemoney .buytitlemoneyshu {
    color: #FF841A;
    margin: 0.4rem 0;
    font-size: 0.8rem
  }

  .jiaoyibank {
    height: 1rem;
    width: 100%;
    line-height: 1rem;
    border-top: 1px solid #EEEEF0;
    border-bottom: 1px solid #EEEEF0
  }

  .jiaoyibank .jiaoyibankname {
    margin-left: 0.4rem;
    float: left;
    color: #666
  }

  .jiaoyibank .jiaoyibankzhixiaoname {
    margin-right: 0.4rem;
    float: right;
  }

  .tijiao {
    font-size: 0.5rem;
    color: #fff;
    background-color: #518BEE;
    border-radius: 0.2rem;
    line-height: 1.2rem;
    height: 1.2rem;
    width: 80%;
    margin: 0.5rem auto 0;
    text-align: center;
    outline: none;
    display: block;
  }

  .bang {
    margin-top: 0.5rem;
    background: url(~@/assets/images/agree@3x.png) no-repeat 0.2rem 0.05rem;
    font-size: 0.3rem;
    color: #808080;
    background-size: 0.4rem 0.4rem;
    padding: 0 0.8rem;
  }

  .passBox {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(1, 1, 1, 0.3);
    .inputbox {
      width: 80%;
      margin: 1rem auto;
      background: #fff;
    }
  }

  .inputAmount {
    padding-left: 0.5rem;
    height: 1.2rem;
    line-height: 1rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #EEEEF0;
    .button {
      vertical-align: middle;
      width: 2.5rem;
      display: inline-block;
      padding: .1rem;
      border: 1px solid #508CEE;
      color: #508CEE
    }
    input {
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: 0.4rem;
      color: #333;
      /* line-height: 0.5rem; */
      outline: none;

    }
  }

</style>
