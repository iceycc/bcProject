import watchHttp from '@/plugin/watchBuryingPoint/watchHttp'
import {HOST} from "@/Constant";
const Config = {
  watchConfig:{
    method: 'post',
    baseURL:HOST,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 30000,
  },
}

/**
 * watch 用于埋点
 */
export default {
    watchApi(params, success, error) {
      let options = {
        url: '/finsuitPhone/deal',
        params
      }
      return watchHttp.post(options,Config.watchConfig, success, error)

    },
}