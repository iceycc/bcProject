<template>
    <div class="wrap pro">
        <app-bar title="交易明细"></app-bar>
        <div class="t-tab">
        
          <!-- <div class="t-icon">
            <img src="../../images/img/icon_shaixuan@2x.png">
          </div> -->
          <ul class="tabs">
              <li class="li-tab" v-for="(item,index) in tabsParam" 
              @click="toggleTabs(index)"
              :class="{active:index==nowIndex}">{{item}}</li>
          </ul>
          <div class="divTab" v-show="nowIndex===0">
            <div class="t-content">
                <h4>本月</h4>
                <div>
                    <ul>
                        <li>
                            <h5>工银纯债半年定开 <span>买入</span></h5>
                            <p>
                              <span>申购</span><span>2018-08-30  15:20:23</span>
                              <em>¥66,354.30</em>
                            </p>
                        </li>
                        <li>
                            <h5>工银纯债半年定开 <span>买入</span></h5>
                            <p>
                              <span>申购</span><span>2018-08-30  15:20:23</span>
                              <em>¥66,354.30</em>
                            </p>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div class="t-content">
                <h4>2018年8月</h4>
                <div>
                    <ul>
                        <li>
                            <h5>工银纯债半年定开</h5>
                            <p>
                              <span>申购</span><span>2018-08-30  15:20:23</span>
                              <em>¥66,354.30</em>
                            </p>
                        </li>
                        <li>
                            <h5>工银纯债半年定开 <span>买入</span></h5>
                            <p>
                              <span>申购</span><span>2018-08-30  15:20:23</span>
                              <em>¥66,354.30</em>
                            </p>
                        </li>
                        
                    </ul>
                </div>
            </div>
          </div>
          <div class="divTab" v-show="nowIndex===1">我是tab2</div>
          <div class="divTab" v-show="nowIndex===2">我是tab3</div>
          <div class="divTab" v-show="nowIndex===3">
              <div class="t-date">
                <ul>
                  <li>
                    2018-02-23
                    <span></span>
                  </li>
                  <li>
                    2018-06-23
                    <span></span>
                  </li>
                </ul>
                <div class="t-query">查询</div>
              </div>
          </div>
        </div>
        
    </div>
</template>
<script>
    import {API} from "../../request/api";
    import {LsName, PageName} from "../../Constant";
    import util from "../../common/utils/util";


    export default {
        data() {
            return {
                tabsParam:['1个月','2个月','3个月'," "],//（这个也可以用对象key，value来实现）
                nowIndex:0,//默认第一个tab为激活状态
                
            }
        },
        beforeCreate () {
            document.getElementsByTagName("body")[0].className="bg_white";
          },
          beforeDestroy () {
            document.getElementsByTagName("body")[0].className="";
          },
        created() {

            
        },
        methods: {
            toggleTabs(index){
                this.nowIndex=index;
            }
            
        }
    }
</script>

<style lang="scss">
// .pro .header img{ display:none;}
 // .pro .header{ border-bottom:1px solid #518BEE;}
 .bg_white{background:#f4f4f8; height: 100%;}
</style>

<style lang="scss" scoped>
    @import "../../assets/px2rem";
    .icon{position:absolute;}
    .icon:after{
            display: block;
            content:"";
            width:px2rem(22);height: px2rem(22); display:block; margin-top:px2rem(10);  z-index: 2;background: url("../../images/img/icon_shaixuan@2x.png") no-repeat; background-size: 100%;
          }
    .wrap {
        width: 100%;
        box-sizing: border-box;
    }
    .t-tab{
      position: relative; 
      ul.tabs {
        position:relative;
        // margin-right: px2rem(60);
        background:#ccc;
        display: flex;
        height: px2rem(44);
        line-height: px2rem(44);
        background:#fff;
        li{
          flex:1;
          text-align: center;
          font-size: px2rem(15);
          color:#B3B3B3;
        }
        li:last-child { position:relative;
          width:px2rem(60); height:px2rem(44); flex:none; border-left:px2rem(1) solid #F6F6F9;
        }
        li:last-child:after{
            position:absolute;
            content:"";
            width:px2rem(22);height: px2rem(22); display:block; z-index: 2;background: url("../../images/img/icon_shaixuan@2x.png") no-repeat; background-size: 100%; top: 0; left: 0; right:0; margin:px2rem(12) auto 0;
          }

        
        li.active{
          color: #508CEE;
        }
      }

      .divTab{
            .t-content{
              h4{ color:#B3B3B3; font-size:px2rem(14); line-height:px2rem(20); padding: px2rem(16) px2rem(15) px2rem(4); font-weight: normal; }
              div{ 
               
                background:#fff; overflow:hidden;
                ul{
                    
                  li{
                    display:block;
                    border-bottom: px2rem(1) solid #E7E7E7;padding: px2rem(10) 0;margin: 0 px2rem(15);

                    
                    h5{ font-size: px2rem(14); line-height: px2rem(20); color:#121B32; font-weight: normal; padding-bottom: px2rem(4);
          

                    }
                    p{
                      span{ font-size: px2rem(12); line-height: px2rem(17); display: inline-block; padding-right:px2rem(20); color:#858E9F;}
                      em{font-size: px2rem(18); float:right; position:relative; margin-top: px2rem(-12);line-height: px2rem(25); color:#333333;}
                    }
                  }
                  li:last-child{
                    border-bottom:none;
                  }
                }
                ul:last-child{
                  border-bottom:none;
                }
              }
            }
            padding-bottom: px2rem(16);

      }

      .t-date{ 
        height:px2rem(44); background:#EFEFEF; line-height: px2rem(44); position:relative;
       ul{ 

          margin-right:px2rem(60); display: flex;
          li{
            flex:1; display:inline-block; font-size: px2rem(15); color:#666666; padding-left: px2rem(20);
            span{ display:inline-block;
                height: 0;
                width: 0;
                border-right: px2rem(5) solid transparent;
                border-top: px2rem(6) solid #666666;
                border-left: px2rem(5) solid transparent; margin-left: px2rem(10);
            }
          }

        }
      .t-query{ width:px2rem(60); height: px2rem(44); color:#508CEE; font-size: px2rem(15); position:absolute; right:0; top: 0; text-align: center;}
      }
  }

</style>
