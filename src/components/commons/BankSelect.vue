<template>
    <div>
        <span @click="showBankList" :class="{'infoText':true,'activeTitle':titleSelect}">{{text}}</span>
        <div class="jsSelect" v-show="show">
            <section class="select-box">
                <i class="close" @click="show=false">X</i>
                <p class="title">{{title}}</p>
               <section class="scroll-view">
                   <section :id="key" class="bank-class" v-for="bankIndex,key,index in IndexObj" :key="index">
                       <p class="bank-index">{{key}}</p>
                       <ul class="select">
                           <li
                                   @click="select(item.name,item)"
                                   :class="{'option':true,'active':item.name==selectValue}"
                                   v-for="item,index in bankIndex"
                                   :key="index">
                               <img :src="item.src" alt="" class="banklogo">
                               <span class="text">{{item.name}}</span>
                           </li>
                       </ul>
                   </section>
               </section>
                <section class="right-index">
                    <span class="letter" @click="toBank(item)" v-for="item,index in indexArr" :key="index"> {{item}}</span>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
    // const Letter = [A B C D E F G H I J K L M N O P Q R S T U V W X Y Z]
    import {BusName} from "../../Constant";
    import Bus from '../../common/js/bus'
    const Letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
        'O','P','Q','R','S','T','U','S','T','U','V','W','X','Y','Z']
    export default {
        name: "BankSelect",
        props: {
            options: {
                type: Array,
                default: [{name: '请选择', value: '-1', src: ''}]
            },
            value: null,
            text: {
                type: null,
                default: '请选择'
            },
            title: null
        },
        watch: {
            // options(n,o){
            //     console.log('n');
            //     console.log(n);
            //     this.IndexObj = this.filterOptions(this.options)
            // }
            text(n,o){
                this.titleSelect = true
                this.selectValue = n
            }
        },
        computed: {
        },
        activated(){
            // this.IndexObj = this.filterOptions(this.options)

        },
        data() {
            return {
                titleSelect: false,
                show: false,
                selectValue: 1,
                IndexObj: {},
                indexArr:Letter
            }
        },

        methods: {
            showBankList(){
                if(JSON.stringify(this.IndexObj) == '{}') {
                    this.Londing.open()
                    setTimeout(()=>{
                        this.Londing.close()
                        this.show =true
                        console.log(this.IndexObj);
                        this.IndexObj = this.filterOptions(this.options)
                    },400)
                }else {
                    this.show =true
                }

            },
            filterOptions(arr) {
                let obj = {}
                arr.forEach(bank => {
                    if (!obj[bank.Index]) {
                        obj[bank.Index] = [bank]
                    } else {
                        obj[bank.Index].push(bank)
                    }
                })
                console.log(obj);
                return obj
            },
            select(index, name) {
                this.titleSelect = true
                this.show = false
                this.$emit('getValue', name)
                this.selectValue = index
            },
            toBank(val){
                console.log(val);
                if(document.getElementById(val)){
                    document.getElementById(val).scrollIntoView()

                }else {
                    Bus.$emit(BusName.showToast,`没有${val}开头的银行`)
                }
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
        z-index: 3;
        color: #333
    }

    .infoText {
        color: #dedede;
        font-size: .4rem;
    }

    .activeTitle {
        color: #333;
    }

    .bank-class {
        padding: 0 .5rem;
        .bank-index {
            font-size: .4rem;
        }
    }

    .select-box {
        position: relative;
        border-radius: 10px;
        background: #fff;
        height: 90%;
        padding: .3rem 0 .6rem;
        .right-index{
            position: absolute;
            overflow:scroll;
            -webkit-overflow-scrolling: touch;
            max-height:80%;
            width: 1rem;
            right: .4rem;
            top: 2rem;
            text-align: center;
            .letter{
                color: #89afe6;
                display: block;
                font-size: .5rem;
            }
        }
        .title {
            text-align: center;
            font-size: .5rem;
        }
        .scroll-view{
            max-height: 90%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }
        .option {
            border-bottom: 1px solid #dedede;
            font-size: 0;
            .text {
                font-size: .4rem;
                vertical-align: middle;
                margin-left: .2rem;
            }
            .banklogo {
                width: .6rem;
                vertical-align: middle;
            }
        }
        .active {
            color: #11cdcd;
        }
        .close {
            font-style: normal;
            position: absolute;
            top: -0.1rem;
            right: .3rem;
            font-weight: bold;
            color: #ccc;
            font-size: .6rem;

        }

    }


</style>