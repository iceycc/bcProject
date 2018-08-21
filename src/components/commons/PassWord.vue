<template>
    <div>
        <div class="field_row_wrap">
            <div class="field_row_key">
                登陆密码
            </div>
            <div class="field_row_value">
                <div id="loginPass"
                     modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                     maxlength="20" name="Password">
                    请输入密码
                </div>
            </div>
        </div>
        <div class="field_row_wrap">
            <div class="field_row_key">
                交易密码
            </div>
            <div class="field_row_value">
                <div id="payPass"
                     @click="getKey('payPass')"
                     modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
                     maxlength="20" name="Password">
                    请输入密码
                </div>
            </div>
        </div>
        <button @click="subumit"
                style="display: inline-block;width: 100px;height: 30px;background: #0072ff;color: #fff">提交
        </button>
    </div>
</template>

<script>
    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    import {API} from '../../request/api'

    export default {
        name: "PassWord",
        data() {
            return {
                toUrl: '',
                orgId: 70,
                deviceId: '123456789',
                loginpass: '',
                paypass: ''
            }
        },
        props: ['REQ_SERIAL'],
        created() {

            // this.getIMEI()
            // '/openapi/jsBankPsw/getJpPsw
            // ?orgId='data.orgId + "&isPasswd=" + true + "&deviceId=" + data.deviceId + "&width="
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
            setURL() {
            },
            subumit() {
                this.loginpass = $('#loginPass').$getCiphertext()
                this.paypass = $('#payPass').$getCiphertext()
                let data = {
                    REQ_SERIAL: this.REQ_SERIAL,
                    BANK_LOGIN_PW: this.loginpass,
                    BANK_PAY_PW: this.paypass
                }
                console.log(data);
                API.open.setPassWord(data, (res) => {
                    console.log(res);
                })
            }

        }
    }
</script>

<style scoped>

</style>