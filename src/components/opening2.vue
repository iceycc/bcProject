<template>
      <div class="warp">
            <header class="header">
                        <a class="return" href=""></a>
                        <p>信息填写</p>
            </header>
            <div class="wrapicon">
                <div class="circle"><span>开户信息验证</span></div>
                <div class="circle"><span>绑定银行卡</span></div>
                <div class="circle"><span>设置密码</span></div>
            </div>           
            <div class="opening_box">
                 <p>
                     <span>选择银行</span>
                     <input type="text" name="text1" placeholder=" 请选择银行">
                      <!-- <span  class="limit">银行限额</span>  -->
                </p>
                 <p>
                     <span> 绑定卡卡号</span>
                     <input type="password" name="text1" placeholder="请输入绑定的银行卡号">
                </p>
                 <p>
                     <span>手机号码</span>
                     <input type="text" name="text1" placeholder="请输入您的银行预留手机号">
                 </p>
                 <p>
                     <span>验证码</span>
                     <input type="password" name="text1" placeholder="请输入您的短信验证码">
                     <span class="getpassword">获取验证码</span>
                 </p>
            </div>
            <!-- <div class="tijiao Tips">请使用该预留手机号进行开户</div> -->
            <button class="tijiao">下一步</button>
         </div>
</template>
<script>
export default {
    
}
</script>

<style  lang="scss" scoped>
.warp{
    width:100%;
    position: relative;
}
.header{
    background-color: #fff;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.4rem;
    border-bottom: 1px solid #e6e6e6;
}
.header p{
    text-align: center;
    font-size: 0.5rem;
}
.return{
    display:block;
    position:absolute;
    left:0.4rem;
    top:0.2rem;
    background-image:url(../images/img/back@2x.png);
    background-size:cover;
    width:0.3rem;
    height:0.9rem;
}
.opening_box p{
    margin-left: 0.6rem;
    background-repeat: no-repeat;
    background-color: #fff;
    line-height: 1.3rem;
    width: 90%;
    background-size:0.7rem 0.7rem;
    background-position:.2rem .2rem;
    border-bottom:1px #E5E5E5 solid;
}
.opening_box p span{
    font-family: PingFangSC-Regular;
    color: #444444;
    font-size: 0.4rem;
    display: inline-block;
    width: 2rem;
}
.opening_box p .limit{
    background-image:url(../images/img/problom2@2x.png);
    background-size:12px 12px;
	background-position:0 2.5px;
    background-repeat:no-repeat;
    padding-left:20px;
     color:#0096FE;
     font-family:PingFangSC-Regular;
}
.opening_box p .getpassword{
    margin-top: 0.3rem;
    float: right;
    display: inline-block;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.3rem;
    width: 2rem;
    height: 0.7rem;
    border: 1px solid #2B74FE;
    color: #2B74FE;
    border-radius: 0.2rem;
}
.opening_box input{
    width: 48%;
    border: none;
    box-sizing: border-box;
    font-size: 0.4rem;
    color: #333;
    line-height: 1.3rem;
    outline: none;
}
.tijiao{
    font-size: 0.5rem;
    color: #fff;
    background-color: #0096FE;
    border-radius: 0.2rem;
    line-height: 1rem;
    width: 70%;
    margin: 0 auto;
    text-align: center;
    margin-top: 1.5rem;
    /* border: 0px; */
    outline: none;
    display: block;
}
.circle{
    position: relative;
    z-index: 2;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    border: 1px solid #7ED321 ;
    box-sizing: border-box;       
    background: radial-gradient(#7ED321  50% , #7ED321  50%);
    white-space: nowrap;
}
.wrapicon{
    position: relative;
    margin: 1rem auto 0.8rem;
    display: flex;
    width: 80%;
    justify-content: space-between;
}
.wrapicon:before{
    position: absolute;
    top:50%;
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #7ED321 ;
}
.circle span{
    position: absolute;
    left: -0.5rem;
    top: 0.5rem;
    font-size: .4rem;
}
</style>
