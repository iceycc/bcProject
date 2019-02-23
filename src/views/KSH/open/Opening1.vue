<template>
  <div class="warp">
    <app-bar title="开户"></app-bar>
    <open-head :options="[
    {text: '开户信息验证', active: true},
    {text: '绑定银行卡', active: false}
    ]"></open-head>

    <div class="opening_box">
      <section class="photo">
        <div class="cameraphoto">
          <div class="words">身份证人像页照</div>
          <div class="cameraphotoimg">
            <img :src="preSrc1" :style="imgStyle1" alt="" class="vatal">
            <input type="file" capture="camera" accept="image/*" class="inputBox"
                   disabled
                   @change="imgToBaseZheng($event)">
          </div>
        </div>
        <div class="cameraphoto">
          <div class="words">身份证国徽页照</div>
          <div class="cameraphotoimg">
            <img :src="preSrc2" :style="imgStyle2" alt="" class="vatal">
            <input type="file" capture="camera" accept="image/*" class="inputBox"
                   disabled
                   @change="imgToBaseFan($event)">
          </div>
        </div>
      </section>
    </div>
    <section class="input-box2">
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
        text="身份证号"
        placeholder="请输入15-18位身份证号"
        disabled="true"
      ></normal-input>
      <div class="msg-err" v-if="errMsg">{{errMsg}}</div>
      <submit-button
        class="submit-btn"
        text="下一步"
        :canSubmit="true"
        @submit="doOpeningFirstFactory"
      ></submit-button>
    </section>
    <!--<button class="tijiao" @click="doOpeningFirstFactory">下一步</button>-->

    <!--todo 抽离开户页面的文档组件-->
    <p
      :class="{'bang':true,'no':agree == false}"
      @click="doAgree">
      <span>我已阅读并同意注册</span>
      <a href="javascript:;" @click.stop="showPage('open')" style="color:#0096FE;">《客商银行客户服务协议》</a> 、
      <a href="javascript:;" @click.stop="showPage('privacy')" style="color:#0096FE;">《隐私政策》</a>
    </p>
  </div>
</template>
<script>
  import {PageName, BusName, HOST_API} from "@/Constant";
  import Opening1Mixins from './Opening1'
  import {
    NormalInput,
    JsSelect,
    OpenHead,
    SubmitButton
  } from '@/components'

  export default {
    data() {
      return {
        data: {// 姓名 身份证 职业 学历 身份证正反面
          USER_NAME: '',
          USER_CARD_ID: '',// 身份证号码  612601198509174013
          USER_DUTY: '', // 职业
          USER_EDUCATION: '', // 学历
          CARD_FRONT_FILE: '',
          CARD_BACK_FILE: '',
          IDENT_VLD_DT: '', //身份证有效期
          ADDRESS: '', // 地址
          NATION: '', // 民族
          PHONE: '',
          PARTNER_ORDER_ID: '' // 众邦的实名流水信息

        },

        showType: 0,
        imgStyle1: 'width:30%;vertical-align: middle',
        imgStyle2: 'width:30%;vertical-align: middle;',
        test1: '',
        test2: '',
        agreeMentSrc: HOST_API + '/static/finsuit/js/openapi/js/xieyi/cz.html',

        preSrc1: require('@/assets/images/cameracopy@2x.png'),
        preSrc2: require('@/assets/images/cameracopy@2x.png'),
        education: [
          {name: '研究生', value: '0'},
          {name: '大学本科', value: '20'},
          {name: '大学专科或专科学校', value: '30'},
          {name: '中等专业学校或中等技术学校', value: '40'},
          {name: '技术学校', value: '50'},
          {name: '高中', value: '60'},
          {name: '初中', value: '70'},
          {name: '小学', value: '80'},
          {name: '文盲或半文盲', value: '90'},
          {name: '未知', value: '99'},
        ],
        educationText: '请选择学历',
        work: '请选择职业',
        agree: true,
        page: false,
        errMsg: '',
        suerinfo: ''
      }
    },
    components: {
      NormalInput,
      JsSelect,
      OpenHead,
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
        if (suerinfo && suerinfo.CARD_FRONT_URL) {
          this.preSrc1 = 'data:image/jpeg;base64,' + suerinfo.CARD_FRONT_URL.replace(/\s/g, '+')
          this.preSrc2 = 'data:image/jpeg;base64,' + suerinfo.CARD_BACK_URL.replace(/\s/g, '+')
          this.imgStyle1 = 'width:100%;height:100%;vertical-align: middle'
          this.imgStyle2 = 'width:100%;height:100%;vertical-align: middle;'
          //新增
          this.data.USER_NAME = suerinfo.USER_NAME
          this.data.USER_CARD_ID = suerinfo.USER_CARD_ID
          this.data.CARD_INDATE = suerinfo.CARD_INDATE
          // this.data.USER_NAME = suerinfo.USER_NAME
          // this.data.USER_CARD_ID = suerinfo.USER_CARD_ID
          this.data.PHONE = suerinfo.PHONE_NUM || suerinfo.BANK_CARD_PHONE
          // this.data.PHONE = ''
          this.data.CARD_BACK_FILE = suerinfo.CARD_BACK_URL.replace(/\s/g, '+')
          this.data.CARD_FRONT_FILE = suerinfo.CARD_FRONT_URL.replace(/\s/g, '+')
          // if (this.data.CARD_BACK_FILE) {
          //   this.idCardFanOcr()
          // }
          // if (this.data.CARD_FRONT_FILE) {
          //   this.idCardZhengOcr()
          // }
        }
      },
      //获取学历
      // getEduction(val) {
      //   this.educationText = val.name
      //   this.data.USER_EDUCATION = val.value
      // },
      // 获取工作
      // getWork(val) {
      //   this.work = val.name
      //   this.data.USER_DUTY = val.value
      // },
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

  .wrapicon {
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

      &.left {
        text-align: left;
        padding-left: px2rem(30);
      }

      &.right {
        text-align: right;
        padding-right: px2rem(30);
      }
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
        width: 90%;
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
        right: px2rem(10);
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

  .warp {
    width: 100%;
    position: relative;
  }

  .opening_box section {
    display: flex;
    margin-left: 0.6rem;
    line-height: 1rem;
    width: 90%;
    /*border-bottom: 1px #E5E5E5 solid;*/
  }

  .opening_box section {
    input, select {
      border: none;
      box-sizing: border-box;
      font-size: 14px; /*px*/
      color: #333;
      outline: none;
      background: #fff;
      height: 1rem;
    }

  }

  .opening_box section span {
    color: #444444;
    font-size: .4rem;
    display: inline-block;
    width: px2rem(130);
  }


  .opening_box .photo {
    margin-left: 0.6rem;
    background-repeat: no-repeat;
    background-color: #fff;
    line-height: 1rem;
    width: 90%;
    background-size: 0.7rem 0.7rem;
    background-position: .2rem .2rem;
    /*border-bottom: 1px #E5E5E5 solid;*/
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

  .submit-btn {
    margin-top: px2rem(60);
    margin-bottom: px2rem(20);
  }


  .Tips {
    margin-top: 0.8rem;
    background-color: #FF5B05;
    width: 60%;
  }

  .bang {
    margin-left: 0.5rem;
    background: url(~@/assets/images/agree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.4rem 0.4rem;
    font-size: 0.35rem;
    color: #808080;
    padding: 0 0.5rem;

  }

  .no {
    background: url(~@/assets/images/onagree@3x.png) no-repeat 0 0.05rem;
    background-size: 0.4rem 0.4rem;
  }

  .inputBox2 {
    padding-left: px2rem(14);
    text-align: right;
    color: #858E9F;
  }
  .input-box2{
    padding: 0 px2rem(20);
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

</style>
