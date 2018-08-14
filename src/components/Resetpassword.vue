<template>
      <div id="app" class="app">
                <header class="header">
                        <a class="return" href=""></a>
                        <p>重置密码</p>
                    </header>
            <div class="opening_box">
                    <p>
                        <span>姓名</span>
                        <input type="text" name="text1" placeholder=" 请输入您的真实姓名">
                         <!-- <span  class="limit">银行限额</span>  -->
                   </p>
                    <p>
                        <span>身份证证号</span>
                        <input type="password" name="text1" placeholder="请输入18位身份证号">
                   </p>
                    <p>
                        <span>手机号</span>
                        <input type="text" name="text1" placeholder="请输入手机号">
                    </p>
                      <p>
                        <span>新登录密码</span>
                        <input type="password" class="newpassword" name="text1" style="width:72%" placeholder="登录密码需包含8-20位数字，大小字母组成">
                    </p>
                      <p>
                          <span>确认登录密码</span>
                        <input type="password" name="text1" placeholder="">
                    </p>
                    <p>
                        <span>验证码</span>
                        <input type="password" style="width: 48%;" name="text1" placeholder="请输入您的短信验证码">
                        <span class="getpassword">获取验证码</span>
                    </p>
               </div>
               <div class="tijiao Tips">请使用该预留手机号的储蓄卡进行开户</div>
               <button class="tijiao">重置密码</button>
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
.opening_box p{
    margin-left: 0.5rem;
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
    font-size: 0.3rem;
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
     display: inline-block;
     text-align: center;
     line-height: 1.3rem;
     color:#2B74FE;
	 border-radius:0.3rem;
     float:right;
}
.opening_box input{
	width: 50%;
	border: none;
	box-sizing: border-box;
	font-size: 14px;
	color: #333;
	line-height: 1.3rem;
	outline: none;
}
.tijiao{
	font-size: 0.4rem;
    color: #fff;
    background-color: #0096FE;
    border-radius: 0.2rem;
    line-height: 1.2rem;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 0.5rem;
    border: 0px;
    outline: none;
    display: block;
}
.Tips{
    margin-top:1rem;
    background-color:#FF5B05;
    width:80%;
}

</style>
