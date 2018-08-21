<template>
    <div>
        <div class="field_row_wrap">
            <!--<div class="field_row_key">-->
                <!--登陆密码-->
            <!--</div>-->
            <div class="field_row_value">
                <div id="loginPass"
                     modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                     maxlength="20" name="Password">
                    请输入密码
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    import {API} from '../../request/api'
    import Bus from '../../common/js/bus'
    export default {
        name: "PassWord",
        data() {
            return {
                toUrl1: '',
                toUrl2: '',
                toUrl: '',
                orgId: 70,
                deviceId: '123456789',
                loginpass: '',
                paypass: ''
            }
        },
        props: ['REQ_SERIAL'],
        created() {
            Bus.$on('setPass',()=>{

            })
        },
        mounted() {
            this.toUrl = base_url + '?orgId=' + 70 + "&isPasswd=" + true + "&deviceId=" + this.deviceId + "&width=414"
            this.getKey('loginPass')
        },
        methods: {
            getKey(id) {
                $(`#${id}`).attr('v-password-widget', this.toUrl)
                $(`#${id}`).PasswordWidget()
            },

        }
    }
</script>

<style scoped>

</style>