<template>
    <div class="header" v-if="show">
            <a class="goBack" href="javascript:;" @click="goBack">
                <img src="../../assets/images/back@2x.png" alt="">
            </a>
            <p>{{title}}</p>
    </div>
</template>

<script>
    import {util} from "../../common/utils/util";
    export default {
        name: "AppBar",
        data(){
            return{
                show:true
            }
        },
        props:{
            'title':{
                type:null,
                default:''
            }
        },
        created(){
            let isE = util.isEquipment()
            if(isE.isApp || isE.isWeixin || isE.isQQ || isE.isWeibo || isE.isDingTalk){
                this.show = false
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }

        }
    }
</script>

<style lang="scss" scoped>
    .header {
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.4rem;
    }

    .header p {
        text-align: center;
        font-size: 0.5rem;
    }
    .goBack {
        display: block;
        position: absolute;
        left: 0.4rem;
        top: 0.2rem;
        width: 1rem;
        height: 0.9rem;
        z-index: 2;
        img{
            width: 0.3rem;
        }
    }
</style>