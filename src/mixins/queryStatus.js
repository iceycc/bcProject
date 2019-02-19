import API from "@/service";
import {LsName, PageName} from "@/Constant";

export default {
  methods: {

    /**
     * 用于处理 交易时的轮询 老版本
     * @param text
     * @param data
     * @param fn
     */
    queryStatus({
                  text = '等待中...', // 轮询等待提示
                  data, // 轮询参数
                  fn ,// 轮询回调
                  time = 5
                }) {
      this.Londing.open({
        text: text
      })
      let i = 1
      let timer = setInterval(() => {
        i++
        API.common.apiQueryBizStatus(data, result => {
          // console.log('RES_CODE>>', result.RES_CODE);
          fn && fn(result, timer, i) // result轮询结果，timer用于回调內清除定时器
        }, err => {
          clearInterval(timer)
        })
        if (i == time) {
          clearInterval(timer)
          this.Londing.close()
          return
        }
      }, 2000)
    },
    /**
     * 新的交易查询接口
     * @param data
     * @param text
     * @returns {Promise<void>}
     */
    async queryBizStatus(data,text='正在交易中') {
      // 交易轮询
      this.Londing.open({
        text: text
      })
      try {
        let result = await API.common.apiQueryBizStatus(data)
        this.Londing.close()
        return Promise.resolve(result)
      } catch (e) {
        this.Londing.close()
        Bus.$emit(BusName.showToast, e);
        return Promise.reject(e)
      }
    },
  },

}
