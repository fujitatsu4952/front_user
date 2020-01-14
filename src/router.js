import Vue from 'vue'
import Router from 'vue-router'
import Checkinform from './checkinform.vue'
import Thankyou from './thankyou.vue'

var url = window.location.href;
    var decoded = decodeURI(url); //日本語が入ったURLクエリにも対応する為のデコード
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/qrcode',
      name: 'checkinform',
      component: Checkinform
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: Thankyou
    },
]
})