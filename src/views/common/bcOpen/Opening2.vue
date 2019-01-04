<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <section class="wrapicon">
      <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text">开户信息验证</p>
      </section>
      <section class="circle">
                 <span class="line2">
                    <img :src='stepImg' alt="">
                </span>
        <p class="step-text">绑定银行卡</p>
      </section>
      <section class="circle">
                 <span class="line3 hui">
                    <img :src='stepImg3' alt="">
                </span>
        <p class="step-text">设置密码</p>
      </section>
    </section>

    <div class="opening_box">
      <section class="input-box">
        <p class="left-p"> 绑定卡卡号</p>
        <input type="number"
               @blur="checkBankName(data.CARD_NO)"
               name="backname" placeholder="请输入储蓄卡卡号" v-model="data.CARD_NO">
      </section>
      <section class="bank">
        <span style="padding-right: 0px" class="left-p">选择银行</span>
        <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
        <!-- <span  class="limit">银行限额</span>  -->
        <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                     title="银行列表"></Bank-select>

      </section>
      <section class="input-box">
        <p class="left-p">手机号码</p>
        <input
          :disabled="telDisabled"
          type="text" name="tel" placeholder="银行预留手机号" v-model="tel">
      </section>
      <section class="input-box">
        <p class="left-p">验证码</p>
        <input
          type="text" placeholder="验证码" v-model="data.PHONE_CODE">
        <button class="msg-code" @click="clickMsgCodeHandle" :disabled="disable">{{codeText}}</button>
      </section>
    </div>
    <!--errMsg-->
    <div class="msg-err" v-if="errMsg">
      <span>{{errMsg}}</span>
    </div>
    <!-- <div class="tijiao Tips">请使用该预留手机号进行开户</div> -->
    <button :class="{cantNext:cantNext}" :disabled="cantNext" class="tijiao" @click="goNext">下一步</button>


    <!--<section class="safe-code" v-show="showSafeCode">-->
    <!--<div>-->
    <!--<img :src="safeCodeUrl+ SESSION_ID" alt="">-->
    <!--<input type="text" placeholder="请输入图形验证码" v-model="safeCode">-->
    <!--<button @click="getSafeCode">确定</button>-->
    <!--</div>-->
    <!--</section>-->
    <section class="safe-code" v-show="showSafeCode">
      <div>
        <p>请填写图形验证码</p>
        <section class="middle">
          <input type="tel" placeholder="请输入图形验证码" v-model="safeCode">
          <img :src="'data:image/png;base64,'+IMG" alt="" @click="getImgCode()">
        </section>
        <section class="btn">
          <button @click="showSafeCode=false">取消</button>
          <button @click="getSafeCode">确定</button>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
  import Bus from '@/plugin/bus'
  import BankSelect from '@/components/commons/BankSelect'
  import PassWordZhengzhou from '@/components/password/PassInputZhengzhou'
  import {HOST_API} from "@/Constant";
  import API from "@/service";
  import {imgSrc} from "@/Constant";
  import {PageName, BusName, LsName} from "@/Constant";
  import util from "libs/util";

  const safeCodeUrl = HOST_API + '/finsuitSafeCode?SESSION_ID='
  let time = 60

  export default {
    data() {
      return {
        IMG:'',
        // 图形验证码相关
        safeCode: '',
        safeCodeUrl,
        SESSION_ID: '',
        showSafeCode: false,

        data: {
          CARD_NO: '', // 银行卡号 6214830182284272  6217730711297810
          HAS_BAND: '0', // 是否绑定过
          PHONE_NUM: '', // 15711310733   15011352818
          PRE_PHONE_NUM: '', // 预留 这个是页面取的
          PHONE_CODE: '', // 手机验证码
          LAST_STEP_NUM: '', // 步数
          MESSAGE_TOKEN: '',
          REQ_SERIAL: ''
        },
        // cantNext:true,
        tel: '',
        canClick: true,
        codeText: "获取验证码",
        disable: false,
        bankList: [],
        bank: '-1',
        bankText: '请选择开户银行',
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImg2: require('@/assets/images/step2@2x.png'),
        stepImg3: require('@/assets/images/step3.png'),
        AllBankListObj: {},
        errMsg: '',
        checkBankName1: false,

        telDisabled: false,
      }
    },
    components: {
      BankSelect,
      PassWordZhengzhou,
    },
    watch: {
      tel(n, o) {
        if (n.length > 11) { // >11截取
          console.log(n);
          this.tel = n.toString().substr(0, 11)
        }
      },
      bankText(n, o) {
        // this.checkBankName(this.data.CARD_NO)
      },
    },
    computed: {
      // data.PHONE_CODE
      cantNext() {
        if (this.tel.length > 0 && this.data.PHONE_CODE.length > 0 && this.data.CARD_NO.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    filters: {
      telFlter(n) {
        if (n.length > 11) { // >11截取
          return n.toString().substr(0, 11)
        }
      },
      CARD_NO_Fliter(n) {
        if (n) {
          return n.substr(n.length - 4)
        } else {
          return n
        }
      }
    },
    created() {
      this.data.REQ_SERIAL = this.$route.query.REQ_SERIAL
      this.data.LAST_STEP_NUM = this.$route.query.LAST_STEP_NUM
      // this.tel = this.$route.query.PHONE_NUM || ''
      // this.tel = this.$store.getters.GET_OPENING1_DATA.PHONE || ''
      this.getBankList()
    },
    methods: {
      // 刷新图片
      getImgCode(){
        API.commonApi.getImgCode({},res=>{
          this.IMG = res
        },err=>{
        })
      },
      // msg倒计时
      timeDown() {
        let sTime = time
        this.disable = true
        let timer = setInterval(() => {
          if (sTime == 0) {
            this.codeText = '重新发送'
            this.disable = false
            clearInterval(timer)
            return
          }
          sTime--
          this.codeText = `${sTime}s`
        }, 1000)
      },
      // 点击获取验证码
      clickMsgCodeHandle() {
        let PHONE = this.tel
        PHONE = PHONE + ''
        console.log(PHONE);
        if (util.Check.tel(PHONE, true)) return;
        this.getImgCode()
        // this.SESSION_ID = this.$store.getters.GET_ACCOUNT_STATE.SESSION_ID + Math.random()
        this.showSafeCode = true
      },
      //
      // 获取短信验证码
      getMsgCode() {
        let data = {
          MOBILE: this.tel,
          SAFT_CODE: this.safeCode, // 图片验证码
          BANK_CARD: this.data.CARD_NO
        }
        this.safeCode = ''
        API.bicai.sendSMSCodeToBindCard(data, res => {
          // 0发送成功
          // 1发送失败
          // 2手机号码错误
          // 3.停止短信服务
          // 4.用户短信验证码输入错误达到三次，24小时内不能再次绑卡
          if (res.STATUS == 0) {
            this.timeDown()
          }
          Bus.$emit(BusName.showToast, res.MESSAGE)
          this.showSafeCode = false
        }, err => {
          this.getImgCode()
          // this.codeText = '重新发送'
          // this.disable = false
          // this.showSafeCode = false
          console.log(err);
        })
      },

      checkID() {
        API.bicai.getMerberAuthStatusInfo({}, res => {
          let {status} = res
          console.log(status);
          if (status == 3 || status == 4) {
            clearInterval(timer)
            this.$router.push({name: PageName.BcOpening3})
          }
        })
      },
      // 根据银行卡号获取银行名称
      getBankNameByCardNo() {
        let data = {
          cardNo: this.data.CARD_NO
        }
        API.bicai.getCardBinList(data, res => {
          if (res.length > 0) {
            this.bankText = res[0].ISSUER_NAME

          }
        })
      },
      /**
       * 获取银行列表
       */
      getBankList() {
        API.bicai.getBingingCardsList({}, res => {
          let obj = {}
          res.bankList.forEach(item => {
            obj[item.BANK_CARD_BIN] = item.BANK_NAME
          })
          // console.log('bankObj>>>',obj);
          this.AllBankListObj = obj
          this.bankList = res.bankList.map((item) => {
            return {
              name: item.ORG_NAME,
              value: 0,
              src: imgSrc + item.LOGO_URL,
              Index: item.ORG_NAME_FIRST_LETTER
            }
          })
        })
      },
      // 点击图形验证吗
      getSafeCode() {
        if (!this.safeCode) {
          Bus.$emit(BusName.showToast, '图形验证码不能为空')
          return
        }
        this.getMsgCode()
      },
      checkBankName(val) {
        // this.checkBankName1 = false
        // // this.checkBankType()
        // val = val.replace(/\s+/g, "")
        // let bankName
        // for (var i = 3; i < 8; i++) {
        //   if (bankName = this.machBankName((val + '').slice(0, i))) {
        //     this.bankText = bankName
        //     console.log('bankName', bankName);
        //     break
        //   }
        // }
        this.getBankNameByCardNo()
      },
      machBankName(pin) {
        return this.AllBankListObj[pin]
      },
      checkBankNo(val) {
        val = val.toString()
        let reg = /\d{15}|\d{19}/
        console.log(!reg.test(val));
        if (val == '') {
          Bus.$emit(BusName.showToast, '银行卡号不能为空')
          return true
        }
        else if (val.length < 15 || val.length > 19) {
          Bus.$emit(BusName.showToast, '银行卡号格式不正确')
          return true
        } else {
          return false
        }

      },
      getBank(val) {
        console.log(val);
        this.bankText = val.name
      },
      // 下一步
      // 注册
      goNext() {
        this.data.PRE_PHONE_NUM = this.tel
        console.log(this.data.PRE_PHONE_NUM);
        if (this.bankText == '请选择银行') {
          Bus.$emit(BusName.showToast, '请选择银行')
          return
        }
        if (this.data.CARD_NO == '') {
          Bus.$emit(BusName.showToast, '银行卡号不能为空')
          return
        }
        // if (this.checkBankName1) {
        //   Bus.$emit(BusName.showToast, '您输入的银行卡号和选择的银行名称不匹配')
        //   return
        // }
        if (this.checkBankNo(this.data.CARD_NO)) {
          // Bus.$emit(BusName.showToast, '手机号不能为空')
          return
        }
        if (this.data.PRE_PHONE_NUM == '') {
          Bus.$emit(BusName.showToast, '手机号不能为空')
          return
        }
        if (this.data.PHONE_CODE == '') {
          Bus.$emit(BusName.showToast, '短信验证码不能为空')
          return
        }
        // if (this.data.MESSAGE_TOKEN == '') {
        //   Bus.$emit(BusName.showToast, '短信验证码异常')
        //   return
        // }
        let params = {
          bankCardNo: this.data.CARD_NO,
          mobile: this.tel,
          smsCode: this.data.PHONE_CODE
        }
        API.bicai.bindCardFourELement(params,
          res => {
            API.watchApi({
              FUNCTION_ID: 'ptb0A013', // 点位
              REMARK_DATA: '异业合作-实名认证-银行卡认证的下一步按钮', // 中文备注
            })
            // this.Londing.close()
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)
            let status = res.status
            console.log('status>>>', status);
            Bus.$emit(BusName.showToast,res.message)
            if (status == 1) {
              this.$router.push({name: PageName.BcOpening3})
            } else {
              // this.pollHandle()
            }
          },
          err => {
            API.watchApi({
              FUNCTION_ID: 'ptb0A013', // 点位
              REMARK_DATA: '异业合作-实名认证-银行卡认证的下一步按钮', // 中文备注
            })
            // this.pollHandle()
            this.errMsg = err
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)
            console.log(err);
            this.disable = false
          })
      },
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .warp {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .opening_box {
    .bank {
      margin-left: 0.6rem;
      line-height: 1.3rem;
      width: 90%;
      background-size: 0.7rem 0.7rem;
      border-bottom: 1px #E5E5E5 solid;
      display: flex;
      font-size: px2rem(14);
    }
    .input-box {
      margin: 0 auto;
      width: px2rem(330);
      border-bottom: 1px #E5E5E5 solid;
      display: flex;
      .left-p {
        width: px2rem(80) !important;
        box-sizing: border-box;
        font-size: px2rem(14);
        font-family: PingFangSC-Regular;
        color: #444;
        padding: px2rem(15) 0;
      }
      input {
        text-align: left;
        font-size: px2rem(14);
        flex: 1;
        color: #333
      }
      button {
        margin-top: px2rem(12);
      }
    }
  }

  .tijiao {
    display: block;
    font-size: px2rem(16);
    color: #fff;
    background-color: #508CEE;
    border-radius: px2rem(4);
    line-height: 1rem;
    width: px2rem(335);
    height: px2rem(44);
    margin: px2rem(55) auto px2rem(20);
    text-align: center;
    border: none;
    outline: none;
    &.cantNext {
      background: #ccc;
      color: #fff;
    }
  }

  .infos {
    padding-left: px2rem(20);
    font-size: px2rem(14)
  }

  .bank-box {
    display: inline-block;
    width: px2rem(150);
    vertical-align: middle;
  }

  .msg-code {
    vertical-align: middle;
    font-size: px2rem(13);
    width: px2rem(100);
    height: px2rem(26);
    line-height: px2rem(26);
    border: 1px solid #2B74FE;
    border-radius: px2rem(4);
    color: #2B74FE;
    margin-bottom: px2rem(10);
  }

  .wrapicon {
    text-align: center;
    display: flex;
    position: relative;
    margin-bottom: .3rem;
    margin-top: px2rem(4);
    .step-text {
      padding-top: px2rem(7);
    }
    .circle {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .line1, .line2, .line3 {
      position: relative;
      img {
        width: .5rem;
      }
      &:after {
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-100%);
        content: '';
        width: 45%;
        background: #92d048;
        height: .1rem;
        overflow: hidden;

      }
    }
    .hui {
      &:after, &.line2:before {
        background: #dee1e3 !important;
      }

    }
    .line2 {
      &:after {
        left: 0;
        right: auto;
      }
      &:before {
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-100%);
        content: '';
        width: 45%;
        background: #92d048;
        height: .1rem;
        overflow: hidden;
      }
    }
    .line3 {
      &:after {
        left: 0;
        right: auto;
      }
    }

  }

  .msg-err {
    text-align: center;
    margin: px2rem(20) auto 0;
    span {
      display: inline-block;
      min-width: px2rem(200);
      font-size: px2rem(12);
      color: #fff;
      background-color: #FF5B05;
      border-radius: px2rem(5);
      height: px2rem(29);
      line-height: px2rem(29);
      padding: 0 px2rem(10);
    }
  }

  .safe-code {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;

    div {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      margin: px2rem(200) auto 0;
      background: #fff;
      padding-top: px2rem(10);
      text-align: center;
      width: px2rem(280);
      height: px2rem(150);
      border-radius: px2rem(6);
    }
    p {
      flex: 1;
      font-size: px2rem(18);
    }
    .btn {
      flex: 2;
      display: flex;
      button {
        flex: 1;
        border-top: 1px solid #ccc;
        color: #007aff;
        &:first-child {
          border-right: 1px solid #ccc;
        }
      }

    }

    .middle {
      display: flex;
      padding: px2rem(15);
      flex: 2;
      img {
        width: px2rem(80);
        height: px2rem(40);
      }
      input {
        flex: 1;
        padding-left: px2rem(10);
        height: px2rem(40);
        border: 1px solid #ccc;
      }
    }

  }


</style>
