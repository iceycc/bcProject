<template>
    <div class="header">
            <a class="return" href="javascript:;" @click="goBack"></a>
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