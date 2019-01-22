import {LsName, PageName} from "@/Constant";
import * as FromH5Active from './FromH5Active'
import * as Common from './common'
import redirectByFromPage from './redirectByFromPage'
import queryStatus from './queryStatus'
import storeMixin from './storeMixin'
import reloadByPassWordErr from './reloadByPassWordErr'



export default {
  redirectByFromPage,
  queryStatus,
  storeMixin,
  reloadByPassWordErr,
  ...FromH5Active,
  ...Common
}
