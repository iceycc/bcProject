<template>
    <div class="app">
        <app-bar title="充值"></app-bar>
        <div class="rechargetitle">充值到民生直销银行</div>
        <div class="minshengbank">
            <span class="minshengbankLogo"><img :src="imgSrc + logo" style="width:75%"
                                                alt=""></span>
            {{ORG_NAME}}
        </div>
        <div class="rechargetitle">银行卡</div>
        <div class="minshengbank" style="border-bottom:1px solid #EEEEF0">
            <span class="minshengbankLogo" style=" padding-top: 10px;"><img :src="imgSrc + CARD_BANK_URL"
                                                                            style="width:75%" alt=""></span>
            {{CARD_BANK_NAME}}
        </div>
        <div class=" money">
            <p>每笔限额：10000.00元</p>
            <p>每日限额：200000.00元</p>
        </div>
        <div class="inputAmount"><span class="Amount">金额</span> <input v-model="APPLY_AMOUN" type="text"
                                                                       placeholder="请输入金额"></div>
        <button class="tijiao" @click="doNext">确认充值</button>
        <p class="bang">我已阅读并同意注册<span @click="showPage" style=" color:#0096FE;">《充值协议》</span></p>
        <section v-show="page" class="page">
            <iframe :src="agreeMentSrc" class="docs"></iframe>
            <div class="btn">
                <mt-button type="primary" @click="cancel">取消</mt-button>
                <mt-button type="primary"@click="getCode">确认</mt-button>
            </div>
        </section>
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
                        ></pass-input>
                    </div>
                    <p class="info">密码由数字组成，必须为6位</p>
                </section>
                <div class="btn">
                    <mt-button @click="show =!show" type="primary">取消</mt-button>
                    <mt-button @click="doReCange" type="primary">提交</mt-button>
                </div>
            </section>
        </section>

    </div>
</template>
<script>
    import {API} from "../../request/api";
    import AppBar from '../../components/header/AppBar'
    import {HOST} from '../../Constant'
    import PassInput from '../../components/commons/PassInput'
    import Bus from '../../common/js/bus'
    import {PageName,imgSrc,BusName} from "../../Constant";
    import {util} from "../../common/utils/util";

    export default {
        data() {
            return {
                show: false,
                html: '协议',
                page: false,
                PIN: '',
                APPLY_AMOUN: '',
                toUrl: '',
                ifGet:false,
                write:false, // 是否签约充值协议
                agreeMentSrc:HOST + '/static/finsuit/js/openapi/js/xieyi/cz.html',
                ORG_NAME:'',
                imgSrc:imgSrc,
                logo:'',
                CARD_BANK_NAME:'',
                CARD_BANK_URL:''
            }
        },
        components: {
            AppBar,
            PassInput
        },
        created() {
            this.getInfos()
            this.ORG_NAME = this.$route.query.ORG_NAME
            this.logo = this.$route.query.logo

            this.reChangeHandele()
        },

        methods: {
            getInfos(){
                API.safe.apiBandCard({},res =>{
                    this.CARD_BANK_NAME = res.CARD_BANK_NAME;
                    this.CARD_BANK_URL = res.CARD_BANK_URL
                })
            },
            reChangeHandele() { // 39查询用户是否已签约充值协议
                let data = {}
                API.reChange.apiRechargeProtoQuery(data, (res) => {
                    console.log(res);
                    if (res.SIGN_STATE == 'N') {
                        this.write = true

                    }else{

                    }
                })
            },

            getCode() { // 获取充值协议码
                API.reChange.apiRechargeProtoCode({}, res => {
                    console.log(res);
                    this.PIN = res.PIN
                    this.page = false
                })
            },
            showPage(){
                this.page = true
            },
            cancel(){
                this.page =false
            },
            doNext(){
                //
                this.Londing.open()
                setTimeout(()=>{
                    this.Londing.close()
                    this.show = true
                },1000)
            },
            doReCange() {
                this.pass = $('#payPass').$getCiphertext()
                this.len = $('#payPass').$getPasswordLength()
                let msg;
                if(msg=util.Check.payPassLen(this.len)) return Bus.$emit(BusName.showToast,msg);


                this.show = false
                let data = {
                    PHONE_CODE: '123456', // todo
                    PIN: this.PIN,
                    BANK_PAY_PW: this.pass,
                    APPLY_AMOUNT: this.APPLY_AMOUN
                }

                API.reChange.apiRecharge(data, res => {
                    this.$router.push({
                        name:PageName.Rechargesuccess,
                        query:{
                            money:this.APPLY_AMOUN,
                                ...res
                        }
                    })
                },err=>{
                    this.$router.push({
                        name:PageName.Rechargefailure,
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app .rechargetitle {
        padding-left: 0.5rem;
        height: 0.8rem;
        background: #F6F6F9;
        line-height: 0.8rem;
        color: #444444;
        font-size: 0.4rem;
    }

    .app .minshengbank {
        padding-left: 0.5rem;
        height: 1.8rem;
        line-height: 60px;
        font-size: 0.5rem;
    }

    .money {
        padding-left: 0.5rem;
        height: 1.7rem;
        color: #9199A1;
        font-size: 0.4rem;
    }

    .app .inputAmount {
        padding-left: 0.5rem;
        height: 1.2rem;
        line-height: 1rem;
        font-size: 0.4rem;
        border-top: 0.4rem solid #EEEEF0;
        border-bottom: 1px solid #EEEEF0;
    }

    .inputAmount input {
        width: 50%;
        border: none;
        box-sizing: border-box;
        font-size: 0.4rem;
        color: #333;
        /* line-height: 0.5rem; */
        outline: none;
    }

    .Amount {
        display: inline-block;
        height: 100%;
        width: 1.8rem;
    }

    .tijiao {
        margin-top: 50px;
        font-size: 0.5rem;
        color: #fff;
        background-color: #508CEE;
        /* border-radius: 0.1rem; */
        line-height: 1.2rem;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        margin-top: 0.8rem;
        border: 0px;
        outline: none;
        display: block;
    }

    .bang {
        margin-left: 0.5rem;
        background-image: url(../../images/img/agree@3x.png);
        font-size: 0.4rem;
        color: #808080;
        background-repeat: no-repeat;
        background-size: 0.3rem 0.3rem;
        padding: 0 0.5rem;
        background-position: 0 0.2rem;
    }

    .minshengbankLogo {
        line-height: 100%;
        display: inline-block;
        height: 60%;
        width: 50px;
        float: left;
        padding-top: 0.4rem;
    }

    .page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 100;
        padding: .7rem 0;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .docs{
            border: none;
            width: 100%;
            height: 100%;
        }
        .btn{
            padding: 0 1rem;
            height: 3rem;
            button{
                width: 3.5rem;
                margin-right: .4rem;
            }
        }
    }
    .bgbox{
        z-index: 2;
        width: 100%;
        height: 100%;
        background: rgba(1,1,1,.7);
        position: fixed;
        padding-top: 1.7rem;
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
