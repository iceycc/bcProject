<template>
    <section :class="{'input-box':true, 'active-input':ifActive}">
        <transition name="fade">
            <p class="label" v-show="valueShow">{{defaultPlaceholderText}}</p>
        </transition>
        <section>
            <input class="input" type="number"
                   name="text1" :placeholder="placeholderText"
                   :value="value"
                   @input="$emit('input', $event.target.value)"
                   @change="changeFn($event.target.value)"
            >
            <slot name="btn" class="slot">
            </slot>
        </section>
    </section>
</template>

<script>
    export default {
        name: "ActiveInput",
        props: {
            valuePlaceholder: {
                type: null,
                default: '请填写'
            },
            value:null
        },
        data() {
            return {
                valueShow: false,
                placeholderText: '',
                defaultPlaceholderText: '',
                ifActive:true
            }
        },
        created() {
            this.defaultPlaceholderText = this.valuePlaceholder// const
            this.placeholderText = this.valuePlaceholder

        },
        methods:{
            changeFn(val){
                this.$emit('changeHandle',val)
            }
        },
        watch: {
            value(n, o) {
                // if (n.length > 1) { // >1时不必校验
                //     return
                // }
                if (!n) { // 删除到 '' 是触发
                    this.ifActive = true
                    this.valueShow = false
                    this.placeholderText = this.defaultPlaceholderText
                } else {
                    this.ifActive = false
                    this.placeholderText = ''
                    this.valueShow = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .input-box {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: px2rem(70);
        background-size: 0.7rem 0.7rem;
        border-bottom: 1px #E5E5E5 solid;
        padding-top: px2rem(15);
    }

    .label {
        padding: 0;
        font-size: px2rem(14);
        color: #444;
    }

    .input {
        position: absolute;
        left: 0;
        bottom: 0;
        @include placeholder(#444);
        height: px2rem(24);
        margin: px2rem(10) 0;
        width: 80%;
        border: none;
        box-sizing: border-box;
        font-size: px2rem(20);
        color: #333;
        /* line-height: 40px; */
        outline: none;
    }
    .slot{
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
    }

    .active-input{
        height: px2rem(42);
        .input{
            font-size: px2rem(14);
        }
    }
</style>