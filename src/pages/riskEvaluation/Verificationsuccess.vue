<template>
    <div id="app" class="app">
        <header class="header">
            <a class="return" href=""></a>
            <p>风险测评</p>
        </header>
        <div class="chattuimg">
            <img src="../../images/img/illustration@2x.png" style="width:70%" alt="">
        </div>
        <div class="fenxiangcontent">
            为了使您更好的了解自己的风险承受能力，理性地参与金融产品的投资，并诺”本人基于自己的真实情况完成一下问卷，选项与自身真实情况相符“，请选择相应的选项，感谢您的合作
        </div>
        <mt-button class="begain" @click="goNext">开始答题</mt-button>
    </div>
</template>
<script>
    import {PageName} from "../../Constant";

    export default {
        created(){

        },
        methods: {
            goNext() {
                this.$router.push({
                    name: PageName.Riskproblom
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .app {
        width: 100%;
        margin: 0 auto;
    }

    .chattuimg {
        margin-top: 2rem;
        text-align: center;
    }

    .fenxiangcontent {
        text-align: center;
        padding: 0 .4rem;
        font-size: 0.4rem;
        color: #333;
        margin-top: 1rem;
    }

    .begain {
        font-size: 0.4rem;
        color: #fff;
        background-color: #0096FE;
        border-radius: 0.3rem;
        line-height: 1rem;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        margin-top: 1rem;
        border: 0px;
        outline: none;
        display: block;
    }

    .header {
        background-color: #fff;
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.4rem;
        /* border-bottom: 1px solid #e6e6e6; */
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
</style>
