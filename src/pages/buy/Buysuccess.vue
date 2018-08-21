<template>
    <div id="app" class="app">
        <app-bar title="购买"></app-bar>
        <div class="buysuccessimg">
            <img src="images/img/Verificationsuccess@2x.png" alt="">
            <p>购买成功</p>
        </div>
        <div class="buysuccessdetail">
            <div class="buysuccessdetails">
                <div class="buysuccessdetailleft">理财产品名称</div>
                <div class="buysuccessdetailright">{{datas.PRD_NAME}}</div>
            </div>
            <div class="buysuccessdetails">
                <div class="buysuccessdetailleft">交易银行</div>
                <div class="buysuccessdetailright">{{datas.ORG_NAME}}</div>
            </div>
            <div class="buysuccessdetails">
                <div class="buysuccessdetailleft">购买金额</div>
                <div class="buysuccessdetailright">{{datas.money}}元</div>
            </div>
            <div class="buysuccessdetails">
                <div class="buysuccessdetailleft">购买日期</div>
                <div class="buysuccessdetailright">{{datas.OPERA_DATE}}</div>
            </div>
            <div class="buysuccessdetails">
                <div class="buysuccessdetailleft">交易流水号</div>
                <div class="buysuccessdetailright">{{datas.BESHARP_BUY_SEQ}}</div>
            </div>

        </div>
        <div class="xiazai">下载比财app查看资产</div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
               datas:[]
            }
        },
        created(){
            this.datas = this.$route.query
        }
    }
</script>

<style lang="scss" scoped>
    .buytitle {
        width: 92%;
        height: 1.7rem;
        border-top: 10px solid #F6F6F9;
        border-bottom: 0.5rem solid #F6F6F9;
    }

    .buytitleleft {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-attachment: #fff;
    }

    .buytitleright {
        float: right;
        width: 50%;
        height: 100%;
        background-attachment: #fff;
    }

    .header {

        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.4rem;
    }

    .header p {
        text-align: center;
        font-size: 0.5rem;
    }

    .return {
        display: block;
        position: absolute;
        left: 0.4rem;
        top: 0.2rem;
        background-image: url(../../images/img/back@2x.png);
        background-size: cover;
        width: 0.3rem;
        height: 0.9rem;
    }

    .buysuccessimg {
        text-align: center;
        margin-top: 1rem;
    }

    .buysuccessimg p {
        margin: 0.5rem 0;
        padding-bottom: 0.5rem;
        font-size: 0.5rem;
        color: #2B74FE;
        border-bottom: 1px solid #EEEEF0;
    }

    .buysuccessdetail {
        margin-top: -0.5rem;
        padding: 0 0.3rem;
    }

    .buysuccessdetails {
        line-height: 1.5rem;
        height: 1.5rem;
        font-size: 0.4rem;
        border-bottom: 1px solid #EEEEF0;
    }

    .buysuccessdetailleft {
        float: left;
        color: #9199A1
    }

    .buysuccessdetailright {
        float: right;
    }

    .xiazai {
        font-size: 0.4rem;
        color: #fff;
        background-color: #518BEE;
        border-radius: 0.2rem;
        line-height: 1.2rem;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        margin-top: 1rem;
        border: 0px;
        outline: none;
    }
</style>
