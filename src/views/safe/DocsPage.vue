<template>
    <div class="page">
        <div v-html="docs" class="docs"></div>
        <div class="btn">
            <mt-button type="primary" @click="getCode">确认</mt-button>
        </div>
    </div>
</template>
<script>
    import API from "../../service";

    export default {
        name: "DocsPage",
        data(){
            return{
                type:'',
                docs:'',
                id:''
            }
        },
        created(){
            this.type = this.$route.query.type
            this.id = this.$route.query.id
            this.getAgreement(this.id,this.type)
            console.log(this.type,this.id);

        },
        methods:{
            getAgreement(id,type) {
                console.log(1);
                let data = {
                    PRD_ID:id + '',
                    PROTO_TYPE: type, // B S
                }
                API.safe.apiAgreement(data, res => {
                    this.docs = res.AGREEMENT_HTML
                })
            },
            cancel(){
                this.$router.go(-1)
            },

            getCode(){
                this.$router.go(-1)
            },

        }
    }
</script>

<style lang="scss" scoped>
    .page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 100;
        padding-top: .7rem;
        box-sizing: border-box;
        .docs {
            border: none;
            max-height: 90%;
            padding: 0 .5rem;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;

        }
        .btn {
            padding-top:.2rem ;
            text-align: center;
            button {
                width: 3.5rem;
                margin-right: .4rem;
            }
        }
    }
</style>