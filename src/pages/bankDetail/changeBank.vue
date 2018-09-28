<template>
    <div>
        <app-bar title="更换银行卡"></app-bar>
            <section class="bank">
                <span class="n-left">选择银行</span>
                <!--<input type="text" name="back" placeholder=" 请选择银行" v-model="data.ORG_ID">-->
                <!-- <span  class="limit">银行限额</span>  -->
                <Bank-select class="bank-box" :text="bankText" :options="bankList" @getValue="getBank"
                             title="银行列表"></Bank-select>

            </section>
    </div>
</template>

<script>
    import BankSelect from '../../components/commons/BankSelect'
    import {API} from "../../request/api";
    import {imgSrc} from "../../Constant";

    export default {
        name: "changeBank",
        components: {
            BankSelect
        },
        data() {
            return {
                bankText: '请选择银行',
                bankList: [],
                AllBankListObj:{}
            }
        },
        created() {
            this.getBankList()
        },
        methods: {
            getBank(val) {
                console.log(val);
                this.bankText = val.name
            },
            getBankList() {
                API.list.apiGetBankCardList({}, res => {
                    let obj = {}
                    res.BAND_CARD_LIST.forEach(item => {
                        obj[item.BANK_CARD_BIN] = item.BANK_NAME
                    })
                    // console.log('bankObj>>>',obj);
                    this.AllBankListObj = obj
                    this.bankList = res.SUPPORT_BANK_LIST.map((item) => {
                        return {
                            name: item.BANK_NAME,
                            value: 0,
                            src: imgSrc + item.BANK_LOGO_URL,
                            Index: item.INITIAL
                        }
                    })
                })
            },
        },

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .bank {
        display: flex;
        margin: 0 px2rem(20);
        box-sizing: border-box;
        line-height: 1.3rem;
        background-size: 0.7rem 0.7rem;
        border-bottom: 1px #E5E5E5 solid;
        .n-left{
            width: px2rem(60);
        }
        .bank-box {
            width: px2rem(150);
            box-sizing: border-box;
            vertical-align: middle;
        }
    }

</style>