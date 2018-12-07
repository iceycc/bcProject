import {PageName} from '../Constant'
import {ORG_ID_NUM} from '@/Constant'
import JinShang from './bank/router-jinshang'
import ZhengZhou from './bank/router-zhengzhou'
import ZhongBang from './bank/router-zhongbang'
import Common from './common'
import util from '../libs/util'
// util.storage.session.set('ORG_ID',bank.ORG_ID)

let ORG_ID = util.storage.session.get('ORG_ID') || ''
let frameIn = []
switch (ORG_ID + '') {
  case ORG_ID_NUM.JinShang:
    frameIn = JinShang;
    break;
  case ORG_ID_NUM.ZhengZhou:
    frameIn = ZhengZhou;
    break;
  case ORG_ID_NUM.ZhongBang:
    frameIn = ZhongBang;
    break;
}

let testPage = [
  {
    path: '*',
    component: resolve => require(['views/common/TestPage.vue'], resolve),
  }
]




export default [
  ...Common,
  ...frameIn,
  ...testPage
]
