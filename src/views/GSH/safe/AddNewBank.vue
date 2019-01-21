<template>
  <div>
    <app-bar title="添加新银行卡"></app-bar>
    <section class="m-form">
      <section class="bank">
        <span class="n-left">选择银行</span>
        <!--<input type="text" name="back" placeholder=" 请选择开户银行" v-model="data.ORG_ID">-->
        <!-- <span  class="limit">银行限额</span>  -->
        <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                     title="银行列表"></Bank-select>

      </section>
      <active-input check-type="number" valuePlaceholder="新绑定卡卡号" v-model="bankNo" max="20"
                    @changeHandle="changeHandle"></active-input>
      <active-input check-type="number" valuePlaceholder="手机号码" v-model="bankTel" max="11"></active-input>
      <active-input check-type="code" valuePlaceholder="验证码" v-model="msgCode" max="6" onautocomplete="false">
        <template slot="btn">
          <button class="slot" @click="getMsgCode" :disabled="disable">{{codeText}}</button>
        </template>
      </active-input>
      <section class="submit-box">
        <!--<err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>-->
        <button class="submit-btn" @click="goNext">下一步</button>
      </section>
      <!--<section class="foot-text">-->
      <!--<p>温馨提示：</p>-->
      <!--<p>1.请您确认新绑定银行卡在银行绑定的手机号与旧卡 绑定手机号相同。</p>-->
      <!--<p>2.更换绑定银行卡前，请转出所有的投资资金并提现</p>-->
      <!--</section>-->
      <!--<bank-card-limit v-if="bankLimitShow"></bank-card-limit>-->
    </section>
  </div>
</template>

<script>
  import BankSelect from '@/components/keshang/KshBankSelect'
  import ActiveInput from '@/components/commons/ActiveInput'
  import ErrMsg from '@/components/commons/ErrMsg'
  import API from "@/service";
  import {imgSrc, BusName, LsName, PageName} from "@/Constant";
  import Bus from '@/plugin/bus'
  import Mixins from "@/mixins";
  import util from "libs/util";

  // import BankCardLimit from '@/components/keshang/BankCardLimit'
  let timer;
  export default {
    name: "changeBank",
    components: {
      BankSelect,
      ActiveInput,
      ErrMsg,
      // BankCardLimit
    },
    data() {
      return {
        bankText: '请选择开户银行',
        bankList: [],
        AllBankListObj: {},
        bankLimitShow: false,
        errMsg: '',
        bankNo: '',
        msgCode: '',
        codeText: '获取验证码',
        disable: false,
        bankTel: '',
        MESAGE_TOKEN: '',
        bankNameToNo: false,
        params: {},
        ifGet: false,
        OldBankInfo: {},
        time: 60
      }
    },
    mixins: [Mixins.HandleMixin],
    created() {
      this.getBankList()
      this.getOldBankInfo()
      // this.params = util.storage.session.get(LsName.Infos)
      this.params = this.$store.getters.GET_COMMON_STATE.Infos
    },
    watch: {
      bankNo(n, o) {
        if (n.length <= 8) return
        this.checkBankName(this.bankNo)
      },
      // bankText(n, o) {
      //   this.checkBankName(this.bankNo)
      // }
    },
    methods: {
      changeHandle(val) {
        console.log(val);
        // if (val.length <= 8) return
        this.checkBankNo(val)
      },
      getMsgCode() {
        if(this.bankText =='请选择开户银行'){
          Bus.$emit(BusName.showToast,'请选择开户银行')
         return
        }
        if(!this.bankNo){
          Bus.$emit(BusName.showToast,'请输入银行卡号')
          return
        }
        if(!this.bankTel){
          Bus.$emit(BusName.showToast,'请输入银行卡预留手机号')
          return
        }
        if (util.Check.tel(this.bankTel, true)) return;
        let sTime = this.time
        this.disable = true
        timer = setInterval(() => {
          if (sTime == 0) {
            this.codeText = '重新发送'
            this.disable = false
            clearInterval(timer)
            return
          }
          sTime--
          this.codeText = `${sTime}s`
        }, 1000)
        this.getCode()
      },
      getOldBankInfo() {
        this.OldBankInfo = this.getComState.hasCardList[0]
        // console.log(this.OldBankInfo);
      },
      getBank(val) {
        this.bankText = val.name
      }, // bankNameToNo
      /**
       * 校验是否是支持的银行
       * @param val
       * @returns {boolean}
       */
      checkBankName(val) {
        if (!val) {
          return false
        }
        this.bankNameToNo = false
        // this.checkBankType()
        val = val.replace(/\s+/g, "")
        let bankName
        let flag = false
        for (let i = 3; i < 8; i++) {
          if (bankName = this.machBankName((val + '').slice(0, i))) {
            this.bankText = bankName
            this.bankNameToNo = true
            flag = true
            break
          }
        }
        if (!flag) {
          this.bankText = '请选择开户银行'
          Bus.$emit(BusName.showToast, '不支持该银行或银行卡号错误')
          this.showErrMsg('不支持该银行或银行卡号错误')
        }
        console.log(this.bankText);
        return flag
      },
      /**
       * 整体校验银行卡号和银行名 是否填写 银行的
       * @param val
       * @returns {boolean}
       */
      checkBankNo(val) {
        val = val.toString()
        if (this.bankText == '请选择开户银行') {
          this.showErrMsg('请选择开户银行')
          return true
        }
        if (val == '') {
          this.showErrMsg('银行卡号不能为空')
          return true
        } else {
          this.checkBankName(val)
          return false
        }

      },
      /**
       * 匹配支持的银行
       * @param pin
       * @returns {*}
       */
      machBankName(pin) {
        return this.AllBankListObj[pin]
      },
      /**
       * 获取银行列表。全部银行列表和银行支持的银行列表
       */
      getBankList() {
        API.common.apiGetBankCardList({}, res => {
          let obj = {}
          res.BAND_CARD_LIST.forEach(item => {
            obj[item.BANK_CARD_BIN] = item.BANK_NAME
          })
          // console.log('bankObj>>>',obj);
          // 全部银行
          this.AllBankListObj = obj
          // console.log(this.AllBankListObj);
          // 支持的银行
          this.bankList = res.SUPPORT_BANK_LIST.map((item) => {
            return {
              name: item.BANK_NAME,
              value: 0,
              src: imgSrc + item.BANK_LOGO_URL,
              Index: item.INITIAL
            }
          })
        })
      },
      showErrMsg(msg) {
        this.errMsg = msg;
        setTimeout(() => {
          this.errMsg = '';
        }, 4000)
      },
      checkBankType() {

      },
      getCode() { //
        let query = this.$route.query
        let data = {
          BIZ_TYPE: '8', // 绑卡需要
          BANK_USER_ID: query.BANK_USER_ID,// 银行用户ID
          BANK_ACCT_NO: query.BANK_ACCT_NO,// 电子账户
        }
        API.common.apiSendPhoneCode(data, res => {
          this.MESAGE_TOKEN = res.MESSAGE_TOKEN
          Bus.$emit(BusName.showSendMsg, res.BC_PHONE)
        })
      },
      BindingCardAPI() {
        // 解绑银行卡
        let data = {
          BANK_NAME: this.bankText,//银行名称
          BANK_ACCOUNT_NO: this.bankNo,//银行账号
          BANK_INNER: '0',// 行内外标识 暂时默认全传他行
          DEFAULT_MARK: '1',//是否默认卡
          PHONE_NUM: this.bankTel,//银行卡开户行手机号
          BIND_FLG: '1',// 绑定标志 1-绑定，2-解绑
          MESSAGE_TOKEN: this.MESAGE_TOKEN,
          VALIDATE_CODE: this.msgCode,// 短信验证码

          BANK_CARD_TYPE: '',//
          BANK_NO: '',  //银行行号
          CARD_BIN: '', //卡Bin
          CLEAR_BANK: '',// 清算银行
          CLEAR_BANK_NO: '',// 清算银行行号
        }
        API.safe.apiChangeBingCard(data, res => {
          this.$router.push({name: PageName.BindingBank})
        }, err => {
        })
      },

      goNext() {
        if(this.bankText =='请选择开户银行'){
          Bus.$emit(BusName.showToast,'请选择开户银行')
          return
        }
        if(!this.bankNo){
          Bus.$emit(BusName.showToast,'请输入银行卡号')
          return
        }
        if(!this.bankTel){
          Bus.$emit(BusName.showToast,'请输入银行卡预留手机号')
          return
        }
        if (this.checkBankNo(this.bankNo)) return
        console.log('goNext>>', this.bankNameToNo);
        if (!this.bankNameToNo) {
          // this.showErrMsg('暂不支持该银行')

        } else {
          this.BindingCardAPI()
        }

      }
    },

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .m-form {
    width: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(20);
  }

  .bank {
    display: flex;
    box-sizing: border-box;
    line-height: px2rem(42);
    background-size: 0.7rem 0.7rem;
    border-bottom: 1px #E5E5E5 solid;

    .n-left {
      font-size: px2rem(14);
      width: px2rem(60);
    }

    .bank-box {
      width: px2rem(150);
      box-sizing: border-box;
      vertical-align: middle;
    }
  }

  .submit-box {
    position: relative;
    padding-top: px2rem(30);
  }

  .submit-btn {
    display: block;
    font-size: px2rem(16);
    color: #fff;
    background-color: #508CEE;
    border-radius: px2rem(4);
    line-height: 1rem;
    width: px2rem(255);
    height: px2rem(44);
    margin: px2rem(20) auto 0;
    text-align: center;
    border: none;
    outline: none;
  }

  .err-msg {
    /*position: absolute;*/
    /*top: px2rem(0);*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
  }

  .foot-text {
    color: #8e8e8e;
    padding-top: px2rem(20);
  }

  .slot {
    position: absolute;
    display: inline-block;
    z-index: 0;
    bottom: px2rem(8);
    right: 0;
    border: 1px solid #2B74FE;
    color: #2B74FE;
    width: px2rem(80);
    height: px2rem(25);
    border-radius: px2rem(6);
  }

  .bgbox {
    width: 100%;
    height: 100%;
    background: rgba(1, 1, 1, .7);
    position: absolute;
    padding-top: 0.7rem;
    top: 0;
    left: 0;
    z-index: 3;

    .passbox {
      background: #fff;
      width: 80%;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .top {
      padding: 0.4rem;
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
      border-radius: px2rem(4);
      border: 1px solid #DDD;
      height: px2rem(34);
      line-height: px2rem(34);
      padding-left: px2rem(3);
      margin: 0.2rem 0;
    }

    .info {
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #aeaeae;
    }

    .btn {
      border-top: 1px solid #efefef;
      padding: px2rem(14) 0;
      display: flex;

      button {
        color: #108EE9;
        font-size: px2rem(17);
        margin: 0 .3rem;
        text-align: center;
        flex: 1;
      }
    }
  }
</style>
