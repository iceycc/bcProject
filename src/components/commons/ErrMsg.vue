<template>
    <div :class="['Tips',classStyle]" v-if="errMsg">
        <span>{{errMsg}}</span>
    </div>
</template>

<script>
    export default {
        name: "ErrMsg",
        props: {
            errMsg: {
                type: null,
                default: ''
            },
            classStyle:null
        },
        active() {
            setTimeout(() => {
                this.errMsg = ''
            }, 2000)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";

    .Tips {
        margin: px2rem(17) auto 0;
        text-align: center;
        font-size: px2rem(14);
        span {
            box-sizing: border-box;
            display: inline-block;
            background-color: #FF5B05;
            color: #fff;
            min-width: px2rem(200);
            height: px2rem(29);
            line-height: px2rem(29);
            padding: 0 px2rem(6);
            border-radius: px2rem(4);

        }
    }

</style>