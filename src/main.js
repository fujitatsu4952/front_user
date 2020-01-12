import Vue from 'vue';
import App from './App.vue';
import smoothScroll from 'vue-smoothscroll';
import dotenv from 'dotenv';

Vue.config.productionTip = false
Vue.use(smoothScroll)
new Vue({
  dotenv,
  render: h => h(App),
}).$mount('#app')