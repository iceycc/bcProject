<template>
  <div class="warp">
    <app-bar title="开户"></app-bar>
    <open-head :options="[
    {text: '开户信息验证', active: true},
    {text: '绑定银行卡', active: false},
    {text: '短信校验', active: false},
    ]"></open-head>
    <div class="opening_box">
      <section class="photo">
        <div class="cameraphoto">
          <div class="words">身份证人像页照</div>
          <div class="cameraphotoimg">
            <img :src="preSrc1" :style="imgStyle1" alt="" class="vatal">
          </div>
        </div>
        <div class="cameraphoto">
          <div class="words">身份证国徽页照</div>
          <div class="cameraphotoimg">
            <img :src="preSrc2" :style="imgStyle2" alt="" class="vatal">
          </div>
        </div>
      </section>
      <normal-input
        class="grey"
        type="tel"
        v-model="data.USER_NAME"
        text="姓名"
        placeholder="请输入您的姓名"
        disabled="true"
      ></normal-input>
      <normal-input
        class="grey"
        type="tel"
        v-model="data.USER_CARD_ID"
        text="身份证号"
        placeholder="请输入15-18位身份证号"
        disabled="true"
      ></normal-input>
      <normal-input
        class="grey"
        type="tel"
        v-model="data.CARD_INDATE"
        text="身份证有效期"
        placeholder=""
        disabled="true"
      ></normal-input>
    </div>
    <div class="msg-err" v-if="errMsg">{{errMsg}}</div>
    <submit-button
      class="submit-btn"
      text="下一步"
      :canSubmit="true"
      @submit="doOpeningFirstFactory"
    ></submit-button>
    <!--todo 抽离开户页面的文档组件-->
    <p
      :class="{'bang':true,'no':agree == false}"
      @click="doAgree">
      <span>我已阅读并同意注册</span>
      <a href="javascript:;" @click.stop="showPage('open')" style=" color:#0096FE;">《工商银行客户服务协议》</a> 、
      <a href="javascript:;" @click.stop="showPage('privacy')" style=" color:#0096FE;">《隐私政策》</a>
    </p>
    <call-to-bicai info="有疑问，请联系公众号: bicaikef"></call-to-bicai>
  </div>
</template>
<script>
  import {PageName, BusName, HOST_API} from "@/Constant";
  import Opening1Mixins from './Opening1'
  import {
    NormalInput,
    JsSelect,
    OpenHead,
    CallToBicai,
    SubmitButton
  }  from '@/components'

  export default {
    data() {
      return {
        data: {// 姓名 身份证 职业 学历 身份证正反面
          USER_NAME: '',
          USER_CARD_ID: '',// 身份证号码  612601198509174013
          CARD_FRONT_FILE: '',
          CARD_BACK_FILE: '',
        },

        showType: 0,
        imgStyle1: 'width:30%;vertical-align: middle',
        imgStyle2: 'width:30%;vertical-align: middle;',
        agreeMentSrc: HOST_API + '/static/finsuit/js/openapi/js/xieyi/cz.html',

        preSrc1: require('@/assets/images/cameracopy@2x.png'),
        preSrc2: require('@/assets/images/cameracopy@2x.png'),
        agree: true,
        page: false,
        errMsg: '',
        suerinfo: ''
      }
    },
    components: {
      JsSelect,
      OpenHead,
      NormalInput,
      CallToBicai,
      SubmitButton
    },
    mixins: [Opening1Mixins],
    created() {
      // 1-获取回显数据
      this.checkBankStatus(this.getInfos)
    },
    methods: {
      getInfos(data) {
        let suerinfo = data
        this.suerinfo = suerinfo
        console.log("suerinfo>>", suerinfo);
        if (suerinfo && suerinfo.cardFrontUrl) {
          this.preSrc1 = 'data:image/jpeg;base64,' + suerinfo.cardFrontUrl.replace(/\s/g, '+')
          this.preSrc2 = 'data:image/jpeg;base64,' + suerinfo.cardBackUrl.replace(/\s/g, '+')
          this.imgStyle1 = 'width:100%;height:100%;vertical-align: middle'
          this.imgStyle2 = 'width:100%;height:100%;vertical-align: middle'
          //新增
          this.data.USER_NAME = suerinfo.userName // 用户名
          this.data.USER_CARD_ID = suerinfo.userCardId // 身份证号

          this.data.CARD_FRONT_FILE = suerinfo.cardFrontUrl.replace(/\s/g, '+')
          this.data.CARD_BACK_FILE = suerinfo.cardBackUrl.replace(/\s/g, '+')
        }
      },
      // 切换同意按钮
      doAgree() {
        this.agree = !this.agree
      },
      showPage(type) {
        this.$router.push({name: PageName.DocsPage, query: {type: type}})
      },
    }
  }
</script>

<style lang="scss" scoped>
  body {
    font-size: .3rem;
  }

  .warp {
    width: 100%;
    position: relative;
  }

  .opening_box .photo {
    margin-left: 0.6rem;
    background-repeat: no-repeat;
    background-color: #fff;
    line-height: 1rem;
    width: 90%;
    background-size: 0.7rem 0.7rem;
    background-position: .2rem .2rem;
    display: flex;

    .words {
      padding-left: px2rem(20);
    }
  }

  .cameraphoto {
    flex: 1;
    padding-left: 6%;
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



  .Tips {
    margin-top: 0.8rem;
    background-color: #FF5B05;
    width: 60%;
  }

  .bang {
    margin-left: px2rem(20);
    background: url(~@/assets/images/agree@3x.png) no-repeat 0 0.05rem;
    background-size: px2rem(16) px2rem(16);
    font-size: px2rem(12);
    color: #808080;
    padding: 0 px2rem(20);

    &.no {
      background: url(~@/assets/images/onagree@3x.png) no-repeat 0 0.05rem;
      background-size: px2rem(16) px2rem(16);
    }
  }

  .inputBox2 {
    padding-left: px2rem(12);
    font-size: px2rem(14);
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

  .selectStyle {
    width: px2rem(220);
    font-size: .4rem;
  }

  .page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 100;

    .docs {
      box-sizing: border-box;
      border: none;
      width: 100%;
      height: 90%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      padding: 0 .2rem;
    }

    .docsself {
      box-sizing: border-box;
      border: none;
      width: 100%;
      height: 90%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      padding: 0 .3rem;
      /*style="padding: 20px 20px 0;font-size: 12px" */
      h2,
      h5 {
        font-size: px2rem(11) !important;
        color: #000 !important;
      }

      p {
        font-size: px2rem(9) !important;
        color: #000 !important;
        line-height: px2rem(15);
      }

    }

    .indocs {
      border: none;
      width: 100%;
      height: 100%;
    }

    .btn {
      padding: 0 1rem;
      text-align: center;

      button {
        width: 3.5rem;
        margin-right: .4rem;
      }
    }
  }

  .msg-err {
    font-size: px2rem(12);
    color: #fff;
    background-color: #FF5B05;
    border-radius: px2rem(5);
    width: px2rem(204);
    height: px2rem(29);
    line-height: px2rem(29);
    margin: px2rem(20) auto 0;
    text-align: center;
  }
  .submit-btn{
    margin-top: px2rem(60);
    margin-bottom: px2rem(20);
  }

</style>
