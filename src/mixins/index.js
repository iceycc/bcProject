import {LsName, PageName} from "@/Constant";
import * as FromH5Active from './FromH5Active'
import * as FromH5ActiveNew from './FromH5Active.new'
import * as Common from './common'
import redirectByFromPage from './redirectByFromPage'
import queryStatus from './queryStatus'
import storeMixin from './storeMixin'
import reloadByPassWordErr from './reloadByPassWordErr'



export default {
  redirectByFromPage,
  queryStatus, // 有新老两套
  storeMixin,
  reloadByPassWordErr,
  ...FromH5ActiveNew,
  ...FromH5Active,
  ...Common
}
