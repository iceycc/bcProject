import custom from '@/filters'

export default {
  install(Vue,options){
    Object.keys(custom).forEach(key => {
      Vue.filter(key, custom[key])
    })
  }
}
