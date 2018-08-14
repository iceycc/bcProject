<template>
       <div id="app" class="hello">
                <header class="header">
                        <a class="return" href=""></a>
                        <p>安全登录</p>
                    </header>
            <p class="titlecontent">欢迎登录晋商银行直销账户</p>
                    <div class="login_box">
                       <p><input type="text" name="text1" placeholder="开户手机号"></p>
                      <p><input type="password" name="text1" placeholder="登录密码"></p>
                  <span class="forget">忘记密码？</span>
                    <button class="tijiao">登录</button>
                <div class="lijizhuce">
                   <span>还未开户，立即注册</span>
                </div>
            </div>
            <div class="bottomcontent">
              <p>晋商银行已与比财实现安全直连</p>
            </div>
          </div>
</template>
<script>
export default {
    
}
</script>
<style  lang="scss" scoped>
.hello{
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
.bottomcontent{
    margin-top: 7rem;
    text-align: center;
}
.bottomcontent p{
    margin-top: 10px;
    background-image: url(../images/img/icon_dunpai@2x.png);
    font-size: 0.4rem;
    color: #808080;
    background-repeat: no-repeat;
    background-size: 0.4rem 0.4rem;
    padding-left: 0.5rem;
    background-position: 20%;
}
.titlecontent{
    margin-left: 0.5rem;
    font-size: 0.5rem;
}
.login_box{
position: relative;
}
.login_box p{
    height: 2rem;
    margin-left: 0.6rem;
    background-repeat: no-repeat;
    background-color: #fff;
    line-height: 1.2rem;
    width: 90%;
    background-size:0.7rem 0.7rem;
    background-position:.2rem .2rem;
    border-bottom:1px #E5E5E5 solid;
}
.login_box input{
    height: 2rem;
    width: 50%;
    border: none;
    box-sizing: border-box;
    font-size: 0.4rem;
    color: #333;
    /* line-height: 40px; */
    outline: none;
}
.tijiao{
    font-size: 0.4rem;
    color: #fff;
    background-color: #1badff;
    border-radius: 0.2rem;
    line-height: 1rem;
    width: 70%;
    margin: 0 auto;
    text-align: center;
    margin-top: 2rem;
    border: 0px;
    outline: none;
    display: block;
}
.login_box .forget{
    margin-top: 0.2rem;
    color: #1badff;
    position: absolute;
    right: 5%;
}
.lijizhuce{
    margin-top: 0.2rem;
    text-align: center;
    color: #1badff;
}
</style>
