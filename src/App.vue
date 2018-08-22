<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
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


    export default {
        data() {
            return {
                msg: '',
                showToast: false
            }
        },
        destroyed(){
            Bus.$off(BusName.showToast)
            Bus.$off(BusName.Indicator);
        },
        created() {
            Bus.$on(BusName.showToast, (val) => {
                this.showToast = true
                this.msg = val
                setTimeout(() => {
                    this.showToast = false
                }, 1000)
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
        z-index: 100;
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
