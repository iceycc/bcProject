import {PageName} from '../Constant'
import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'
import JinShang from './bank/router-jinshang'
import ZhengZhou from './bank/router-zhengzhou'
import ZhongBang from './bank/router-zhongbang'
let ORG_ID = store.getters.GET_ORG_ID
let frameIn = []
switch (ORG_ID) {
  case ORG_ID_NUM.JinShang:
    frameIn = JinShang;
    break;
  case ORG_ID_NUM.ZhengZhou:
    frameIn = ZhengZhou;
    break;
  case ORG_ID_NUM.ZhongBang:
    frameIn = ZhongBang;
    break;
}
let commonPage = [
  {
    path: '/',
    redirect: {
      path: PageName.BankAccount
    }
  },
  /**
   * 电子账户
   */
  {
    path: '/' + PageName.BankAccount,
    name: PageName.BankAccount,
    component: resolve => require(['views/common/BankAccount.vue'], resolve),
    meta: {keepAlive: false, title: '电子账户', needLogin: false}
  },
  /**
   * 产品列表
   */
  {
    path: '/' + PageName.ProductList,
    name: PageName.ProductList,
    component: resolve => require(['views/common/product/ProductList.vue'], resolve),
    meta: {keepAlive: false, title: '产品列表', needLogin: false}
  },
  {
    path: '/' + PageName.ProductReservation,
    name: PageName.ProductReservation,
    component: resolve => require(['views/common/product/ProductReservation.vue'], resolve),
    meta: {keepAlive: false, needLogin: false}
  },
  {
    path: '/' + PageName.OrderNextSuccess,
    name: PageName.OrderNextSuccess,
    component: resolve => require(['views/common/product/OrderNextSuccess.vue'], resolve),
    meta: {keepAlive: false, title: '预约成功', needLogin: false}
  },
  /**
   * 比财登陆
   */
  {
    path: '/' + PageName.BcOpening1,
    name: PageName.BcOpening1,
    component: resolve => require(['views/common/bcOpen/Opening1.vue'], resolve),
    meta: {keepAlive: false, title: '实名认证', needLogin: false}
  },
  {
    path: '/' + PageName.BcOpening2,
    name: PageName.BcOpening2,
    component: resolve => require(['views/common/bcOpen/Opening2.vue'], resolve),
    meta: {keepAlive: false, title: '绑卡', needLogin: false}
  },
  {
    path: '/' + PageName.BcOpening3,
    name: PageName.BcOpening3,
    component: resolve => require(['views/common/bcOpen/Opening3.vue'], resolve),
    meta: {keepAlive: false, title: '注册成功', needLogin: false}
  }
]

let testPage = [
  {
    path: '/' + PageName.TestPage,
    name: PageName.TestPage,
    component: resolve => require(['views/common/TestPage.vue'], resolve),
  }
]




export default [
  ...commonPage,
  ...frameIn,
  ...testPage
]
