import Vue from 'vue'
import './vuetify'
import store from './store'
import { locale } from './locale'
import router from './router'
import './registerServiceWorker'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  locale,
  render: h => h(App)
}).$mount('#app')
