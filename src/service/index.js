import currentBank from '../config/Adapter'
import wacthApi from '@/api/common/api.watch'
import commonApi from '@/api/common/api.common'
import bicai from '@/api/common/api.bicai'
export default {
  bicai,
  commonApi,
  ...currentBank.API,
  ...wacthApi
}
