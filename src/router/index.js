/**
 * 路由器js模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from'../components/login.vue'
import Productlist from'../components/Productlist.vue'
import Rechargesuccess from'../components/Rechargesuccess.vue'
import Rechargefailure from'../components/Rechargefailure.vue'
import Resetpassword from'../components/Resetpassword.vue'
import Riskassessment from'../components/Riskassessment.vue'
import Riskproblom from'../components/Riskproblom.vue'
import surebuy from'../components/surebuy.vue'
import Verificationsuccess from'../components/Verificationsuccess.vue'
import Recharge from'../components/Recharge.vue'
import Productlist2 from'../components/Productlist2.vue'
import opening3 from'../components/opening3.vue'
import opening2 from'../components/opening2.vue'
import opening from'../components/opening.vue'
import Investmentdetails from'../components/Investmentdetails.vue'
import Incomeprogress from'../components/Incomeprogress.vue'
import fengxianresult from'../components/fengxianresult.vue'
import Buysuccess from'../components/Buysuccess.vue'
import Buying from'../components/Buying.vue'
import Productreservation from'../components/Productreservation.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path:'/',
      component:Productreservation
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/opening',
      component:opening
    },
    {
      path:'/opening2',
      component:opening2
    },
    {
      path:'/opening3',
      component:opening3
    },
    {
      path:'/Investmentdetails',
      component:Investmentdetails
    },
    {
      path:'/Incomeprogress',
      component:Incomeprogress
    },
    {
      path:'/fengxianresult',
      component:fengxianresult
    },
    {
      path:'/Buysuccess',
      component:Buysuccess
    },
    {
      path:'/Buying',
      component:Buying
    },
    {
      path:'/Recharge',
      component:Recharge
    },
    {
      path:'/Productlist2',
      component:Productlist2
    },
    {
      path:'/Verificationsuccess',
      component:Verificationsuccess
    },
    {
      path:'/surebuy',
      component:surebuy
    },  {
      path:'/Riskproblom',
      component:Riskproblom
    },
    {
      path:'/Riskassessment',
      component:Riskassessment
    },
    {
      path:'/Resetpassword',
      component:Resetpassword
    },
    {
      path:'/Rechargefailure',
      component:Rechargefailure
    },
    {
      path:'/Rechargesuccess',
      component:Rechargesuccess
    },
    {
      path:'/Productlist',
      component:Productlist
    }
  ]
})
