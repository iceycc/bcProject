import util from "libs/util";
import {LsName, PageName} from "@/Constant";
import API from "@/service";

import loginMixins from './login-mixins'
import opening1Mixins from './opening/opening1-mixins'
import opening2Mixins from './opening/opening2-mixins'

export const LoginMixins = loginMixins
export const Opening1Mixins = opening1Mixins
export const Opening2Mixins = opening2Mixins


export const Mixin = {
    beforeCreate() {
        console.log('beforeCreate');
        if (util.storage.session.get(LsName.reload)) {
            util.storage.session.remove(LsName.reload)
            location.reload()
        }
    }
}
export const UtilMixin = {
    methods: {
      /**
       * 用于登陆和测评结束后判断 源头是购买还是预约  还是电子账户来源
       */
      toPreProduct() {
            let SOURCE_URL = util.storage.session.get(LsName.loginType)
            let goBuyData = util.storage.session.get(LsName.goBuy)
            if (SOURCE_URL == '预约下期') { // 判断是从预约产品过来的 ， 直接预约
                let ProDuctData = util.storage.session.get(LsName.ProDuctData)
                API.JINSHANG.product.apiSaveSubscribeInfo(ProDuctData, res => {
                    console.log(res);
                    this.$router.push({
                        name: PageName.OrderNextSuccess,
                        query: {
                            PRD_NAME: ProDuctData.PRD_NAME,
                        }
                    })
                    util.storage.session.remove(LsName.ProDuctData)
                    util.storage.session.remove(LsName.loginType)
                }, err => {
                    this.$router.push({
                        path: PageName.ProductList
                    })
                    // Bus.$emit(BusName.showToast,err)
                    util.storage.session.remove(LsName.ProDuctData)
                    util.storage.session.remove(LsName.loginType)
                    console.log(err);
                })
                return
            } else if (SOURCE_URL == '安全购买') { // 购买页
                util.storage.session.remove(LsName.goBuy)
                util.storage.session.remove(LsName.loginType)
                // 其他的话  正常 跳转购买页
                this.$router.push({
                    name: PageName.Buying,
                    query: goBuyData
                })
            }
            else {
                //
                // util.storage.session.remove(LsName.loginType)
                if (SOURCE_URL) {
                    this.$router.push({
                        name: SOURCE_URL
                    })
                    return
                }
                this.$router.push({
                    path: PageName.ProductList
                })
            }
        },
      /**
       * 用于处理 交易时的轮询
       * @param text
       * @param data
       * @param fn
       */
        queryStatus({
                        text = '等待中...', // 轮询等待提示
                        data, // 轮询参数
                        fn // 轮询回调
                    }) {
            this.Londing.open({
                text: text
            })
            let i = 1
            let timer = setInterval(() => {
                i++
                API.JINSHANG.query.apiQueryBizStatus(data, result => {
                    console.log('RES_CODE>>', result.RES_CODE);
                    fn && fn(result, timer, i) // result轮询结果，timer用于回调內清除定时器
                })
                if (i == 5) {
                    clearInterval(timer)
                    this.Londing.close()
                    return
                }
            }, 2000)
        }

    }
}


