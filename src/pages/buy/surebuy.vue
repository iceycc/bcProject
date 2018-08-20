<template>
    <div class="app">
        <header class="header">
            <a class="return" href=""></a>
            <p>购买</p>
        </header>
        <div class="buytitle" style="padding:0 0.4rem">
            <div>
                <div class="buytitleleftimg">
                    <img src="../../images/img/licaiicon@2x.png" style="width:100%" alt="">
                </div>
                <div class="buytitleleftcontent">
                    <p>民生xxx产品</p>
                    <p style="color:#666">理财产品</p>
                </div>

            </div>
        </div>
        <div class="buytitlemoney">
            <p class="buytitlemoneyjine">购买金额</p>
            <p class="buytitlemoneyshu"> ￥ 1,000.00</p>
        </div>
        <div class="jiaoyibank">
            <div class="jiaoyibankname">交易银行</div>
            <div class="jiaoyibankzhixiaoname">民生直销银行</div>
        </div>
        <button class="tijiao">确认购买</button>
        <p class="bang">我已阅读并同意注册<strong style=" color:#0096FE;">《用户授权服务协议》《晋商银行直销银行电子账户服务协议》</strong></p>
    </div>
</template>
<script>
    export default {}
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
