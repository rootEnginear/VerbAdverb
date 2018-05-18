import Vue from 'vue'
import Router from 'vue-router'
import Maingame from './views/Maingame.vue'
import Settings from './views/Settings.vue'
import AddWords from './views/AddWords.vue'
import Spinner from './views/Spinner.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VerbAdverb',
      component: Maingame
    }, {
      path: '/spinner',
      name: 'สปินเนอร์',
      component: Spinner
    }, {
      path: '/settings',
      name: 'ตั้งค่า',
      component: Settings
    },{
      path: '/settings/words',
      name: 'เพิ่มคำศัพท์',
      component: AddWords
    },{
      path: '*',
      redirect: '/'
    }
  ]
})