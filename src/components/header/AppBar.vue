<template>
    <div class="header">
            <a class="goBack" href="javascript:;" @click="goBack">
                <img src="../../images/img/back@2x.png" alt="">
            </a>
            <p>{{title}}</p>
    </div>
</template>

<script>
    export default {
        name: "AppBar",
        props:{
            'title':{
                type:null,
                default:'比财'
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
        img{
            width: 0.3rem;
        }
    }
</style>