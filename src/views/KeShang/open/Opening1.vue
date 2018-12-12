<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
    <section class="wrapicon">
      <section class="circle left">
                <span class="line1">
                    <img :src='stepImg' alt="">
                </span>
        <span class="step-text">开户信息验证</span>
      </section>
      <section class="circle right">
                 <span class="line2 hui">
                    <img :src='stepImg2' alt="">
                </span>
        <span class="step-text" style="color:#D3D3D3">绑定银行卡</span>
      </section>
    </section>
    <div class="opening_box">
      <section class="photo">
        <div class="cameraphoto">
          <div class="words">身份证人像页照</div>
          <div class="cameraphotoimg">
            <img :src="preSrc1" :style="imgStyle1" alt="" class="vatal">
            <input type="file" capture="camera" accept="image/*" class="inputBox"
                   @change="imgToBaseZheng($event)">
          </div>
        </div>
        <div class="cameraphoto">
          <div class="words">身份证国徽页照</div>
          <div class="cameraphotoimg">
            <img :src="preSrc2" :style="imgStyle2" alt="" class="vatal">
            <input type="file" capture="camera" accept="image/*" class="inputBox"
                   @change="imgToBaseFan($event)">
          </div>
        </div>
      </section>
      <img :src="test1" alt="">
      <section v-if="DOMShow.USER_NAME">
        <span>姓名</span>
        <input class="inputBox2" type="text" placeholder="请输入您的姓名"
               v-model="data.USER_NAME">
      </section>
      <section v-if="DOMShow.USER_CARD_ID">
        <span>身份证号</span>
        <input class="inputBox2" type="text" placeholder="请输入15-18位身份证号"
               v-model="data.USER_CARD_ID" @bulr="checkID">
      </section>
      <section v-if="DOMShow.CARD_INDATE">
        <span>身份证有效期</span>
        <input class="inputBox2" type="text" placeholder=""
               v-model="data.CARD_INDATE">
      </section>
      <section v-if="DOMShow.PHONE">
        <span>手机号码</span>
        <input class="inputBox2" type="tel" placeholder="请输入手机号"
               v-model="data.PHONE">
      </section>
      <section v-if="DOMShow.NATION">
        <span>民族</span>
        <input class="inputBox2" type="text" placeholder=""
               v-model="data.NATION">
      </section>
      <section v-if="DOMShow.ADDRESS">
        <span>地址</span>
        <input class="inputBox2" type="text" placeholder=""
               v-model="data.ADDRESS">
      </section>
      <section v-if="DOMShow.USER_DUTY">
        <span>职业</span>
        <js-select
          title="职业列表"
          class="selectStyle" :text="work" :options="job" @getValue="getWork"></js-select>
      </section>
      <section v-if="DOMShow.USER_EDUCATION">
        <span>学历</span>
        <js-select
          title="学历列表"
          class="selectStyle" :text="educationText" :options="education"
          @getValue="getEduction"></js-select>
      </section>

    </div>
    <div class="IDphoto">
      <div class="IDphotoPositive"></div>
      <div class="IDphotoback"></div>
    </div>
    <div class="msg-err" v-if="errMsg">{{errMsg}}</div>
    <button class="tijiao" @click="doOpeningFirstFactory">下一步</button>

    <!--todo 抽离开户页面的文档组件-->
    <p
      :class="{'bang':true,'no':agree == false}"
      @click="doAgree">
      <span>我已阅读并同意注册</span>
      <a href="javascript:;" @click.stop="showPage('open')" style=" color:#0096FE;">《客商银行客户服务协议》</a> 、
      <a href="javascript:;" @click.stop="showPage('privacy')" style=" color:#0096FE;">《隐私政策》</a>
    </p>
  </div>
</template>
<script>
  import {PageName, BusName, HOST_API} from "@/Constant";
  import JsSelect from '@/components/commons/JsSelect'
  import Opening1Mixins from './Opening1'
  import util from "../../../libs/util"


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
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImg2: require('@/assets/images/step2@2x.png'),
        stepImg3: require('@/assets/images/step3.png'),
        test1: '',
        test2: '',
        agreeMentSrc: HOST_API + '/static/finsuit/js/openapi/js/xieyi/cz.html',

        preSrc1: require('@/assets/images/cameracopy@2x.png'),
        preSrc2: require('@/assets/images/cameracopy@2x.png'),
        picZheng: require('@/assets/images/id-zheng.jpg'),
        picFan: require('@/assets/images/id-fan.jpg'),

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
      JsSelect
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
      getEduction(val) {
        this.educationText = val.name
        this.data.USER_EDUCATION = val.value
      },
      // 获取工作
      getWork(val) {
        this.work = val.name
        this.data.USER_DUTY = val.value
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
  @import "~@/assets/px2rem";

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
    border-bottom: 1px #E5E5E5 solid;
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
    font-family: PingFangSC-Regular;
    color: #444444;
    font-size: .4rem;
    display: inline-block;
    width: px2rem(130);
  }

  .opening_box section .limit {
    color: #0096FE;
    font-family: PingFangSC-Regular;
  }

  .opening_box section .getpassword {
    display: inline-block;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.2rem;
    width: 2rem;
    height: 1rem;
    border: 1px solid #2B74FE;
    color: #2B74FE;
    /* border-radius:6px; */
  }

  .opening_box .photo {
    margin-left: 0.6rem;
    background-repeat: no-repeat;
    background-color: #fff;
    line-height: 1rem;
    width: 90%;
    background-size: 0.7rem 0.7rem;
    background-position: .2rem .2rem;
    border-bottom: 1px #E5E5E5 solid;
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

  .tijiao {
    display: block;
    font-size: px2rem(16);
    color: #fff;
    background-color: #508CEE;
    border-radius: px2rem(4);
    line-height: 1rem;
    width: px2rem(255);
    height: px2rem(44);
    margin: px2rem(75) auto px2rem(20);
    text-align: center;
    border: none;
    outline: none;
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
