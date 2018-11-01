/**
 * 第三方组件全局引入
 */
import {
  Button,
  Cell,
  Radio,
  MessageBox,
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

/**
 * 自定义样式引入
 */
import '@/assets/css/my-mint.css';
import '@/assets/css/common.css'

export default {
  async install(Vue, option) {
    Vue.prototype.Londing = Indicator
    Vue.prototype.Meg = MessageBox
    Vue.component(Button.name, Button)
    Vue.component(Cell.name, Cell)
    Vue.component(Radio.name, Radio)
    Vue.component('app-bar', AppBar);
    Vue.use(Calendar);
    Vue.use(filters);
  }
}