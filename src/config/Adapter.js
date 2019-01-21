import util from '@/libs/util'
import {ORG_ID_NUM} from './bank'

let ORG_ID = util.storage.session.get('ORG_ID') || ''
/**
 * api
 */
// import api_ZZH from '@/api/bank/api.ZZH'
import api_KSH from '@/api/bank/api.KSH'
import api_GSH from '@/api/bank/api.GSH'
/**
 * router
 */
// import router_ZZH from '@/router/bank/router.ZZH'
import router_KSH from '@/router/bank/router.KSH'
import router_GSH from '@/router/bank/router.GSH'

let currentBank = {API: {}, ROUTER: {}};
switch (ORG_ID + '') {
  case ORG_ID_NUM.ZZH:
    currentBank = {
      API: api_ZZH,
      ROUTER: router_ZZH
    }
    break;

  case ORG_ID_NUM.KSH:
    currentBank = {
      API: api_KSH,
      ROUTER: router_KSH
    }
    break;
    case ORG_ID_NUM.GSH:
    currentBank = {
      API: api_GSH,
      ROUTER: router_GSH
    }
    break;
}
console.log('currentBank', currentBank);

export default currentBank;
