import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/main.less';
// 导入组件库
import XD from '../packages';
import App from './App.vue';
import router from './router';
// 注册组件库
Vue.use(XD);
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
