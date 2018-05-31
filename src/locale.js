import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import store from './store'

import th from './translations/th'
import en from './translations/en'

const locale = new Vuex.Store();

Vue.use(vuexI18n.plugin, locale);

Vue.i18n.add('th', th);
Vue.i18n.add('en', en);

store.dispatch('loadFromLocal');
let lang = store.state.locale || ((window.navigator.userLanguage || window.navigator.languages).includes("th") ? 'th' : 'en');

Vue.i18n.set(lang);
Vue.i18n.fallback('th');

export default locale;