<template>
            <div :id="inputID"
                 style="color: #ccc"
                 modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                 maxlength="20" name="Password">
                请输入密码
            </div>
</template>
<script>
    import Bus from '../../common/js/bus'
    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    import {DeviceId} from "../../Constant";

    export default {
        name: "PassInput",
        props:['inputID','doGetData','pass'],
        data(){
            return {
                toUrl:"",
                passValue:''
            }
        },
        created(){
            console.log(this.inputID + '>> 创建了')
        },
        watch:{
            doGetData(newVal,oldVal){
                if(newVal != oldVal){
                    this.postPass()
                }
            }
        },
        mounted() {
            this.toUrl = base_url + '?orgId=' + 70 + "&isPasswd=" + true + "&deviceId=" + DeviceId + "&width="
            this.getPass()
        },
        methods:{
            getKey(id) {
                $(`#${id}`).attr('v-password-widget', this.toUrl)
                $(`#${id}`).PasswordWidget()
            },
            getPass(){
                this.getKey(this.inputID)
            },
            postPass(){
                let pass = $(`#${this.inputID}`).$getCiphertext() || ''
                let len  = $(`#${this.inputID}`).$getPasswordLength() || 0

                let data = {
                    pass,len
                }
                Bus.$emit(this.inputID,data)
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>