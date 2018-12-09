import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view){
  return () => import(`@/views/${view}.vue`);
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 0,
      component: loadView('Maingame')
    }, {
      path: '/spinner',
      name: 1,
      component: loadView('Spinner')
    }, {
      path: '/settings',
      name: 2,
      component: loadView('Settings')
    }, {
      path: '/settings/words',
      name: 3,
      component: loadView('AddWords')
    }, {
      path: '/settings/language',
      name: 4,
      component: loadView('Languages')
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})