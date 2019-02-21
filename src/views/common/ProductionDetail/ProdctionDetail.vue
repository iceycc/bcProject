<template>
  <div class="main">
    <app-bar :title="PRD_NAME" class="app-bar"></app-bar>
    <!--产品详情-->
    <pro-banner :swiperIndex="swiperIndex" :NAV_List="NAV_List" :productDetail="productDetail"
                :proType="proType"></pro-banner>
    <section class="content">
      <content-box title="产品名称">
        <p class="pro-content">{{PRD_NAME}}</p>
      </content-box>
      <!--产品详情-->
      <content-box title="产品详情">
        <pro-detail :productDetail="productDetail" :proType="proType"></pro-detail>
      </content-box>
      <!--交易步骤-->
      <content-box title="交易步骤">
        <section class="pay-step">
          <div class="line">
            <img class="number" src="@/assets/images/1copy13@2x.png" alt="">
            <img class="arrow" src="@/assets/images/arowcopy13.png" alt="">
            <img class="number" src="@/assets/images/2copy13@2x.png" alt="">
            <img class="arrow" src="@/assets/images/arowcopy13.png" alt="">
            <img class="number" src="@/assets/images/3copy13@2x.png" alt="">
            <img class="arrow" src="@/assets/images/arowcopy13.png" alt="">
            <img class="number" src="@/assets/images/4copy13@2x.png" alt="">
          </div>
          <div class="text">
            <span>点击安全购买</span>
            <span>直销银行开户</span>
            <span>直销银行购买</span>
            <span>购买完成</span>
          </div>
        </section>
      </content-box>
      <!--直销银行说明-->
      <content-box title="直销银行说明">
        <section class="org-detail">
          <section class="org-logo">
            <img :src="imgurl + productDetail.LOGO_URL" alt="">
          </section>
          <section class="org-inf">
            <p class="info-1">{{productDetail.ORG_NAME}}</p>
            <p class="info-2">隶属于 {{productDetail.ORG_DES}} </p>
          </section>
        </section>
      </content-box>
      <!--产品描述-->
      <content-box title="产品描述">
        <div class="pro-desc sp-span" v-html="DEPICT"></div>
      </content-box>

      <section class="bicai-desc">
        <section class="bc-top">
          <img src="@/assets/images/logo@2x.png" alt="">
          <span>比财数据科技</span>
        </section>
        <ul class="bc-middle">
          <li class="bc-li">
            <div>
              <img src="@/assets/images/platform@2x.png" alt="">
            </div>
            <p>专业平台</p>
          </li>
          <li class="bc-li">
            <div>
              <img src="@/assets/images/account_bottom_label2@2x.png" alt="">
            </div>
            <p>银行直签</p>
          </li>
          <li class="bc-li">
            <div>
              <img src="@/assets/images/account_bottom_label3@2x.png" alt="">
            </div>
            <p>安全保障</p>
          </li>
        </ul>
        <section class="bc-bottom">
          <img src="@/assets/images/icon_dunpai@2x.png" alt="">
          <span>账户资金安全由存管银行保障</span>
        </section>
      </section>
    </section>
    <section class="b-btn" @click="goNext(type)">
      <span class="p-icon"></span><span>{{btnType}}</span>
    </section>
  </div>
</template>
<script>
  import API from "@/service";
  import {PageName, imgSrc, LsName, BusName} from "@/Constant";
  import util from "@/libs/util";
  import Mixins from "@/mixins"
  import Bus from '@/plugin/bus/index'
  import ContentBox from "./components/ContentBox"
  import ProBanner from "./components/ProBanner"
  import ProDetail from "./components/ProDetail"

  export default {
    components: {
      ContentBox,
      ProBanner,
      ProDetail
    },
    data() {
      return {
        NAV_List: [{}, {}],
        productDetail: {
          RATE: "",
          PERIOD: "",
          RISK_LEVEL: "",
          TXT_MIN_AMOUNT: "",
          OPENAPI_BUY_COUNT: "",
          IS_INTERVIEW: "",
          DEPICT: "",
          ORG_LEVEL: "",
          COLLECT_START_DATE: "",
          COLLECT_END_DATE: "",
          VALUE_DATE: "",
          FIN_END_DATE: ""
        },
        DEPICT: '', // 从另一个接口获得产品描述
        btnType: "安全购买",
        proID: "",
        type: "1", // 预约还是购买控制
        imgurl: imgSrc, //
        PRD_NAME: "",
        swiperIndex: '0',
        proType: {
          // 产品类型
          PRD_TYPE_ID: '',
          DEPOSIT_TYPE_ID: ''
        }
      }
    },
    mixins: [Mixins.redirectByFromPage],
    created() {
      if (this.$route.query.PRD_NAME) {
        document.title = this.$route.query.PRD_NAME
        this.PRD_NAME = this.$route.query.PRD_NAME;
      }
      // 获取产品类型
      //  PRD_TYPE_ID 1 货币基金 2 理财产品 3 纯债 4 存款
      //  PRD_DOCKING_TYPE  DEPOSIT_TYPE_ID // 1活期，2智能存款 3.结构性 4 定期
      let PRD_TYPE_ID = this.$route.query.PRD_TYPE_ID || '4'
      let DEPOSIT_TYPE_ID = this.$route.query.DEPOSIT_TYPE_ID || '4'
      this.proType = {
        PRD_TYPE_ID,
        DEPOSIT_TYPE_ID
      }
      // 获取机构ID
      this.ORG_ID = util.storage.session.get('ORG_ID')
      // 获取产品详情
      this.proID = this.$route.query.PRO_ID;
      this.getData(this.proID);
    },
    directives: {
      focus: { // 自定义事件
        inserted(el) {
          el.focus()
        }
      }
    },
    filters: {
      PRD_TYPE_ID_FILTER(val, type) {
        let str = '产品类型';
        switch (val - 0) {
          case 1:
            str = '货币基金'
            break;
          case 2:
            str = '理财'
            break;
          case 3:
            str = '纯债'
            break;
          case 4:
            //  1：活期
            //  2：智能
            //  3：结构性
            //  4：
            if (type == 1) {
              str = '活期存款'
            }
            if (type == 2) {
              str = '智能存款'
            }
            if (type == 3) {
              str = '结构性存款'
            }
            if (type == 4) {
              str = '存款'
            }
            break;
        }
        return str
      },
      TXT_MIN_AMOUNT_Filter(val) {
        let str = val.toString()
        return str.substring(0, str.length - 1)
      },
      IS_INTERVIEW_filter(val) {
        // if(!val) return val
        let msg = "";
        if (val == 0) {
          return (msg = "首次购买无需面签");
        }

        if (val == 1) {
          return (msg = "首次购买无需面签");
        }

        if (val == 2) {
          return (msg = "首次购买无需面签");
        }
        return (msg = "首次购买无需面签");
      }
    },
    methods: {
      getData(id) {
        let data = {
          ID: id + ""
        };
        API.bicai.getPrdInfo(data, res => {
          this.setProType(data)
          this.productDetail = res;
          this.productDetail.ORG_LEVEL = Math.floor(this.productDetail.ORG_LEVEL)
          this.title = res.PRD_NAME
          // 判断起购金额是否大于默认金额
          let str = this.productDetail.TXT_MIN_AMOUNT;
          this.setComState({type: 'PRD_TYPE', value: this.productDetail.PRD_TYPE})
          // 轮播图数据
          let index = 0;
          if (res.NAV_List && res.NAV_List.length > 0) {
            this.NAV_List = res.NAV_List
            this.NAV_List.forEach((item, i) => {
              if (item.RATE == this.RATE) {
                index = i
              }
            })
            console.log(res.NAV_List);
          }
          this.swiperIndex = index
          // setTimeout(() => {
          //   this.swiper.slideTo(index + 1, 1000, false)
          // }, 100)
          // IS_REALTIME_DATA_PRD
          // 1是，走无密码登录带红色提示（亿联）
          // 0否，走无密码的登录页（郑州，众邦
          // todo
          this.setComState({type: 'IS_REALTIME_DATA_PRD', value: ''})
          this.type = res.IS_ENABLED;
          this.btnType = this.type == 1 ? "安全购买" : "预约下期";
        });
      },
      goNext() {
        console.log(this.proID);
        // this.removeComState('ProDuctData')
        let goBuyData = {
          id: this.proID,
          logo: this.productDetail.LOGO_URL,
          ...this.productDetail
        };
        if (this.type == 1) {
          API.watchApi({
            FUNCTION_ID: 'ptb0A002',
            REMARK_DATA: '异业合作-产品详情页-购买-安全购买', // 中文备注
            FROM_ID: this.proID + '', // 产品ID、机构ID
          })
        } else {
          // 此处一下的逻辑没有判断预约的逻辑。如有添加以后再添加
          API.watchApi({
            FUNCTION_ID: 'ptb0A002',
            REMARK_DATA: '异业合作-产品详情页-购买-预约下期', // 中文备注
            FROM_ID: this.proID + '', // 产品ID、机构ID
          })
        }
        this.setComState({type: 'goBuy', value: goBuyData})
        this.setComState({type: 'loginType', value: '安全购买'})
        // let {LOGO_URL, ORG_NAME} = this.productDetail
        let {TOKEN} = this.$store.getters.GET_ACCOUNT_STATE
        let {IS_SYNC_FLAG, IS_RZ_FLAG, H5_URL_ANDRIOD, H5_URL_IOS, AUTH_URL_FLAG} = this.getComState.ProAndOrgType
        let {LOGO_URL, ORG_NAME} = this.productDetail
        if (TOKEN) {
          if (IS_SYNC_FLAG == 1 || (IS_SYNC_FLAG == 0 && IS_RZ_FLAG == 1) || AUTH_URL_FLAG == 1) {
            // 打通open API 获取没打通openApi但是要实名
            this.checkAuthStatus()
          } else {
            if (H5_URL_ANDRIOD || H5_URL_IOS) {
              Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
              setTimeout(() => {
                window.location.href = H5_URL_ANDRIOD || H5_URL_IOS
              }, 2000)
            } else {
              alert('请配置银行直联跳转链接')
            }
          }

        } else {

          // Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME})
          this.$router.push({name: PageName.Login})
        }
      },

      setProType(data) {
        API.bicai.getPrdFootInfo(data, res => {
          // 新增 平安银行 这种登录授权的 0：使用之前的逻辑 1：实名认证后，调用免登接口
          this.DEPICT = res.DEPICT
          this.AUTH_URL_FLAG = res.AUTH_URL_FLAG || '0'
          let {
            AUTH_URL_FLAG = '0',
            ID,// 产品id
            ORG_NAME,//机构名称
            PRD_NAME, // 产品名称
            ORG_ID, // 机构id
            IS_SYNC_FLAG, // '是否由openAPI同步产品, 0：否, 1：是',
            IS_REALTIME_DATA_PRD, // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
            IS_RZ_FLAG, // '是否实名认证, 0：否, 1：是',
            H5_URL_ANDRIOD,// 非打通openApi 跳转链接 安卓
            H5_URL_IOS, // 非打通openApi 跳转链接 ios
            LOGO_URL
          } = res
          // `IS_SYNC_FLAG`  '是否由openAPI同步产品, 0：否, 1：是',
          // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
          // `IS_RZ_FLAG` '是否实名认证, 0：否, 1：是',
          // set
          let ProData = {
            LOGO_URL,
            AUTH_URL_FLAG,
            ID,// 产品id
            ORG_NAME,//机构名称
            PRD_NAME, // 产品名称
            ORG_ID, // 机构id
            IS_SYNC_FLAG, // '是否由openAPI同步产品, 0：否, 1：是',
            IS_REALTIME_DATA_PRD, // `IS_REALTIME_DATA_PRD` 'H5实时数据对接标识： 0不是  1是',
            IS_RZ_FLAG, // '是否实名认证, 0：否, 1：是',
            H5_URL_ANDRIOD,// 非打通openApi 跳转链接 安卓
            H5_URL_IOS // 非打通openApi 跳转链接 ios
          }
          console.log(ProData);
          this.setComState({
            type: 'ProAndOrgType', value: ProData
          })
        })

      },
      // 判断该用户在比财的实名认证状态
      checkAuthStatus() {
        // this.setComState({type: 'ISLogin', value: false})
        let {LOGO_URL, ORG_NAME} = this.productDetail
        API.bicai.getAuthStatus({}, res => {
          let {AUTH_STATUS, isOldMember, idName} = res
          this.setComState({type: 'idName', value: idName})

          //  AUTH_STATUS 返回码：
          // 0:未认证，
          // 1:身份证认证，
          // 2:银行卡认证，
          // 3:密码设置，
          // 4:认证完成，
          // 5:身份证过期
          console.log(AUTH_STATUS);
          switch (Number(AUTH_STATUS)) {
            case 0:
            case 1:
              Bus.$emit(BusName.showToast, MsgText, 3000)
              this.$router.push(PageName.BcOpening0)
              break;
            case 2:
              Bus.$emit(BusName.showToast, MsgText, 3000)
              this.$router.push(PageName.BcOpening2)
              break;
            case 3:
            case 4:
              // 已经完成实名的了
              let {IS_SYNC_FLAG, H5_URL_ANDRIOD, H5_URL_IOS, AUTH_URL_FLAG} = this.getComState.ProAndOrgType
              // console.log('this.getComState.ProAndOrgType', this.getComState.ProAndOrgType);
              if (IS_SYNC_FLAG == 0) {
                // 非打通openApi
                if (AUTH_URL_FLAG == 1) {
                  // 1：是否需要调取免登录：实名认证后，调用免登接口 返回H5直联的面登录路径
                  API.bicai.getAuthUrl({}, res => {
                    if (res.STATUS == 1) {
                      console.log(res.AUTH_URL);
                      Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
                      if (res.AUTH_URL) {
                        setTimeout(() => {
                          window.location.href = res.AUTH_URL
                        }, 2000)
                      } else {
                        alert('请配置银行直联跳转链接')
                      }
                    } else {
                      Bus.$emit(BusName.showToast, res.MESSAGE)
                    }
                  })
                } else {
                  // 0：使用之前的逻辑
                  if (H5_URL_ANDRIOD || H5_URL_IOS) {
                    Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME}, 10000)
                    setTimeout(() => {
                      window.location.href = H5_URL_ANDRIOD || H5_URL_IOS
                    }, 2000)
                  } else {
                    alert('请配置银行直联跳转链接')
                  }
                }
              } else {
                // 打通openApi 校验在本行的的校验
                this.checkBankOpenAndLogin()
              }
              break;
            case 5:
              Bus.$emit(BusName.showToast, MsgText, 3000)
              this.$router.push(PageName.BcOpening0)
              break;
          }
        })
      },
      // 判断该用户在本行的状态 银行的了
      checkBankOpenAndLogin() {
        let {LOGO_URL, ORG_NAME} = this.productDetail
        Bus.$emit(BusName.showBankLonding, {LOGO_URL, ORG_NAME})
        let data = {
          IS_RET_GRADE: '1'
        }
        API.common.apiQryLoginStatus(data, res => {
          let HAS_OPEN_BANK = res.HAS_OPEN_BANK || res.hasOpenBank
          let HAS_LOGIN = res.HAS_LOGIN || res.hasLogin
          let HAS_GRADE = res.HAS_GRADE || res.hasGrade
          let HAS_OPEN_ACCOUNT_TEXT = res.HAS_OPEN_ACCOUNT_TEXT || res.hasOpenAccountText

          this.setComState({type: 'HAS_GRADE', value: HAS_GRADE})
          if (HAS_OPEN_BANK == 1) {
            // 开户成功
            this.loginSuccess(res)
            // this.checkBankStatus()
          } else if (HAS_OPEN_BANK == 2) {
            this.checkBankStatus()
          } else if (HAS_OPEN_BANK == 3) {
            Bus.$emit(BusName.showToast, HAS_OPEN_ACCOUNT_TEXT, 3000)
          } else if (HAS_OPEN_BANK == 4) {
            Bus.$emit(BusName.showToast, HAS_OPEN_ACCOUNT_TEXT, 3000)
          }
        })
      },
      // 判断该用户在本行的回显
      checkBankStatus() {
        // 登陆比财成功 且在比财实名成功 然后 检查在本行状态
        let data = {}
        API.common.apiRegisterBackShow(data, res => {
          let step = res.LAST_STEP_NUM || res.lastStepNum
          this.setComState({type: 'TEL', value: this.tel})
          // （0未提交，1提交第一步，2提交第二步，3提交第三步）
          // util.storage.session.set('USERINFO', res)
          if (step == 0) {
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.setComState({type: 'openingData', value: res})
            this.$router.push({name: PageName.Opening1})
          }
          if (step == 1) {
            Bus.$emit(BusName.showToast, MsgText, 3000)
            this.setComState({type: 'openingData', value: res})
            this.$router.push({name: PageName.Opening2})
          }
          if (step == 2) {
            this.setComState({type: 'Infos', value: res})
            // 众邦银行
            if (this.ORG_ID == '227') {
              // 成功
              this.loginSuccess(res)
            }
            // 郑州银行
            if (this.ORG_ID == '49') {
              // 第三步
              this.$router.push({name: PageName.Opening3})
            }
            // 客商银行
            if (this.ORG_ID == '248') {
              this.loginSuccess(res)
            }
          }
          if (step == 3) {
            // todo登陆成功后判断拿来的去哪里
            this.setComState({type: 'ISLogin', value: true})
            this.setComState({type: 'Infos', value: res})
            if (this.ORG_ID == '49') {
              // 第三步
              this.loginSuccess(res)
            }
          }
        }, err => {
          this.codeText = '重新发送'
          this.msgDisabled = false
        })
      },
      loginSuccess() {
        this.setComState({type: 'ISLogin', value: true})
        this.$router.push({name: PageName.Buying})
      },
    }
  };
</script>
<style lang="scss" scoped>
  .content {
    /*产品名称*/
    .pro-content {
      font-size: px2rem(14);
      padding: 0 px2rem(20);
      height: px2rem(49);
      line-height: px2rem(49);
      color: #666;
    }

    /*交易步骤*/
    .pay-step {
      box-sizing: border-box;
      padding: px2rem(13) 0;

      .text {
        text-align: center;
        display: flex;
        padding: px2rem(10) px2rem(10) 0;

        span {
          flex: 1;
          font-size: px2rem(13);
          color: #333;
        }
      }

      .line {
        text-align: center;
        line-height: px2rem(20);

        img {
          vertical-align: middle;
        }

        .number {
          width: px2rem(20);
          height: px2rem(20);
        }

        .arrow {
          width: px2rem(66);
        }
      }
    }

    /*直销银行说明*/
    .org-detail {
      padding: px2rem(14) px2rem(20);
      display: flex;

      .org-logo {
        width: px2rem(72);
        height: px2rem(72);
        border-radius: px2rem(4);
        overflow: hidden;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .org-inf {
        padding-left: px2rem(7);

        .info-1 {
          padding-top: px2rem(10);
          font-size: px2rem(16);
        }

        .info-2 {
          padding-top: px2rem(10);
          font-size: px2rem(12);
          color: #999999
        }
      }
    }

    /*产品描述*/
    .pro-desc {
      padding: px2rem(14) px2rem(20);
      color: #666;
    }

  }

  .b-btn {
    width: 100%;
    height: px2rem(50);
    line-height: px2rem(50);
    background: #508CEE;
    color: #fff;
    text-align: center;
    font-size: px2rem(18);
    vertical-align: middle;

    .p-icon {
      width: px2rem(22);
      height: px2rem(22);
      background: url("~@/assets/images/p-safe@2x.png") no-repeat 0 0;
      background-size: 100%;
      position: relative;
      margin-top: px2rem(-3);
      margin-right: px2rem(4);
      vertical-align: middle;

    }
  }

  .bicai-desc {
    background: #fafcff;
    padding-top: px2rem(14);
    .bc-top {
      position:relative;
      color: #A0B2CF;
      text-align:center;
      height: px2rem(20);
      line-height: px2rem(20);
      font-size: 0;
      span{

        vertical-align: middle;
        font-size: px2rem(12);
      }
      img {
        vertical-align: middle;
        width: px2rem(16);
        height: px2rem(16);
      }
      &:before{
        position: absolute;
        display: inline-block;
        content: '';
        width: px2rem(125);
        height: px2rem(1);
        top: px2rem(9);
        left: px2rem(10);
        background:#A0B2CF ;
      }
      &:after{
        position: absolute;
        display: inline-block;
        content: '';
        width: px2rem(125);
        height: px2rem(1);
        top: px2rem(9);
        right: px2rem(10);
        background:#A0B2CF ;

      }
    }

    .bc-middle {
      display: flex;
      padding-top: px2rem(18);
      .bc-li {
        flex:1;
        text-align: center;
        img{
          width: px2rem(44);
          height: px2rem(44);
        }
        p{
          font-size: px2rem(13);
          color:#666
        }
      }
    }

    .bc-bottom {
      text-align: center;
      font-size: 0;
      padding: px2rem(12) 0 px2rem(22);
      span{
        vertical-align: middle;
        font-size: px2rem(10);
        color:#333
      }
      img{
        margin-right: px2rem(3);
        margin-top: px2rem(-2);
        vertical-align: middle;
        width: px2rem(15);
      }
    }
  }
</style>

