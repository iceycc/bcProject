<template>
    <div>
        <span @click="show =true" :class="{'infoText':true,'activeTitle':titleSelect}">{{text}}</span>
        <div class="jsSelect" v-if="show">
            <section class="select-box">
                <i class="close" @click="show=false"><img :src="closeImg" alt=""></i>
                <p class="title">{{title}}</p>
                <ul class="select">
                    <li
                            @click="select(index,item)"
                            :class="{'option':true,'active':index==selectValue}"
                            v-for="item,index in options"
                            :key="index">
                        <!--<img :src="item.src" alt="" class="banklogo">-->
                        <span class="text">{{item.name}}</span>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "JsSelect",
        props: {
            options: {
                type: Array,
                default: [{name: '请选择', value: '-1',src:''}]
            },
            value: null,
            text:{
                type:null,
                default:'请选择'
            },
            title:{
                type:null,
                default:'请选择'
            }
        },
        watch: {
            show(newVal,oldVal){
                if(newVal){
                    this.ModalHelper('open').afterOpen()
                }else {
                    this.ModalHelper('open').beforeClose()
                }
            }
        },
        computed: {},

        data() {
            return {
                closeImg:require('@/assets/images/icon_ask_close.svg'),
                titleSelect:false,
                show:false,
                selectValue: -1,
            }
        },
        methods:{
            select(index,name){
                this.titleSelect = true
                this.show = false
                this.$emit('getValue', name)
                this.selectValue = index
            },
            ModalHelper(bodyCls) {
                var scrollTop;
                return {
                    afterOpen: function () {
                        scrollTop = document.scrollingElement.scrollTop;
                        document.body.classList.add(bodyCls);
                        document.body.style.top = -scrollTop + 'px';
                    },
                    beforeClose: function () {
                        document.body.classList.remove(bodyCls);
                        // scrollTop lost after set position:fixed, restore it back.
                        document.scrollingElement.scrollTop = scrollTop;
                        document.body.style.top = 0;
                    }
                };
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/px2rem';
    .jsSelect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(1, 1, 1, 0.3);
        padding: 1rem 0.6rem;
        box-sizing: border-box;
        z-index: 999;
        color:#333
    }
    .infoText{
        width: 100%;
        color:#dedede;
        position: relative;
        &:after{
            position:absolute;
            display: inline-block;
            content: '';
            background: url('~@/assets/images/GroupCopy14@2x.png') no-repeat center;
            background-size: contain;
            width: .4rem;
            height: .4rem;
            top: 50%;
            right: 10px;
            transform:translateY(-50%);
        }
    }
    .activeTitle{
        color: #333;
    }
    .select-box {
        position:relative;
        border-radius: 10px;
        background: #fff;
        height: px2rem(548);

        padding:.3rem 0 .6rem;
        .title {
            text-align: center;
            font-size: .5rem;
        }
        .select {
            max-height: 90%;
            padding: 0 .5rem;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }
        .option {
            border-bottom: 1px solid #dedede;
            font-size: 0;
            .text{
                font-size: .4rem;
                vertical-align: middle;
                margin-left: .2rem;
            }
            .banklogo{
                width: .6rem;
                vertical-align: middle;
            }
        }
        .active {
            background:#5db0f9;
            color: #fff;
        }

        .close{
            position: absolute;
            top: px2rem(-1);
            right: .3rem;
            width: px2rem(20);
            height: px2rem(20);
            img{
                width: 100%;
                height: 100%;
            }

        }

    }


</style>