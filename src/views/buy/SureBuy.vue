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
    <mt-button @click="buyHandle" class="tijiao">确认购买</mt-button>
    <p class="bang">我已阅读并同意注册
      <a style=" color:#0096FE;" href="javascript:;" @click="getAgreement('S')">《投融资平台服务协议（投资人版）》</a>
      <a style=" color:#0096FE;" href="javascript:;" @click="getAgreement('B')">《晋商银行直销银行"安鑫富"投融资协议》</a>
    </p>
    <section v-if="show" class="bgbox">
      <section class="passbox">
        <p class="title">
          <img src="@/assets/images/icon_dunpai@2x.png" alt="">
          由晋商银行提供技术保障</p>
        <section class="field_row_wrap">
          <p class="field_row_key">
            交易密码
          </p>
          <div class="field_row_value">
            <pass-input
                inputID="payPass"
            ></pass-input>
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
  import API from "@/service";

  import {PageName, BusName, LsName, imgSrc} from "@/Constant";
  import PassInput from '@/components/password/PassInput'
  import Bus from '@/plugin/bus'
  import util from "libs/util";
  import {Mixin} from '../../common/mixins'

  export default {
    data() {
      return {
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
    mixins: [Mixin],

    components: {
      PassInput
    },
    created() {
      this.datas = this.$route.query
    },

    methods: {
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
        this.Londing.open()
        setTimeout(() => {
          this.show = true
          this.Londing.close()
        }, 500)
      },
      doPay() {
        this.pass = $('#payPass').$getCiphertext()
        this.len = $('#payPass').$getPasswordLength()
        let data = {
          PRD_ID: this.datas.id + '',
          APPLY_AMOUNT: this.datas.money + '',
          BANK_PAY_PW: this.pass + ''
        }
        if (util.Check.payPassLen(this.len,true)) return;
        this.show = false
        API.buy.apiBuy(data, (res) => {
          let data = {
            BIZ_TYPE: '6',
            BESHARP_SEQ: res.BESHARP_BUY_SEQ
          }
          this.Londing.open({
            text: '正在购买中'
          })
          let i = 1
          let timer = setInterval(() => {
            i++

            API.query.apiQueryBizStatus(data, result => {
              console.log(result.RES_CODE);
              util.storage.session.set(LsName.reload, true)
              if ('1' == result.RES_CODE && i == 5) {
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
                this.$router.push({
                  name: PageName.BuySuccess,
                  query: {
                    money: this.datas.money,
                    PRD_NAME: this.datas.PRD_NAME,
                    ORG_NAME: this.datas.ORG_NAME,
                    OPERA_DATE: res.OPERA_DATE,
                    BESHARP_BUY_SEQ: res.BESHARP_BUY_SEQ
                  }
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
        }, err => {
          this.Londing.close()
          util.storage.session.set(LsName.reload, true)
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

  .bgbox {
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: fixed;
    padding-top: 0.7rem;
    top: 0;
    left: 0;
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
