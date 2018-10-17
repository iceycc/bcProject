<template>
    <section :class="{'input-box':true, 'active-input':ifActive}">
        <transition name="fade">
            <p class="label" v-show="valueShow">{{defaultPlaceholderText}}</p>
        </transition>
        <section>
            <input class="input" :type="type"
                   name="text1" :placeholder="placeholderText"
                   :value="currentValue"
                   @input="handleInput($event.target.value)"
                   @change="handleChange($event.target.value)"
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
            value: null,
            type: {
                type: null,
                default: 'text'
            },
            max: {
                type: null,
                default: Infinity,
            },
        },
        data() {
            var currentValue = '0'
            this.val = this.val + ''
            if (this.val.length > this.max) {
                currentValue = this.val.toString().substr(0,this.max)
            }else {
                currentValue = this.value
            }
            return {
                valueShow: false,
                placeholderText: '',
                defaultPlaceholderText: '',
                ifActive: true,
                currentValue: currentValue
            }
        },
        created() {
            this.defaultPlaceholderText = this.valuePlaceholder// const
            this.placeholderText = this.valuePlaceholder

        },
        methods: {
            handleChange(val) {
                // this.$emit('changeHandle',val)
            },
            isValueNumber(value){
                return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value);
            },
            handleInput(val) {
                var val = event.target.value.trim() ;
                if(this.isValueNumber(val)){
                    var max = this.max ;
                    val = val + '';
                    this.currentValue = val ;
                    if(val.length>max) {
                        this.currentValue = val.toString().substr(0,max)
                    } ;
                }else{
                    // 如果输入的非数字，则保留之前的数据
                    if(val == '') {
                        return
                    }
                    event.target.value = this.currentValue ;
                }
                // this.$emit('input',val)
            }
        },
        computed: {},
        watch: {
            currentValue(val) {
                this.$emit('input', val);
                this.$emit('on-change', val);
            },
            value(n, o) {
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

    .slot {
        position: absolute;
        z-index: 3;
        right: 0;
    }

    .active-input {
        height: px2rem(42);
        .input {
            font-size: px2rem(14);
        }
    }
</style>