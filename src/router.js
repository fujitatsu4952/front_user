import Vue from 'vue'
import Router from 'vue-router'
import JapaneseCheckinform from './Japanese-checkinform.vue'
import Thankyou from './components/thankyou/thankyou.vue'
import ChineseCheckinform from './Chinese-checkinform.vue'
import EnglishCheckinform from './English-checkinform.vue'

var url = window.location.href;
var decoded = decodeURI(url); //日本語が入ったURLクエリにも対応する為のデコード
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/qrcode/japanese',
    name: 'japanesecheckinform',
    component: JapaneseCheckinform
  }, {
    path: '/qrcode/chinese',
    name: 'chinesecheckinform',
    component: ChineseCheckinform
  }, {
    path: '/qrcode/english',
    name: 'englishcheckinform',
    component: EnglishCheckinform
  }, {
    path: '/thankyou',
    name: 'thankyou',
    component: Thankyou
  }, ]
})