<template>
          <div id="app" class="app">
                <header class="header">
                        <a class="return" href=""></a>
                        <p>风险评测</p>
                    </header>
            <div class="chattuimg">
                      <img src="images/img/Verificationsuccess@2x.png" style="width:30%" alt="">
                  </div>
                  <div class="fenxiancontent">
                      <div class="fenxiantitle">
                          <p>您的风险测评结果为</p>
                         <h1>45分 保守型 </h1>
                      </div>          
                      <p>风险承受较低，能容忍一定幅度的本金损失，止损意识强。资产配置以低风险品种为主。</p>
                    </div>
                    <div style="text-align:center">
                         <span class="begain" style="display: inline-block;">重新测评</span>
                         <span class="begain" style="display: inline-block;">完成</span>
                    </div>
                
          </div>
</template>
<script>
export default {
    
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
