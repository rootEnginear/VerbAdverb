import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#424242',
    secondary: '#FFF',
    accent: '#000'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
