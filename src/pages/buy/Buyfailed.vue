<template>
    <div class="app">
        <app-bar title="购买"></app-bar>
        <div class="chattuimg">
            <img src="../../images/img/buyfail@2x.png" style="width:25%" alt="">
        </div>
        <div class="fenxiangcontent">
            <h2>很抱歉，购买失败!</h2>
            <p style="margin-top:0.6rem; color:#F22C17;">{{errMsg}}</p>
        </div>
        <span @click="goApp" class="begain">下载比财app查看资产</span>
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import Bus from '../../common/js/bus'
    import {BusName} from "../../Constant";
    import util from "../../common/utils/util";
    import {Mixin} from '../../common/utils/mixin'

    export default {
        created(){
            this.errMsg = this.$route.query.err || '系统繁忙，请稍后再试'
        },
        mixins: [Mixin],
        data(){
            return {
                errMsg:''
            }
        },
        methods:{
            goApp(){
                API.watch.watchApi({
                    FUNCTION_ID: 'ptb0A011', // 点位
                    REMARK_DATA: '异业合作-购买失败-下载比财', // 中文备注
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
