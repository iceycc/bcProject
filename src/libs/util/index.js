import storage from './store/util.storage'
import Check from './check/util.check'
import isEquipment from './check/util.checkuserAgent'
import expand from './util.expand'
import filters from './util.filters'

export default {
  storage, // 数据存储操作库
  Check, //
  isEquipment, // 终端校验
  ...filters,// 过滤
  ...expand
}