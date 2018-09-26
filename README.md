#异业合作2期 

## 产品列表
1.  产品列表增加产品对应的银行logo和银行名称
	- [ ] `优化`九宫格
	- [ ] `优化`列表
2. 产品详情页
	- [ ] `优化`增加计算器

## 理财list
1. 理财产品-持有中
2. 理财产品-已赎回
3. 理财产品明细
	1. 筛选
	2. 明细

##  提现充值  
1.  `新增页`可用余额信息页 
	- [ ] `功能1`充值跳转充值
	- [ ] `功能2`提现跳转提现
	- [ ] `功能3`明细查询调整明显查询
2. `新增页`明细查询  
	- [ ] `功能1`筛选功能 
	- [ ] `功能2`查询展示列表
3. 充值页面
	- [ ] 增加选择付款方式？
4. 提现功能 
	- [ ] `新增页`提现页
	- [ ] `新增页`提现进度。
	- [ ] `新增页`提现成功
	- [ ] `新增页`提现失败



##   银行详情
1. 可用余额  点击进入银行详情页
2. 我的银行
3. 更多服务
	1. 风险测评
	2. `新增页` 更换银行卡：
	3. `新增页` 更换绑定手机号
	4. `新增页` 更换支付密码

## 电子账户
1. 修改密码 完成
2. `新增页` 安全登录 / 登陆列表

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
