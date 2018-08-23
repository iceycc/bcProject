<template>
    <div class="app">
        <app-bar title="购买"></app-bar>
        <div class="buytitle" style="padding:0 0.4rem">
            <div>
                <div class="buytitleleftimg">
                    <img src="../../images/img/licaiicon@2x.png" style="width:100%" alt="">
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
            <div class="jiaoyibankzhixiaoname">民生直销银行</div>
        </div>
        <mt-button @click="buyHandle" class="tijiao">确认购买</mt-button>
        <p class="bang">我已阅读并同意注册<strong style=" color:#0096FE;">《用户授权服务协议》《晋商银行直销银行电子账户服务协议》</strong></p>
        <section v-if="show" class="bgbox">
            <section class="passbox">
                <p class="title">
                    <img src="../../images/img/icon_dunpai@2x.png" alt="">
                    由晋商银行提供技术保障</p>
                  <section class="field_row_wrap">
                      <p class="field_row_key">
                          交易密码
                      </p>
                      <div class="field_row_value">
                          <pass-input
                                  inputID="payPass"
                                  :doGetData="ifGet"
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
    import {API} from "../../request/api";

    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    import {DeviceId, PageName} from "../../Constant";
    import PassInput from '../../components/commons/PassInput'
    import Bus from '../../common/js/bus'

    export default {
        data() {
            return {
                show: false,
                money: null,
                datas: {},
                deviceId: DeviceId,
                toUrl: '',
                ifGet: false,
                pass: "",
                len: 0
            }
        },
        components: {
            PassInput
        },
        created() {
            this.datas = this.$route.query
            Bus.$on('payPass', (data) => {
                console.log(data);
                this.pass = data.pass
                this.len = data.len
            })
        },
        destroyed() {
            Bus.$off('payPass')
        },

        methods: {
            buyHandle() {
                this.Londing.open()
                setTimeout(()=>{
                    this.show = true
                    this.Londing.close()
                },500)
            },
            doPay() {

                let data = {
                    PRD_ID: this.datas.id + '',
                    APPLY_AMOUNT: this.datas.money + '',
                    BANK_PAY_PW: this.pass
                }
                this.Londing.open({
                    spinnerType: 'triple-bounce'
                })
                this.show = false
                API.buy.apiBuy(data, (res) => {
                    this.$router.push({
                        name: PageName.Buysuccess,
                        query: {
                            money: this.datas.money,
                            PRD_NAME: this.datas.PRD_NAME,
                            ORG_NAME: this.datas.ORG_NAME,
                            OPERA_DATE: res.OPERA_DATE,
                            BESHARP_BUY_SEQ: res.BESHARP_BUY_SEQ
                        }
                    })
                    this.Londing.close()
                },err=>{
                    this.Londing.close()
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
        color: 444
    }

    .tijiao {
        font-size: 0.5rem;
        color: #fff;
        background-color: #518BEE;
        border-radius: 0.2rem;
        line-height: 1.2rem;
        width: 63%;
        margin: 0 auto;
        text-align: center;
        margin-top: 0.5rem;
        outline: none;
        display: block;
    }

    .bang {
        margin-top: 0.5rem;
        padding-right: 0.3rem;
        background-image: url(../../images/img/agree@3x.png);
        font-size: 0.35rem;
        color: #808080;
        background-repeat: no-repeat;
        background-size: 0.4rem 0.4rem;
        padding: 0 0.8rem;
        background-position: 0.2rem 0.05rem;
    }

    .passBox{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top:0;
        background: rgba(1,1,1,0.3);
        .inputbox{
            width: 80%;
            margin: 1rem auto;
            background: #fff;
        }
    }

    .bgbox{
        z-index: 2;
        width: 100%;
        height: 100%;
        background: rgba(1,1,1,.7);
        position: fixed;
        padding-top: 0.7rem;
        top: 0;
        left: 0;
        .passbox{
            background: #fff;
            width: 80%;
            margin: 0 auto;
            padding: 0.4rem;
            box-sizing: border-box;
        }
        .field_row_key{
            font-size: 0.4rem;
        }
        .title{
            margin-bottom: 0.5rem;
            text-align: center;
            font-size: 0.4rem;
            color: #666;
            height: .6rem;
            line-height: .6rem;
            img{
                vertical-align: top;
                width: .5rem;
            }
        }
        .field_row_wrap{
            margin-bottom: 0.2rem;
        }
        .field_row_value{
            border-radius: 4px;
            border: 1px solid #9e9e9e;
            height: 0.9rem;
            line-height: 0.9rem;
            margin: 0.2rem 0;
        }
        .info{
            font-size: 0.3rem;
            line-height: 0.6rem;
            color: #aeaeae;
        }
        .btn{
            display: flex;
            button{
                margin: 0 .3rem;
                text-align: center;
                flex: 1;
            }
        }
    }
</style>
