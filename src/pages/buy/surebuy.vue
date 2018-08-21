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
        <div    v-show="show"
                class="field_row_wrap" style="padding: 0.4rem">
            <p class="field_row_key"
               style='font-size: 0.3rem'>
                交易密码
            </p>
            <div class="field_row_value"
                 style="border: 1px solid #aeaeae;height: .8rem">
                <div id="payPass"
                     modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                     maxlength="20" name="Password">
                    请输入密码
                </div>
            </div>
            <p class="info">密码由数字组成，必须为6位</p>
            <mt-button @click="doPay">确认支付</mt-button>
        </div>
    </div>
</template>
<script>
    import {API} from "../../request/api";

    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    import {DeviceId} from "../../Constant";

    export default {
        data() {
            return {
                show:false,
                money: null,
                datas: {},
                deviceId: DeviceId,
                toUrl: ''
            }
        },
        created() {
            this.datas = this.$route.query
        },
        mounted() {
            this.toUrl = base_url + '?orgId=' + 70 + "&isPasswd=" + true + "&deviceId=" + this.deviceId + "&width="
        },
        methods: {
            buyHandle() {
                this.show = true
                $('#payPass').attr('v-password-widget', this.toUrl)
                $('#payPass').PasswordWidget()
            },
            doPay(){
                let pass = $('#payPass').$getCiphertext()

                let data = {
                    PRD_ID: this.datas.id + '',
                    APPLY_AMOUNT: this.datas.money + '',
                    BANK_PAY_PW: pass
                }
                console.log(data)
                API.buy.apiBuy(data, (res) => {
                    console.log(res);
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
</style>
