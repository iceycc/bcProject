<template>
  <div class="warp">
    <app-bar title="实名认证"></app-bar>
    <section class="wrapicon">
      <section class="circle">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
        <span class="step-text">开户信息验证</span>
      </section>
      <section class="circle">
                 <span class="line2 hui">
                    <img :src='stepImg2' alt="">
                </span>
        <span class="step-text">绑定银行卡</span>
      </section>

      <section class="circle">
                 <span class="line3 hui">
                    <img :src='stepImg3' alt="">
                </span>
        <span class="step-text">设置密码</span>
      </section>
    </section>
    <div class="opening_box">
      <p class="infos" style="margin: 10px 0;">请拍摄并上传身份证</p>
      <section class="photo" style="border-bottom: none">
        <div class="cameraphoto">
          <div class="cameraphotoimg">
            <img :src="preSrc1" :style="imgStyle1" alt="" class="vatal">
            <input type="file" capture="camera" accept="image/*" class="inputBox"
                   @change="imgToBaseZheng($event)">
          </div>
          <div class="words">身份证人像页照</div>
        </div>
        <div class="cameraphoto">
          <div class="cameraphotoimg">
            <img :src="preSrc2" :style="imgStyle2" alt="" class="vatal">
            <input type="file" capture="camera" accept="image/*" class="inputBox"
                   @change="imgToBaseFan($event)">
          </div>
          <div class="words">身份证国徽页照</div>
        </div>
      </section>
      <p class="infos" style="padding-top: 20px">请确认您的个人信息，若有误请点击修改</p>
      <section v-if="DOMShow.USER_NAME">
        <span>姓名</span>
        <input class="inputBox2" type="text" placeholder="请输入您的姓名"
               v-model="data.USER_NAME">
      </section>
      <section v-if="DOMShow.USER_CARD_ID">
        <span>身份证号</span>
        <input class="inputBox2" type="text" placeholder="请输入15-18位身份证号"
               v-model="data.USER_CARD_ID">
      </section>
      <section v-if="DOMShow.USER_CARD_ID_DATA">
        <span>有效期至</span>
        <input class="inputBox2" type="text" placeholder=""
               v-model="data.USER_CARD_ID_DATA">
      </section>
      <div class="foot-img">
        <p class="title">拍摄要求：</p>
        <ul>
          <li>
            <img src="@/assets/images/common/biaozhun@2x.png" alt="">
            <p>
              <icon-font iconClass="icon-finish" iconStyle="finish"></icon-font>
              标准
            </p>
          </li>
          <li>
            <img src="@/assets/images/common/biaozhun@2x.png" alt="">
            <p>
              <icon-font iconClass="icon-cuohao" iconStyle="cuohao"></icon-font>
              边角缺失
            </p>
          </li>
          <li>
            <img src="@/assets/images/common/indistinct@2x.png" alt="">
            <p>
              <icon-font iconClass="icon-cuohao" iconStyle="cuohao"></icon-font>
              信息模糊
            </p>
          </li>
          <li>
            <img src="@/assets/images/common/flashlight@2x.png" alt="">
            <p>
              <icon-font iconClass="icon-cuohao" iconStyle="cuohao"></icon-font>
              闪光强烈
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="IDphoto">
      <div class="IDphotoPositive"></div>
      <div class="IDphotoback"></div>
    </div>
    <button :class="{tijiao:true,active:canClick}" @click="doOpeningFirstFactory" :disabled="!canClick">下一步</button>
    <!--<button class="tijiao" @click="doOpeningFirstFactory">下一步</button>-->
  </div>
</template>
<script>
  import {PageName, BusName} from "@/Constant";
  import JsSelect from '@/components/commons/JsSelect'
  import API from "@/service";
  import Bus from "@/plugin/bus"
  import util from "../../../libs/util";
  import IconFont from '@/components/commons/IconFont'
  // import Check from './common'

  export default {
    data() {
      return {
        data: {// 姓名 身份证 职业 学历 身份证正反面
          USER_NAME: '',
          USER_CARD_ID: '',// 身份证号码  612601198509174013
          CARD_FRONT_FILE: '',
          CARD_BACK_FILE: '',
          USER_CARD_ID_DATA: '', //身份证有效期
          frontSessionId: null,
        },

        showType: 0,
        imgStyle1: 'width:100%;height:100%;vertical-align: middle',
        imgStyle2: 'width:100%;height:100%;vertical-align: middle;',
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImg2: require('@/assets/images/step2@2x.png'),
        stepImg3: require('@/assets/images/step3.png'),
        test1: '',
        test2: '',
        preSrc1: require('@/assets/images/common/fan@2x.png'),
        preSrc2: require('@/assets/images/common/zheng@2x.png'),
        // 配置不同标签的展示
        DOMShow: {
          USER_NAME: true,
          USER_CARD_ID: true,// 身份证号码
          USER_DUTY: true, // 职业
          USER_EDUCATION: false, //学历
          ADDRESS: false, // 地址
          NATION: false, // 民族
          PHONE: true, // 手机号
          USER_CARD_ID_DATA: true, //身份证有效期
        },
        validityPeriod: '',
        frontSessionId: '',
        idNumber: '',
        idName: ''
      }
    },
    // mixins: [Check],
    components: {
      JsSelect,
      IconFont
    },
    computed: {
      // USER_NAME: '',
      // USER_CARD_ID: '',// 身份证号码  612601198509174013
      // CARD_FRONT_FILE: '',
      // CARD_BACK_FILE: '',
      // USER_CARD_ID_DATA: '', //身份证有效期
      // frontSessionId: null,
      canClick() {
        if (this.data.USER_NAME
          && this.data.CARD_BACK_FILE
          && this.data.CARD_FRONT_FILE
          && this.data.USER_CARD_ID_DATA
          && this.data.USER_CARD_ID
        ) {
          return true
        } else {
          return false
        }
      },
    },
    created() {

    },
    methods: {
      doOpeningFirstFactory() {
        this.checkID()
        // this.$store.commit('SET_OPENING1_DATA', this.data)
        // // this.ORG_ID = this.$store.getters.GET_ORG_ID
        // this.ORG_ID = util.storage.session.get('ORG_ID') || ''
        // this.doOpengingFirst()

      },
      imgToBaseFan(e) {
        let newsrc = this.getObjectURL(e.target.files[0]);
        console.log(e.target);
        this.imgStyle2 = 'width:100%;max-height:100%'
        util.imgScale(newsrc, e.target.files[0], 4).then((data) => {
          this.preSrc2 = data
          this.data.CARD_BACK_FILE = data.split(',')[1]
          this.idCardFanOcr(data)
        })
      },
      imgToBaseZheng(e) {
        let newsrc = this.getObjectURL(e.target.files[0]);
        console.log(e.target);
        this.imgStyle1 = 'width:100%;max-height:100%'
        util.imgScale(newsrc, e.target.files[0], 4).then((data) => {
          this.preSrc1 = data
          this.data.CARD_FRONT_FILE = data.split(',')[1]
          this.idCardZhengOcr(data)
        })
      },
      //建立一個可存取到該file的url
      getObjectURL(file) {
        let url = null;
        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      /**
       * 身份证 ocr
       */
      idCardZhengOcr() {
        let params = {
          idcardFrontPhoto: encodeURIComponent(this.data.CARD_FRONT_FILE)
        }
        API.bicai.postFrontIDCard(params, (res) => {
          Bus.$emit(BusName.showToast, res.message)
          if (res.status == 1) {
            // fan zheng
            this.preSrc1 = require('@/assets/images/common/fan@2x.png')
            this.data.CARD_BACK_FILE = ''
          }
          this.data.USER_NAME = res.idName
          this.data.USER_CARD_ID = res.idNumber
          this.data.frontSessionId = res.frontSessionId

          this.idName = res.idName
          this.idNumber = res.idNumber
          this.frontSessionId = res.frontSessionId
          // this.checkID()
          // this.data.CREDENTIAL_AURL = res.SUN_ECM_CONTENT_ID
        }, err => {
          this.preSrc1 = require('@/assets/images/common/fan@2x.png')
          this.data.CARD_BACK_FILE = ''
        })
      },
      idCardFanOcr() {
        let params = {
          // idcardBackPhoto: this.data.CARD_BACK_FILE
          idcardBackPhoto: encodeURIComponent(this.data.CARD_BACK_FILE)
        }
        API.bicai.postBackIDCard(params, (res) => {
          Bus.$emit(BusName.showToast, res.message)
          if (res.status == 1) {
            this.preSrc2 = require('@/assets/images/common/zheng@2x.png')
            this.data.CARD_BACK_FILE = ''
          }
          this.data.USER_CARD_ID_DATA = res.validityPeriod
          this.validityPeriod = res.validityPeriod
          // this.data.frontSessionId = res.frontSessionId
          // this.data.CREDENTIAL_BURL = res.SUN_ECM_CONTENT_ID
        }, err => {
          this.preSrc2 = require('@/assets/images/common/zheng@2x.png')
          this.data.CARD_BACK_FILE = ''
        })
      },
      /**
       *注册
       */
      // 1 实名认证
      doOpengingFirst() {
        // todo 校验

        let params = {
          // IDFA:'aaa',
          // APP_MARKET_CODE:'111',
          ORG_ID: '',
          MEMBER_ID: this.data.MEMBER_ID,
          TYPE: 'API_REGISTER_VALI_USER',
          PHONE_NUM: this.data.PHONE + '',
          // PHONE_NUM: this.data.PHONE + '',
          PASSWORD: '',
          USER_NAME: this.data.USER_NAME + '',
          USER_CARD_ID: this.data.USER_CARD_ID + '',
          CARD_FRONT_FILE: encodeURIComponent(this.data.CARD_FRONT_FILE),
          CARD_BACK_FILE: encodeURIComponent(this.data.CARD_BACK_FILE),
          USER_DUTY: this.data.USER_DUTY + '',
          CREDENTIAL_POV: this.data.USER_CARD_ID_DATA + ''
        }
        console.log(params);
        API.open.apiRegisterValiUser(params, (res) => {
          //
          let FirstData = {
            BESHARP_REGISTER_VALI_USER_SEQ: this.res.BESHARP_REGISTER_VALI_USER_SEQ,
            CREDENTIAL_AURL: this.CREDENTIAL_AURL,
            CREDENTIAL_BURL: this.CREDENTIAL_BURL
          }
          this.$store.commit('SET_OPENING1_DATA', FirstData)
        })
      },
      /**
       * 身份证验证接口 点击下一步
       */
      checkID() {
        // validityPeriod:'',
        // frontSessionId:'',
        // idNumber:'',
        // idName:''
        if (this.data.USER_NAME != this.idName) {
          Bus.$emit(BusName.showToast, '姓名不一致')
          return
        }
        if (this.data.USER_CARD_ID != this.idNumber) {
          Bus.$emit(BusName.showToast, '身份证不一致')
          return
        }
        if (this.data.USER_CARD_ID_DATA != this.validityPeriod) {
          Bus.$emit(BusName.showToast, '身份证有效期不一致')
          return
        }
        let data = {
          idName: this.data.USER_NAME,
          idNumber: this.data.USER_CARD_ID,
          updateFlag: true,
          frontSessionId: this.data.frontSessionId
        }
        API.bicai.checkIDCard(data, res => {
          API.watchApi({
            FUNCTION_ID: 'ptb0A012', // 点位
            REMARK_DATA: '异业合作-实名认证-身份证认证的下一步按钮', // 中文备注
          })
          Bus.$emit(BusName.showToast, res.message)
          if (res.verifyStatus == 0 || res.verifyStatus == 1) {
            this.$router.push(PageName.BcOpening2)
          }
        }, err => {
          API.watchApi({
            FUNCTION_ID: 'ptb0A012', // 点位
            REMARK_DATA: '异业合作-实名认证-身份证认证的下一步按钮', // 中文备注
          })
        })
      },
      /**
       * 用户认证状态回显数据
       */
      getUserMemberInfo() {
        let data = {}
        API.bicai.getUserMemberInfo(data)
      }
    }

  }
</script>

<style lang="scss" scoped>

  .infos {
    padding-left: px2rem(20);
    font-size: px2rem(14)
  }

  .wrapicon {
    text-align: center;
    display: flex;
    position: relative;
    margin-bottom: px2rem(12);
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
        width: px2rem(16);
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
        height: px2rem(4);
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
        height: px2rem(4);
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

  .foot-img {
    .finish {
      font-size: px2rem(12);
      color: #9DCE81;
    }

    .cuohao {
      font-size: px2rem(12);
      color: #FF2A00;
    }

    img {
      width: px2rem(70);
      height: px2rem(44);
      display: inline-block;
      background: #ccc;
    }

    .title {
      padding-left: px2rem(20);
      margin: px2rem(16) 0;
      color: #666;
      font-size: px2rem(14);
    }

    ul {
      text-align: center;
      font-size: 0;
      margin: 0 auto;
      width: 90%;

      p {
        margin: px2rem(5) 0;
        color: #666;
        font-size: px2rem(12);
      }

      li {
        display: inline-block;
        width: 25%;
      }
    }
  }

  .warp {
    width: 100%;
    position: relative;
  }

  .opening_box {
    .photo {
      margin-left: px2rem(20);
      background-repeat: no-repeat;
      background-color: #fff;
      width: 90%;
      display: flex;
      .words {
        padding-left: px2rem(20);
        font-size: px2rem(12);
        color: #A3DBFF;
      }
    }
    section {
      display: flex;
      margin-left: px2rem(20);
      line-height: px2rem(44);
      width: 90%;
      border-bottom: 1px #E5E5E5 solid;
    }

    input, select {
      border: none;
      box-sizing: border-box;
      font-size: px2rem(14); /*px*/
      color: #333;
      outline: none;
      background: #fff;
      height: px2rem(44);
    }

    span {
      font-family: PingFangSC-Regular;
      color: #444444;
      font-size:px2rem(14);
      display: inline-block;
      width: px2rem(130);
    }

    .limit {
      color: #0096FE;
      font-family: PingFangSC-Regular;
    }
  }

  .cameraphoto {
    flex: 1;
    padding-left: px2rem(20);
  }

  .cameraphotoimg {
    position: relative;
    text-align: center;
    margin-bottom: 10px;
    width: px2rem(126);
    height: px2rem(80);
    border: 1px dotted #eaeaea;

    &:after {
      display: inline-block;
      content: '';
      height: 100%;
      width: 1px;
      vertical-align: middle;
    }
  }

  .tijiao {
    font-size: px2rem(18);
    color: #fff;
    background: #ccc;
    border-radius: px2rem(6);
    line-height: px2rem(44);
    height: px2rem(44);
    width: px2rem(255);
    margin: px2rem(30) auto px2rem(10);
    text-align: center;
    border: none;
    outline: none;
    display: block;
    &.active {
      background: #508CEE;
    }
  }

  .inputBox2 {
    padding-left: px2rem(12);
    text-align: right;
  }

  .inputBox {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 100%;
    height: px2rem(80) !important;
    opacity: 0;
    vertical-align: middle;
  }

</style>
