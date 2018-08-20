<template>
        <div id="app">
                <div class="app">
                        <header class="header">
                                <a class="return" href=""></a>
                                <p>风险测评</p>
                            </header>
                  <p class="probloms">1/13</p>
                  <div class="problomtitle">
                      <p>1.您的主要收入来源是：</p>
                  </div>
                  <div class="problomselect">
                        <p>A 无固定收入
                            <div style="width:0.4rem;height:0.4rem;float:right">
                                <input type="radio">
                            </div>                           
                             </p>
                        <p>B 出租，出售房地产等非金融性质财产收入  
                            <div style="width:0.4rem;height:0.4rem;float:right">
                                <input type="radio">
                            </div></p>
                        <p>C 利息，股息，转让证券等金融性质资产收入  
                            <div style="width:0.4rem;height:0.4rem;float:right">
                                <input type="radio">
                            </div></p>
                        <p>D 生产经营所得  
                            <div style="width:0.4rem;height:0.4rem;float:right">
                                <input type="radio">
                            </div></p>
                        <p>E 工资，劳务报酬  
                            <div style="width:0.4rem;height:0.4rem;float:right">
                                <input type="radio">
                            </div></p>
                    </div>
                 </div>
                 <div style="text-align:center">
                        <span class="begain">上一题</span>
                        <span class="begain">提交</span>
                   </div>
        </div>
   
</template>
<script>
export default {
    
}
</script>

<style  lang="scss" scoped>
.app{
    width:94%;
    padding: 0 3%;
}
.app .probloms{
    text-align: center;
    color: #666666 ;
}
.app .problomtitle{
    font-size: 0.4rem;
    line-height: 1rem;
    height:1rem;
    width:100%;
    border-bottom:1PX #E5E5E5 solid; 
    color: #333;
}
.app .problomselect{
    font-size: 0.4rem;
    color:#666666;
    padding: 0.2rem 0;
}
.app .problomselect p{
    padding: 0.2rem 0;
}
.begain{
    font-size: 0.4rem;
    color: #fff;
    background-color: #0096FE;
    border-radius: 0.2rem;
    line-height: 1rem;
    width: 35%;
    text-align: center;
    margin-top: 1.3rem;
}
</style>
