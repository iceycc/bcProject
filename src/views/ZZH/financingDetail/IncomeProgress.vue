<template>
    <div class="app">
        <app-bar title="货币基金"></app-bar>
        <div class="IncomeProgresstitle">
            <p>总资产（元）</p>
            <h4>6000.00</h4>
            <div class="Profitdetails">
                <div class="yestadaydetails">
                    <p>昨日收益</p>
                    <p>2.00</p>
                </div>
                <div class="Cumulativeincome">
                    <p>累计收益</p>
                    <p>2.00</p>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="contenttitle" style="border-bottom: 0.5rem solid #F6F6F6;">
                <div class="shouyi mingxi">
                    收益明细
                </div>
                <div class="jilu mingxi">
                    交易记录
                </div>
            </div>
            <div class="contenttitle" style="color:#666;border-bottom: 1px solid #DCDCDC;">
                <div class=" mingxi"> 持有中</div>
                <div class=" mingxi">已结束</div>
            </div>
            <div class="contentdetails">
                <p>农银日日鑫货币A</p>
                <ul>
                    <li style=" text-align:left;">
                        <p>金额</p>
                        <span>500.00</span>

                    </li>
                    <li>
                        <p>昨日收益</p>
                        <span>0.30</span>
                    </li>
                    <li style=" text-align:right;">
                        <p>累计收益</p>
                        <span>+100.1</span>
                    </li>
                </ul>
            </div>
            <div class="contenttitle">
                <div class="jilu mingxi">交易记录</div>
                <div class="shouyi mingxi">收益明细</div>
            </div>
        </div>

    </div>
</template>
<script>
    import AppBar from '@/components/header/AppBar'

    export default {
        components:{
            AppBar
        }
    }
</script>

<style lang="scss" scoped>
    .IncomeProgresstitle {
        padding-top: 60px;
        width: 100%;
        height: 165px;
        background: #508CEE;
    }

    .IncomeProgresstitle p {
        text-align: center;
        font-size: 14px;
        color: #fff;
    }

    .IncomeProgresstitle h4 {
        text-align: center;
        color: #fff;
        font-size: 44px;
    }

    .Profitdetails {
        margin-top: 0.5rem;
        width: 100%;
        height: 50px;
    }

    .Profitdetails .yestadaydetails {
        text-align: center;
        display: inline-block;
        width: 50%;
        height: 100%;
        color: #fff;
    }

    .Profitdetails .Cumulativeincome {
        float: right;
        width: 50%;
        height: 100%;
        color: #fff;
    }

    .header {
        background-color: #508CEE;
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.4rem;
        color: #fff;
    }




    .content {
        width: 100%;
        background: #DCDCDC;
    }

    .contenttitle {
        width: 100%;
        height: 1.5rem;
        background: #fff;
    }

    .contenttitle .mingxi {
        float: left;
        width: 49%;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.4rem;
        height: 1rem;
        font-size: 0.4rem;
        height: 100%;
    }

    .contenttitle .shouyi {
        background-image: url('~@/assets/images/icon_shouyi@2x.png');
        background-repeat: no-repeat;
        background-size: 0.6rem 0.6rem;
        background-position: 1rem 0.4rem;
    }

    .contenttitle .jilu {
        background-image: url('~@/assets/images/icon_jiaoyi@2x.png');
        background-repeat: no-repeat;
        background-size: 0.6rem 0.6rem;
        background-position: 1rem 0.4rem;
    }

    .contentdetails {
        padding: 0.4rem;
        background: white;
        font-size: 0.4rem;
    }

    .contentdetails ul {
        width: 100%;
        height: 1.8rem;
    }

    .contentdetails ul li {
        float: left;
        text-align: center;
        line-height: 1rem;
        width: 33%;
        height: 1rem;
    }

    .contentdetails ul li p {
        color: #666;
    }
</style>
