<template>
    <div>
        <app-bar title="提现"></app-bar>
        等2小时
        <button class="begain" @click="goNext">确定</button>

    </div>
</template>

<script>
    export default {
        name: "WaitForWithdraw",
        methods:{
            goNext(){

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .begain {
        display: block;
        font-size: px2rem(16);
        background: #518BEE;
        border-radius: px2rem(6);
        width: px2rem(255);
        height: px2rem(44);
        color: #fff;
        text-align: center;
        margin: px2rem(30) auto;
    }
</style>