<template>
    <div id="app" class="app">
        <app-bar title="购买"></app-bar>
        <div class="buytitle">
            <div class="buytitleleft">
                <div class="buytitleleftimg">
                    <img src="../../images/img/licaiicon@2x.png" style="width:100%" alt="">
                </div>
                <div class="buytitleleftcontent">
                    <p>{{proDetail.PRD_NAME}}</p>
                    <p style="color:#666">理财产品</p>
                </div>
            </div>
            <div class="buytitleright">
                <p>{{proDetail.TXT_MIN_AMOUNT}}</p>
                <p>最小递增{{proDetail.INCRE_AMOUNT}}元</p>
            </div>
        </div>

        <div class="buysuccessdetails">
            <div class="buysuccessdetailleft">可用金额 <strong>{{payNum}}元</strong></div>
            <div class="buysuccessdetailright" @click="goReChang">充值</div>
        </div>
        <div class="buydetails">
            <p style="margin-top: 0.3rem">购买金额</p>
            <span class="buydetailsmoney">￥</span>
            <input type="text" placeholder="500元起购" v-model="moneyNum">
        </div>
        <p style="font-size:0.3rem;padding:  0.4rem;color:#666">可投金额 1,000,000.00元</p>
        <button class="tijiao" @click="goBuy">购买</button>
        <p class="bang">我已阅读并同意注册<strong style=" color:#0096FE;">《用户授权服务协议》《晋商银行直销银行电子账户服务协议》</strong></p>
    </div>
</template>
<script>
    import {PageName,BusName} from "../../Constant";
    import Bus from '../../common/js/bus'
    import {API} from "../../request/api";

    export default {
        data(){
            return {
                proDetail:{},
                moneyNum:null,
                payNum:null,

            }
        },
        created(){
            this.getInfo()
            this.proDetail = this.$route.query // 数据
        },
        methods:{
            getInfo(){
                API.buy.apiQueryAccRest({},res=>{
                    this.payNum = res.TOTAL_ASSET
                })
            },
            goReChang(){
                this.$router.push(PageName.Recharge)
            },
            goBuy(){
                console.log(this.moneyNum);
                if(!this.moneyNum){
                    Bus.$emit(BusName.showToast,'请填写购买金额')
                    return
                }
                if(typeof (this.moneyNum - 0) != 'number' || isNaN(this.moneyNum - 0)){
                    Bus.$emit(BusName.showToast,'请填写正确的金额')
                    return
                }
                this.Londing.open({
                    spinnerType: 'triple-bounce'
                })
                setTimeout(()=>{
                    this.Londing.close()
                },500)
                this.$router.push({
                    name:PageName.surebuy,
                    query:{
                        money:this.moneyNum,
                        PRD_NAME:this.proDetail.PRD_NAME,
                        id:this.proDetail.id,
                        ORG_NAME:this.proDetail.ORG_NAME
                    }
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
    body {
        margin: 0;
        padding: 0;
    }

    .buytitle {
        width: 92%;
        padding: 0.4rem 0.4rem;
        border-top: 10px solid #F6F6F9;
        border-bottom: 0.5rem solid #F6F6F9;
    }

    .buytitleleft {
        display: inline-block;
        width: 50%;
        background-attachment: #fff;
    }

    .buytitleleftimg {
        padding-top: 0.3rem;
        width: 1rem;
        display: inline-block;
    }

    .buytitleleftcontent {
        padding-top: -0.5rem;
        display: inline-block;
        padding-left: 0.4rem;
        font-size: 0.35rem;
        vertical-align: middle;
    }



    .buytitleright {
        float: right;
        width: 50%;
        text-align: right;
        font-size: 0.35rem;
        color: #666;
    }

    .buysuccessdetails {
        padding: 0 0.4rem;
        line-height: 1.5rem;
        height: 1.5rem;
        font-size: 0.4rem;
        border-bottom: 1px solid #EEEEF0;
    }

    .buydetails {
        padding: 0 0.4rem;
        height: 2.2rem;
        font-size: 0.4rem;
        border-bottom: 1px solid #EEEEF0;
    }

    .buydetailsmoney {
        width: 1rem;
        margin-top: 0.5rem;
        font-size: 0.6rem;
    }

    .buysuccessdetailleft {
        float: left;
    }

    .buysuccessdetailright {
        color: #468EE5;
        float: right;
    }

    input {
        width: 50%;
        border: none;
        box-sizing: border-box;
        font-size: 14px; /*px*/
        color: #333;
        line-height: 40px;
        outline: none;
    }

    ::-webkit-input-placeholder {
        font-size: 0.6rem
    }

    /* 使用webkit内核的浏览器 */
    :-moz-placeholder {
        font-size: 0.6rem
    }

    /* Firefox版本4-18 */
    ::-moz-placeholder {
        font-size: 0.6rem
    }

    /* Firefox版本19+ */
    :-ms-input-placeholder {
        font-size: 0.6rem
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
