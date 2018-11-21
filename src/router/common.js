import {PageName} from "../Constant";

export default [
  {
    path: '/',
    redirect: {
      path: PageName.ProductList
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
  },
  {
    path: '/' + PageName.PasswordOneForZhengZhou,
    name: PageName.PasswordOneForZhengZhou,
    component: resolve => require(['views/ForApp/PasswordOneForZhengZhou.vue'], resolve),
    meta: {keepAlive: false, title: '密码', needLogin: false}
  },
  {
    path: '/' + PageName.PasswordThreeForZhengZhou,
    name: PageName.PasswordThreeForZhengZhou,
    component: resolve => require(['views/ForApp/PasswordThreeForZhengZhou.vue'], resolve),
    meta: {keepAlive: false, title: '密码', needLogin: false}
  },
  {
    path: '/' + PageName.PasswordTowForZhengZhou,
    name: PageName.PasswordTowForZhengZhou,
    component: resolve => require(['views/ForApp/PasswordTowForZhengZhou.vue'], resolve),
    meta: {keepAlive: false, title: '密码', needLogin: false}
  }
]
