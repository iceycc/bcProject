

import storage from './store/util.storage'
import Check from './check/util.check'
import isEquipment from './check/util.checkuserAgent'
import utils from './util.expand'
export default {
    storage,
    Check,
    isEquipment,
    ...utils
}