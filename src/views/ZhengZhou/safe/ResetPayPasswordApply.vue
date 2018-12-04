<template>
  <div>
    <app-bar title="重置密码"></app-bar>
    <section class="id-pic">
      <section class="left">
        <p>身份证正面照片</p>
        <div class="img">
          <img :src="imgFont" alt="">
          <input type="file" capture="camera" accept="image/*" class="inputBox"
                 @change="imgToBaseZheng($event)">
        </div>
      </section>
      <section class="right">
        <p>身份证反面照片</p>
        <section class="img">
          <img :src="imgBack" alt="">
          <input type="file" capture="camera" accept="image/*" class="inputBox"
                 @change="imgToBaseFan($event)">
        </section>
      </section>
    </section>
    <section class="m-form">
      <section class="m-line">
        <span class="n-left">姓名</span>
        <span class="n-right">{{USER_NAME}}</span>
      </section>
      <section class="m-line">
        <span class="n-left">身份证号</span>
        <span class="n-right">{{IDCardNum}}</span>
      </section>
      <section class="m-line">
        <span class="n-left">手机号</span>
        <input class="n-right" type="text" v-model="tel">
        <!--<span class="n-right">{{tel}}</span>-->
      </section>
      <section class="upload-img">
        <p>申请人照片</p>
        <section class="img-box">
          <img :src="preSrc1" class="vatal">
          <input type="file" capture="camera" accept="image/*" class="inputBox"
                 @change="imgToBaseBig($event)">
        </section>
        <!---->
      </section>
      <section class="submit-box">
        <err-msg :errMsg="errMsg" classStyle="err-msg"></err-msg>
        <button class="submit-btn" @click="goNext">下一步</button>
      </section>
    </section>


  </div>
</template>

<script>
  import ActiveInput from '@/components/commons/ActiveInput'
  import ErrMsg from '@/components/commons/ErrMsg'
  import API from "@/service";
  import PassInput from '@/components/password/PassInput'
  import Bus from '@/plugin/bus'
  import {PageName, BusName, LsName} from "@/Constant";
  import util from "libs/util";
  import Mixins from "@/mixins";

  export default {
    name: "ResetPayPassword",
    components: {
      ActiveInput,
      ErrMsg,
      PassInput
    },
    data() {
      return {
        imgFont: require('@/assets/images/cameracopy@2x.png'),
        imgBack: require('@/assets/images/cameracopy@2x.png'),
        preSrc1: require('@/assets/images/resetimg.png'),
        ID_NO: '',
        errMsg: '',
        tel: '',
        IDCardNum: "",
        PHONE_CODE: '',
        MESSAGE_TOKEN: '',
        USER_NAME: '',
        formData: {
          CARD_BACK_FILE: '',
          CARD_FRONT_FILE: "",
          PHOTO: "",
        },
        IMAGE_64: '',
        FILE_NAME: '',

        IS_RESET: '',
        ResetShow: {}
      }
    },
    watch: {
      "$route": "watchRoute"
    },
    mixins: [Mixins.HandleMixin],
    created() {
      this.getErrMsg((beforeInfo) => {
        this.IDCardNum = beforeInfo.USER_CARD_ID
        this.errMsg = beforeInfo.msg
      })
      this.ResetShow = this.getComState.resetPasswordStatus
      this.getShowData(this.ResetShow)
    },
    methods: {
      getShowData(res) {
        this.IS_RESET = res.IS_RESET
        // this.imgFont = 'data:image/jpeg;base64,' + res.CARD_FRONT_URL.replace(/\s/g, "+")
        this.imgFont = 'data:image/jpeg;base64,' + encodeURIComponent(res.CARD_FRONT_URL.replace(/\s/g, '%2B'))
        // this.imgBack = 'data:image/jpeg;base64,' + res.CARD_BACK_URL.replace(/\s/g, "+")
        this.imgBack = 'data:image/jpeg;base64,' + encodeURIComponent(res.CARD_BACK_URL.replace(/\s/g, '%2B'))
        this.USER_NAME = res.USER_NAME
        this.IDCardNum = res.ID_CARD_NO
        this.tel = res.PHONE_NUM
        this.STATUS = res.STATUS
        this.formData.CARD_FRONT_FILE = res.CARD_FRONT_URL
        this.formData.CARD_BACK_FILE = res.CARD_BACK_URL
      },
      watchRoute(to, from) {
        console.log('watchRoute');
        console.log(to);
        console.log(from);
      },
      // 文件上传
      upLoadImg() {
        let data = {
          FILE_NAME: this.FILE_NAME,
          IMAGE_64: encodeURIComponent(this.IMAGE_64)
        }
        API.safe.apiBankUserFileUpload(data, res => {
          this.formData.PHOTO = res.PATH
        })
      },
      // 1。申请重置密码
      resetPayPassword() {
        let data = {
          // TYPE	请求类型
          // ID_POSITIVE_IMAGE	身份证正面
          // ID_DREVERSE_IMAGE	身份证反面
          // LIFE_IMAGE	图片路径
          // APPY_TYPE	申请类型

          LIFE_IMAGE: this.formData.PHOTO,
          APPY_TYPE: '1', // 1：重置密码,2：修改手机号，3：注销变更卡
          ID_POSITIVE_IMAGE: encodeURIComponent(this.formData.CARD_FRONT_FILE),
          ID_DREVERSE_IMAGE: encodeURIComponent(this.formData.CARD_BACK_FILE)
        }
        if(!data.LIFE_IMAGE){
          Bus.$emit(BusName.showToast,'请上传申请人手持照片')
          return
        }
        // this.IS_RESET  =1 直接申请  为空 ''的话 判断this.STATUS
        // this.STATUS = 1 或 2  return
        console.log(data);
        if (!this.IS_RESET) {
          if (this.STATUS == 1 || this.STATUS == 2) {
            Bus.$emit(BusName.showToast,'你已经提交过申请')
            this.$router.push({name: PageName.ResetPayPasswordStatus})
            return
          }
        }
        API.safe.apiTransactionPasswordAudit(data, res => {
          this.$router.push({name: PageName.MoreService})
          Bus.$emit(BusName.showToast, '提交申请成功')
        })
      },
      imgToBaseZheng(e) {
        let file = e.target.files[0]
        let newsrc = this.getObjectURL(file);
        this.imgFont = newsrc
        util.imgScale(newsrc, file, 4).then((data) => {
          console.log(data);
          // this.formData.CARD_FRONT_FILE = data.split(',')[1].replace(/\+|\s/g, '%2B')
          this.formData.CARD_FRONT_FILE = data.split(',')[1].replace(/\s/g, '%2B')
          this.idCardZhengOcr()
        })
      },

      imgToBaseFan(e) {
        let file = e.target.files[0]
        let newsrc = this.getObjectURL(file);
        this.imgBack = newsrc
        util.imgScale(newsrc, file, 4).then((data) => {
          console.log(data);
          // this.formData.CARD_BACK_FILE = data.split(',')[1].replace(/\+|\s/g, '%2B')
          this.formData.CARD_BACK_FILE = data.split(',')[1].replace(/\s/g, '%2B')
          // this.idCardFanOcr(data)
        })
      },
      imgToBaseBig(e) {
        console.log(e);
        let file = e.target.files[0]
        this.FILE_NAME = file.name
        let newsrc = this.getObjectURL(file);
        this.preSrc1 = newsrc
        util.imgScale(newsrc, file, 4).then((data) => {
          // this.IMAGE_64 = data.split(',')[1].replace(/\+|\s/g, '%2B')
          this.IMAGE_64 = data.split(',')[1].replace(/\s/g, '%2B')
          // this.idCardFanOcr(data)
          this.upLoadImg()
        })
      },
      /**
       * 身份证 ocr
       */
      idCardZhengOcr() {
        let params = {
          TYPE: 'ID_CARD_FRONT_PHONE_OCR',
          ISFRONT: 'true',
          // CARD_BASE: this.formData.CARD_FRONT_FILE.replace(/\+/g, '%2B'),
          CARD_BASE: encodeURIComponent(this.formData.CARD_FRONT_FILE.replace(/\s/g, '%2B')),
        }
        API.open.IdCardFrontPhoneOcr(params, (res) => {
          console.log(res);
          this.USER_NAME = res.NAME
          this.IDCardNum = res.NUM
        })
      },
      goNext() {
        this.resetPayPassword()
      },
      showErrMsg(msg) {
        this.errMsg = msg;
        setTimeout(() => {
          this.errMsg = '';
        }, 2000)
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
    },

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/px2rem";

  .upload-img {
    p {
      font-size: px2rem(14);
      color: #858e9f;
      line-height: px2rem(50);
    }
    .img-box {
      position: relative;
      width: px2rem(154);
      height: px2rem(84);
      .inputBox {
        opacity: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

      }
      img {
        width: 100%;
        height: 100%;
      }
    }

  }

  .id-pic {
    font-size: px2rem(12);
    color: #444;
    display: flex;
    .left {
      padding-right: px2rem(20);
      text-align: right;
      flex: 1;
      p {
        padding-right: px2rem(15);
      }
    }
    .right {
      padding-left: px2rem(20);
      text-align: left;
      flex: 1;
      p {
        padding-left: px2rem(15);
      }
    }
    .img {
      position: relative;
      margin-top: px2rem(20);
      display: inline-block;
      width: px2rem(126);
      height: px2rem(76);
      /*background: #6e6e6e;*/
      img {
        width: 100%;
        height: 100%;
      }
      .inputBox {
        opacity: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  .m-form {
    width: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(20);
  }

  .m-line {
    display: flex;
    box-sizing: border-box;
    line-height: px2rem(42);
    background-size: 0.7rem 0.7rem;
    border-bottom: 1px #E5E5E5 solid;
    font-size: px2rem(14);
    .n-left {
      width: px2rem(100);
    }
    .n-right {
      flex: 1;
      display: inline-block;
      color: #8e8e8e
    }
  }

  .slot {
    position: absolute;
    display: inline-block;
    z-index: 3;
    right: 0;
    top: auto !important;
    bottom: px2rem(8);
    border: 1px solid #2B74FE;
    color: #2B74FE;
    width: px2rem(80);
    height: px2rem(25);
    border-radius: px2rem(6);
  }

  .submit-box {
    position: relative;
    padding-top: px2rem(60);
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
    margin: 0 auto;
    text-align: center;
    border: none;
    outline: none;
  }

  .err-msg {
    position: absolute;
    top: px2rem(0);
    left: 50%;
    transform: translateX(-50%);
  }

  .foot-text {
    color: #8e8e8e;
    padding-top: px2rem(20);
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
