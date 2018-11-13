<template>
  <div class="warp">
    <app-bar title="信息填写"></app-bar>
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
        <span class="step-text" style="color:#D3D3D3">绑定银行卡</span>
      </section>

      <section class="circle">
                 <span class="line3 hui">
                    <img :src='stepImg3' alt="">
                </span>
        <span class="step-text" style="color:#D3D3D3">设置密码</span>
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
               disabled
               v-model="data.USER_NAME">
      </section>
      <section v-if="DOMShow.USER_CARD_ID">
        <span>身份证号</span>
        <input class="inputBox2" type="text" placeholder="请输入15-18位身份证号"
               disabled
               v-model="data.USER_CARD_ID" @bulr="checkID">
      </section>
      <section v-if="DOMShow.USER_CARD_ID_DATA">
        <span>身份证有效期</span>
        <input class="inputBox2" type="text" placeholder=""
               disabled
               v-model="data.USER_CARD_ID_DATA">
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
      v-if="ORG_ID == ORG_ID_NUM.JinShang"
      :class="{'bang':true,'no':agree == false}"
      @click="doAgree">
      <span>我已阅读并同意注册</span>
      <a href="javascript:;" @click.stop="showPage('2')" style=" color:#0096FE;">《用户授权服务协议》</a>
      <a href="javascript:;" @click.stop="showPage('1')" style=" color:#0096FE;">《晋商银行直销银行电子账户服务协议》</a>
    </p>
    <p
      v-if="ORG_ID == ORG_ID_NUM.ZhengZhou"
      :class="{'bang':true,'no':agree == false}"
      @click="doAgree">
      <span>我已阅读并同意注册</span>
      <a href="javascript:;" @click.stop="showPage('2')" style=" color:#0096FE;">《郑州银行鼎融易直营银行客户服务协议》、</a>
      <a href="javascript:;" @click.stop="showPage('1')" style=" color:#0096FE;">《隐私政策》</a>
    </p>

    <section v-show="page" class="page">
      <div class="docs" v-if="showType == 1">
        <iframe :src="agreeMentSrc" class="indocs"></iframe>
      </div>
      <div class="docsself" v-if="showType == 2">
        <h2 style="text-align:center">用户授权服务协议</h2>
        <h5>一、概述</h5>
        <p>
          《用户授权服务协议》（以下简称“本协议＂）是北京比财数据科技有限公司（以下简称“本公司＂）与用户（以下简称“您”）所订立的有效合约。您通过网络页面点击确认或以其他方式选择接受本协议，即表示您与本公司已达成协议并同意接受本协议的全部约定内容。在接受本协议之前，请您仔细阅读本协议的全部内容（特别是以粗体下划线标注的内容）。如您不同意本协议的内容，或无法准确理解本协议任何条款的含义，请不要进行确认及后续操作。如果您对本协议的条款有疑问的，请拨打客服电话（86-10
          61841811）进行询问，本公司将向您解释条款内容。</p>

        <h5>二、定义</h5>
        <p>2．1北京比财数据科技有限公司开放平台：指由本公司独立开发并经营的，供第三方使用接口等资源以开发、展示、销售服务的平台系统。</p>
        <p>2．2第三方：指通过本公司提供的平台和服务、向最终用户提供服务的各类企业或机构。</p>
        <p>2．3用户：即指通过本公司平台或第三方平台使用本公司提供的产品、服务的自然人、法人、企业、机构等。</p>

        <h5>三、授权条款</h5>
        <p>
          3．1您授权本公司及其关联公司向您在本服务页面选择的第三方传递您的信息，该等信息的提供以第三方为提供服务所需。页面提示上可能会展示具体授权对象、授权字段名称、范围等，授权字段通过加密通道传递给第三方。本公司会要求该第三方依法使用您的上述信息，
          并应对您的信息保密。</p>
        <p>
          3．2您理解，本公司是中立平台的提供者，第三方服务由该第三方独立运营并独立承担全部责任。因该第三方服务或其使用您的信息产生的纠纷，或第三方服务违反相关法律法规或本协议约定，或您在使用第三方服务过程中遭受的损失，请您和第三方协商解決。</p>
        <p>
          3．3您授权本公司在您使用本服务期间或本服务终止后，基于为更好的向您提供服务之目的或向您推广其他产品服务的需要，有权保留并使用您在使用本服务期间所形成的相关信息（包括您选择的第三方合法收集、保存的您的相关信息）并提供给本公司的关联公司。</p>
        <p>3．4您同意本协议中的授权不可变更、撤回或撤销。</p>

        <h5>四、其他条款</h5>
        <p>
          4．1您同意，本公司有权随时对本协议内容进行单方面的变更，并通过本公司公开渠道发布通知/公告的方式进行公告，所有上述通知/公告等为本协议不可分割的组成部分。该等变更将在通知/公告载明的生效时间生效；若您在本协议内容变更生效后继续使用本公司服务的，表示您已充分阅读、理解并接受变更修改后的协议内容，也将遵循变更修改后的协议内容；若您不同意变更修改后的协议内容，您应立即停止使用本协议项下的服务。</p>
        <p>4．2本公司重视对用户隐私的保护。除本协议约定外，本公司将按照比财平台页面相关隐私权政策保护您的身份信息和其他个人信息。</p>
        <p>4．3本协议签订地为中国北京市朝阳区。双方在履行本协议的过程中，如发生争议，应协商解決。协商不成的，任何一方均应向协议签订地有管辖权的人民法院提起诉讼。</p>
      </div>
      <div class="btn">
        <mt-button type="primary" @click="page = false">取消</mt-button>
        <mt-button type="primary" @click="doAgreeHandle">确认</mt-button>
      </div>
    </section>
  </div>
</template>
<script>
  import {PageName, BusName, HOST} from "@/Constant";
  import JsSelect from '@/components/commons/JsSelect'
  import Opening1Mixins from './Opening1'
  import util from "../../../libs/util";

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
          USER_CARD_ID_DATA: '', //身份证有效期
          ADDRESS: '', // 地址
          NATION: '', // 民族
          PHONE: '',

          memberId: null, // 晋商回显需要的
          phoneNum: null, // 晋商回显需要的
          MEMBER_ID: null,
          PHONE_NUM: null
        },

        showType: 0,
        imgStyle1: 'width:30%;vertical-align: middle',
        imgStyle2: 'width:30%;vertical-align: middle;',
        stepImg: require('@/assets/images/account_icon_green2@2x.png'),
        stepImg2: require('@/assets/images/step2@2x.png'),
        stepImg3: require('@/assets/images/step3.png'),
        test1: '',
        test2: '',
        agreeMentSrc: HOST + '/static/finsuit/js/openapi/js/xieyi/cz.html',

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
        errMsg: ''
      }
    },
    components: {
      JsSelect
    },
    mixins: [Opening1Mixins],
    created() {
      // 1-获取回显数据
      let suerinfo = util.storage.session.get('USERINFO')
      if (suerinfo) {
        this.preSrc1 = 'data:image/jpeg;base64,' + suerinfo.CARD_FRONT_URL
        this.preSrc2 = 'data:image/jpeg;base64,' + suerinfo.CARD_BACK_URL
        this.imgStyle1 = 'width:100%;height:100%;vertical-align: middle'
        this.imgStyle2 = 'width:100%;height:100%;vertical-align: middle;'
        // this.data.USER_NAME = suerinfo.USER_NAME
        // this.data.USER_CARD_ID = suerinfo.USER_CARD_ID
        // this.data.PHONE = suerinfo.PHONE_NUM
        // this.data.CARD_BACK_FILE = suerinfo.CARD_BACK_URL
        this.data.CARD_FRONT_FILE = suerinfo.CARD_FRONT_FILE
        this.idCardFanOcr()
        this.idCardZhengOcr()
      }
      console.log(suerinfo);
    },
    methods: {
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
        this.page = true
        this.showType = type
      },
      doAgreeHandle() {
        this.page = false
        this.argee = true
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  body {
    font-size: .3rem;
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
