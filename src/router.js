import Vue from 'vue'
import Router from 'vue-router'
// import Maingame from './views/Maingame.vue'
// import Settings from './views/Settings.vue'
// import AddWords from './views/AddWords.vue'
// import Spinner from './views/Spinner.vue'

Vue.use(Router)

function loadView(view){
  return () => import(/* webpackChunkName: "view-[request]" */`@/views/${view}.vue`);
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VerbAdverb',
      component: loadView('Maingame')
    }, {
      path: '/spinner',
      name: 'สปินเนอร์',
      component: loadView('Spinner')
    }, {
      path: '/settings',
      name: 'ตั้งค่า',
      component: loadView('Settings')
    },{
      path: '/settings/words',
      name: 'เพิ่มคำศัพท์',
      component: loadView('AddWords')
    },{
      path: '*',
      redirect: '/'
    }
  ]
})