<template>
    <div class="app">
        <app-bar title="充值"></app-bar>
        <div class="rechargetitle">充值到民生直销银行</div>
        <div class="minshengbank">
            <span class="minshengbankLogo"><img src="../../images/img/Payingbankicon@2x.png" style="width:75%"
                                                alt=""></span>
            民生直销银行
        </div>
        <div class="rechargetitle">银行卡</div>
        <div class="minshengbank" style="border-bottom:1px solid #EEEEF0">
            <span class="minshengbankLogo" style=" padding-top: 10px;"><img src="../../images/img/beijingbank@2x.png"
                                                                            style="width:75%" alt=""></span>
            北京银行
        </div>
        <div class=" money">
            <p>每笔限额：10000.00元</p>
            <p>每日限额：200000.00元</p>
        </div>
        <div class="inputAmount"><span class="Amount">金额</span> <input type="text" placeholder="请输入金额"></div>
        <button class="tijiao">确认充值</button>
        <p class="bang">我已阅读并同意注册<span style=" color:#0096FE;">《充值协议》</span></p>
    </div>
</template>
<script>
    import AppBar from '../../components/header/AppBar'
    export default {
        components:{
            AppBar
        },

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
</style>
