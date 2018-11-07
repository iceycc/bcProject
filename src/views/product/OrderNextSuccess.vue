<template>
    <div class="app">
        <app-bar title="预约成功"></app-bar>
        <div class="chattuimg">
            <img src="@/assets/images/Verificationsuccess@2x.png" style="width:25%" alt="">
        </div>
        <div class="fenxiangcontent">
            <h2>预约成功</h2>
            <p style="margin-top:0.6rem; color:#F22C17;">成功预约{{PRD_NAME}}，请下载比财APP关注下期</p>
        </div>
        <span @click="goApp" class="begain">下载比财APP</span>
    </div>
</template>
<script>
    import util from 'libs/util'
    import API from "@/service"
    import Bus from '@/plugin/bus'
    import {BusName} from "@/Constant";

    export default {
        data(){
            return{
                PRD_NAME:'比财'
            }
        },
        created(){
            this.PRD_NAME = this.$route.query.PRD_NAME
        },
        methods:{
            goApp(){
                API.watchApi({
                    FUNCTION_ID: 'ptb0A009', // 点位
                    REMARK_DATA: '异异业合作-预约成功-下载比财', // 中文备注
                })
                util.downLoad(()=>{
                    Bus.$emit(BusName,'请在浏览器中下载')
                })
            }
        }
    }
</script>

<style  lang="scss" scoped>
    .app{
        width:100%;
        margin: 0 auto;
    }
    .chattuimg{
        margin-top: 2rem;
        text-align: center;
    }
    .fenxiangcontent{
        text-align: center;
        padding:0 .4rem;
        font-size: 0.4rem;
        color: #333;
        margin-top: 1rem;
        h2{
            font-size: 0.5rem;
        }
    }

    .begain{
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
</style>
