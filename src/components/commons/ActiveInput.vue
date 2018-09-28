<template>
    <section class="input-box">
        <transition name="fade">
            <p class="label" v-show="telShow">开户手机号</p>
        </transition>
        <input class="input" type="number"
               name="text1" :placeholder="telPaceholder" v-model="tel">
    </section>
</template>

<script>
    export default {
        name: "ActiveInput",
        props:{

        },
        data(){
            return {
                telShow: false,
                telPaceholder: '开户手机号',
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";


</style>