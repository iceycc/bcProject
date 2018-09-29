<template>
    <div>
        <pass-input
                text="password"
                class="input"
                inputID="login_loginPass"
        ></pass-input>
        <mt-button @click="handel">点击</mt-button>

        <input type="text" v-model="pass">



        <!--<button id="shareBtn"></button>-->

    </div>
</template>

<script>
    import PassInput from '../components/commons/PassInput'
    // import soshm from 'soshm'
    export default {
        name: "testLogin",
        components:{
            PassInput
        },
        data(){
            return {
                pass:''
            }
        },
        methods:{
            handel(){
                this.pass = $('#login_loginPass').$getCiphertext()
                console.log(this.pass);
            }
        }
    }
</script>

<style scoped>

</style>