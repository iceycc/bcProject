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
                     <span>姓名</span>
                     <input type="text" name="text1" placeholder=" 请输入您的姓名">
                </p>
                 <p>
                     <span> 身份证号</span>
                     <input type="password" name="text1" placeholder="请输入18位身份证号">
                </p>
                 <p>
                     <span>职业</span>
                     <input type="text" name="text1" placeholder="请选择职业">
                 </p>
                 <p>
                     <span>学历</span>
                     <input type="password" name="text1" placeholder="请选择学历">
                 </p>
                  <div class="photo">
                     <div class="cameraphoto">
                         <div style="text-align: center;">身份证人像页照</div>
                        <div class="cameraphotoimg">
                            <img src="../images/img/cameracopy@2x.png" style="width:50%" alt="">                                       
                        </div>               
                     </div>
                      <div class="cameraphoto">
                         <div  style="text-align: center;">身份证国徽页照</div>
                         <div class="cameraphotoimg">
                            <img src="../images/img/cameracopy@2x.png" style="width:50%" alt="">                                       
                        </div>  
                      </div>
                 </div>
            </div>
           <div class="IDphoto">
               <div class="IDphotoPositive"></div>
               <div class="IDphotoback"></div>
           </div>
            <button class="tijiao">下一步</button>
              <p class="bang">我已阅读并同意注册<strong style=" color:#0096FE;">《用户授权服务协议》《晋商银行直销银行电子账户服务协议》</strong></p>
         </div>
</template>
<script>
export default {
    
}
</script>

<style  lang="scss" scoped>
body{
    font-size: .3rem;
  }
  .warp{
      width:100%;
      position: relative;
  }
 
  .opening_box p{
      margin-left:0.6rem;
      background-repeat:no-repeat;
      background-color:#fff;
      line-height:1rem;
      width:90%;
      background-size:0.7rem 0.7rem;
      background-position:.2rem .2rem;
      border-bottom:1px #E5E5E5 solid;
  }
  .opening_box p span{
      font-family: PingFangSC-Regular;
      color:#444444 ;
      font-size: .4rem;
      display: inline-block;
      width:2rem;
  }
  .opening_box p .limit{
       color:#0096FE;
       font-family:PingFangSC-Regular;
  }
  .opening_box p .getpassword{
       display: inline-block;
       text-align: center;
       line-height:1.5rem;
       font-size: 0.2rem;
       width:2rem;
       height:1rem;
       border: 1px solid #2B74FE;
       color:#2B74FE;
       /* border-radius:6px; */
  }
  .opening_box .photo{
    margin-left:0.6rem;
    background-repeat:no-repeat;
    background-color:#fff;
    line-height:1rem;
    width:90%;
    background-size:0.7rem 0.7rem;
    background-position:.2rem .2rem;
    border-bottom:1px #E5E5E5 solid;
}
  .cameraphoto{
      display: inline-block;
      padding-left: 6%;
  }
  .cameraphotoimg{
      text-align: center;
      line-height: 130px;
      margin-bottom: 10px;
      width:130px;
      height:100px;
      border:1px dotted #eaeaea; 
  }
  .opening_box input{
      width: 50%;
      border: none;
      box-sizing: border-box;
      font-size: 14px;/*px*/
      color: #333;
      line-height: 40px;
      outline: none;
  }
  .tijiao{
      font-size:16px;
      color:#fff;
      background-color:#508CEE  ;
      border-radius:0.1rem;
      line-height:1rem;
      width:70%;
      margin:0 auto;
      text-align:center;
      margin-top:2rem;
      border:0rem;
      outline:none;
      display:block;
  }
  .Tips{
      margin-top:0.8rem;
      background-color:#FF5B05;
      width:60%;
  }
  .bang{
      margin-top: 0.5rem;
      padding-right: 0.3rem;
      background-image:url(../images/img/agree@3x.png);
      font-size:0.35rem;
      color:#808080;
      background-repeat:no-repeat;
      background-size:0.4rem 0.4rem;
      padding:0 0.8rem;
      background-position:0.2rem 0.05rem;
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
