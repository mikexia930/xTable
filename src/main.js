import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 导入组件库
import XD from '../packages';
import App from './App.vue';
// 注册组件库
Vue.use(XD);
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
