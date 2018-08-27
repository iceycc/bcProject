<template>
    <div id="app" style="height: 100%">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
        <!--自己的提示-->
        <transition name="fade">
            <div class="toast" v-if="showToast">
                <p>{{msg}}</p>
            </div>
        </transition>

    </div>
</template>

<script>
    import Bus from './common/js/bus'
    import {BusName} from './Constant'
    import {API} from "./request/api";


    export default {
        provide(){
            return {
                reload:this.reload
            }
        },
        data() {
            return {
                msg: '',
                showToast: false,
                isRouterAlive:true
            }
        },
        destroyed(){
            Bus.$off(BusName.showToast)
            Bus.$off(BusName.Indicator);
        },
        methods:{
            reload() {
                console.log('执行reload')
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            },
        },
        created() {
            API.watch.watchApi({
                REMARK_DATA:'异业合作-落地页',
                FUNCTION_ID:'ptp0A000'
            })
            Bus.$on(BusName.showToast, (val) => {
                this.showToast = true
                this.msg = val
                setTimeout(() => {
                    this.showToast = false
                }, 2000)
            })
            Bus.$on(BusName.Indicator, (val ='Loading...') => {
                this.Londing.open({
                    text: val ,
                    spinnerType: 'triple-bounce'
                });
                setTimeout(function () {
                    this.Londing.close()
                })
            })

        }
    }
</script>

<style lang="scss" scoped>
    .toast {

        color: #fff;
        bottom: 0;
        position: fixed;
        width: 100%;
        height: 1.3rem;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        text-align: center;
        font-size: 0.4rem;
        line-height: 1.3rem;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }



</style>
