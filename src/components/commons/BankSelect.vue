<template>
    <div class="jsSelect">
        <section class="select-box">
            <p class="title">银行列表</p>
            <ul class="select">
                <li
                        @click="selectBank(index,item.name)"
                        :class="{'option':true,'active':index==selectValue}"
                        v-for="item,index in options"
                        :key="index">
                    <img :src="item.src" alt="" class="banklogo">
                    <span class="text">{{item.name}}</span>
                </li>
            </ul>
        </section>
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
            value: null

        },
        watch: {},
        computed: {},

        data() {
            return {
                selectValue: 1

            }
        },
       methods:{
           selectBank(index,name){
               this.$emit('getValue', name)
               this.selectValue = index
           }
       }
    }
</script>

<style lang="scss" scoped>
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
    }

    .select-box {
        border-radius: 10px;
        background: #fff;
        overflow-y: scroll;
        height: 90%;
        .title {
            text-align: center;
            font-size: .5rem;
        }
        .select {
            padding: 0 1rem;

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
            color: #11cdcd;
        }

    }


</style>