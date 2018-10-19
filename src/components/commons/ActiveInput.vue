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
    import {util} from '../../common/utils/util'

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
                default: 'tel'
            },
            max: {
                type: null,
                default: Infinity,
            },
        },
        data() {
            var currentValue = ''
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
        mounted() {
            if (this.currentValue) {
                this.ifActive = false
                this.placeholderText = ''
                this.valueShow = true
            }
        },

        methods: {
            handleChange(val) {
            },
            isValueNumber(value) {
                return {
                    isValueNumOrX: (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9,x,X]*$)|(^-?0{1}$)/).test(value),
                    isOne: (/[0-9,X,x]/).test(value)
                }
            },
            throttle(cb, ms = 300, val) {
                console.log(val);
                let timer = true
                return () => {
                    console.log('timer', timer);
                    if (!timer) {
                        return
                    }
                    timer = false
                    setTimeout(() => {
                        cb(val)
                        timer = true
                    }, ms)
                }
            },
            doInputThrottle(val) {
                this.throttle(this.handleInput, 1000, val)
            },
            handleInput(val) {
                this.controlInputStyle(val)
                this.controlInputValue(val)
                // this.controlInputValue(val)
            },
            controlInputStyle(val) {
                if (!val) { // 删除到 '' 是触发
                    this.ifActive = true
                    this.valueShow = false
                    this.placeholderText = this.defaultPlaceholderText
                } else {
                    this.ifActive = false
                    this.placeholderText = ''
                    this.valueShow = true
                }
            },
            controlInputValue(val) {
                val = val.toString().trim()
                this.currentValue = val
                if (val.length >this.max) {
                    this.currentValue = val.toString().substr(0, this.max)
                }
                // let lastT = val.substr(val.length - 1, 1)

                // if (this.isValueNumber(lastT).isOne) {
                //     var max = this.max;
                //     val = val + '';
                //     this.currentValue = val;
                //     if (val.length > max) {
                //         this.currentValue = val.toString().substr(0, max)
                //     }
                //     ;
                // } else {
                //     // 如果输入的非数字，则保留之前的数据
                //     if (val == '') {
                //         this.currentValue = '';
                //         event.target.value = ''
                //     } else {
                //         event.target.value = this.currentValue;
                //     }
                // }
                this.$emit('input', this.currentValue); // 给父组件  传值
            },

        },
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
        padding-top: px2rem(12);
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