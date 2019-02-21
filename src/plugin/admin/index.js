/**
 * 第三方组件全局引入
 */
import {
  Button,
  Cell,
  Radio,
  Indicator
} from 'mint-ui'

import 'mint-ui/lib/style.css'
import Calendar from 'vue2-datepick';
/**
 * 自定义组件全局引入
 */
import AppBar from '@/components/header/AppBar'

/**
 * 插件引入
 */
import filters from '@/plugin/filters';
import Mixins from "@/mixins";
import globalValue from '@/plugin/setGlobalValue'
/**
 * 自定义样式引入
 */
import '@/assets/css/main.css'
import '@/assets/css/my-mint.css';
import '@/assets/css/common.css'


export default {
  async install(Vue, option) {
    // 全局注册vuex全局设置和获取方法
    Vue.mixin(Mixins.StoreMixin)
    //
    Vue.prototype.Londing = Indicator
    Vue.component(Button.name, Button)
    Vue.component(Cell.name, Cell)
    Vue.component(Radio.name, Radio)
    Vue.component('app-bar', AppBar);
    Vue.use(Calendar);
    // 设置全局filters
    Vue.use(filters);
    // 设置window全局变量,用于static内插件获取vue实例的属性
    Vue.use(globalValue);
  }
}
