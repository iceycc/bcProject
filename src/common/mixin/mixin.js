import util from "../utils/util";
import {LsName, PageName} from "../../Constant";
import {API} from "../../service/api";

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
        toPreProduct() { // 用于登陆和测评结束后判断 源头是购买还是预约  还是电子账户来源
            let SOURCE_URL = util.storage.session.get(LsName.loginType)
            let goBuyData = util.storage.session.get(LsName.goBuy)
            if (SOURCE_URL == '预约下期') { // 判断是从预约产品过来的 ， 直接预约
                let ProDuctData = util.storage.session.get(LsName.ProDuctData)
                API.product.apiSaveSubscribeInfo(ProDuctData, res => {
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
                        path: PageName.Productlist
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
                util.storage.session.remove(LsName.loginType)
                if (SOURCE_URL) {
                    this.$router.push({
                        name: SOURCE_URL
                    })
                    return
                }
                this.$router.push({
                    path: PageName.Productlist
                })
            }
        },
        queryStatus({text = '等待中...', data, fn}) {
            this.Londing.open({
                text: text
            })
            let i = 1
            let timer = setInterval(() => {
                i++
                if (i == 5) {
                    clearInterval(timer)
                    this.Londing.close()
                    return
                }
                API.query.apiQueryBizStatus(data, result => {
                    console.log('RES_CODE>>', result.RES_CODE);
                    fn && fn(result, timer)
                })
            }, 2000)
        }

    }
}