import Common from './common'
import currentBank from '../config/Adapter'


let testPage = [
  {
    path: '/test',
    component: resolve => require(['views/common/test.vue'], resolve),
  } ,
  {
    path: '*',
    component: resolve => require(['views/common/TestPage.vue'], resolve),
  }
]




export default [
  ...Common,
  ...currentBank.ROUTER,
  ...testPage
]
