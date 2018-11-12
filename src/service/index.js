import store from '@/store'
import {ORG_ID_NUM} from '@/Constant'

import JINSHANG from './api/api.JINSHANG'
import ZHENGZHOU from './api/api.ZHENGZHOU'
import ZHONGBANG from './api/api.ZHONGBANG'
import wacthApi from './api/api.watch'
import bicai from './api/api.bicai'

let ORG_ID = store.getters.GET_ORG_ID
let API = {};
switch (ORG_ID) {
  case ORG_ID_NUM.JinShang:
    API = JINSHANG;
    break;
  case ORG_ID_NUM.ZhengZhou:
    API = ZHENGZHOU;
    break;
  case ORG_ID_NUM.ZhongBang:
    API = ZHONGBANG;
    break;
}
export default {
  bicai,
  ...API,
  ...wacthApi
}
