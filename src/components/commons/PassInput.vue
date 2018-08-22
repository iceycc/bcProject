<template>
    <div>
        <div id="loginPass"
             style="height: 2rem;line-height: 2rem;color: #ccc"
             modulus-hex="9c4ebeacd2f30283df44853e59b1c825f1a95760c44f48db786560806431faccc8b54e19bc5f37ba54ffc2b138ba336b545e51a51e1b5b297e84e4149e4440f845f6d2ac44829aa301b742a30e28efa619bcd7d148a5ec819808ae3974b5fd7672a2df0fce835031f45b897cb82887de57a5247f1989d24ac79cbb1df678918b"
             maxlength="20" name="Password"
             @click="getPass">
            请输入密码
        </div>
    </div>
</template>

<script>
    let base_url = 'http://47.94.4.11:8090/finsuit/openapi/jsBankPsw/getJpPsw'
    export default {
        name: "PassInput",
        data(){
            toUrl:""
        }
    }
</script>

<style scoped>

</style>