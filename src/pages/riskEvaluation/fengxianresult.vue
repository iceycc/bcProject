<template>
          <div id="app" class="app">
                <header class="header">
                        <a class="return" href=""></a>
                        <p>风险评测</p>
                    </header>
            <div class="chattuimg">
                      <img src="../../images/img/Verificationsuccess@2x.png" style="width:30%" alt="">
                  </div>
                  <div class="fenxiancontent">
                      <div class="fenxiantitle">
                          <p>您的风险测评结果为</p>
                         <h1>{{RISK_TOLERANCE_SCORE}}分 {{RISK_TOLERANCE_DESC}} </h1>
                      </div>          
                      <p>{{RISK_LEV_EXPLAIN}}</p>
                    </div>
                    <div style="text-align:center">
                         <mt-button @click="reCheck" class="begain" style="display: inline-block;">重新测评</mt-button>
                         <mt-button @click="goNext" class="begain" style="display: inline-block;">完成</mt-button>
                    </div>
                
          </div>
</template>
<script>
import {PageName} from "../../Constant";

export default {
    data(){
        return{
            RISK_TOLERANCE_LEVEL:'',
            RISK_TOLERANCE_DESC:'',
            RISK_LEV_EXPLAIN:'',
            RISK_TOLERANCE_SCORE:''
        }
    },
    created(){
        let data = this.$route.query
        this.RISK_TOLERANCE_LEVEL = data. RISK_TOLERANCE_LEVEL
        this.RISK_TOLERANCE_DESC = data. RISK_TOLERANCE_DESC
        this.RISK_LEV_EXPLAIN = data. RISK_LEV_EXPLAIN
        this.RISK_TOLERANCE_SCORE = data. RISK_TOLERANCE_SCORE
    },
    methods:{
        reCheck(){
            this.$router.push({
                name:PageName.Riskproblom
            })
        },
        goNext(){
            // todo 跳转到购买
            this.$router.push({
                name:PageName.Productlist
            })
        }
    }
    
}
</script>

<style  lang="scss" scoped>
.app{
    width:100%;
    margin: 0 auto;
}
.chattuimg{
    margin-top: 2rem;
    text-align: center
}
.fenxiancontent{
    font-size: 0.4rem;
    color: #333;
    margin-top: 1.8rem;
    padding: 0 1rem;
}
.fenxiancontent .fenxiantitle{
    text-align: center;
}
.fenxiancontent .fenxiantitle h1{
    font-size: 1rem;
    color:#0096FE ;
}
.begain{
    font-size: 0.4rem;
    color: #fff;
    background-color: #0096FE;
    border-radius: 0.2rem;
    line-height: 1rem;
    width: 35%;
    margin: 0 auto;
    text-align: center;
    margin-top: 1.3rem;
    border: 0px;
    outline: none;
    display: block;
}

</style>
