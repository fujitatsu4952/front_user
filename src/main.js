import Vue from 'vue';
import App from './App.vue';
import smoothScroll from 'vue-smoothscroll';
import router from './router'; 
import dotenv from 'dotenv';

Vue.config.productionTip = false
Vue.use(smoothScroll)
new Vue({
  router,
  dotenv,
  render: h => h(App),
}).$mount('#app')