# 版本更新记录
### 1218版本
- [X] 众邦银行从开发到提测到需求砍掉到项目删除（有客商晋商两个银行的备份）
- [X] 郑州银行h5交易版上线
- [X] 客商银行h5交易版一期上线
- [X] 对接1218活动页，比财拼团，拼财拼团
- [X] 异业合作产品列表，产品详情定制的开发，我的资产银行列表

### 1227上线版本
- [X] 产品定制规范
- [X] 跳转银行过渡页开发
- [X] 平安银行
### 190115
- [] 客商二期


# 总结
---
## 兼容问题总结
* input number 不同设备展示不同 有的不会限制类型，汉字字母照常能输入
* ios，部分安卓机型 的部分浏览器title不动态改变
* ios事件监听会触发闪屏
* input
* document.title=title在ios上并不能动态改变title（iphone上的微信端）,但是在电脑上和安卓手机上却没有问题

## 补充
* canvas 压缩旋转图片
* 动态旋转


# prepare

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
