import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

import th from './translations/th'
import en from './translations/en'

export const locale = new Vuex.Store();

Vue.use(vuexI18n.plugin, locale);

Vue.i18n.add('th', th);
Vue.i18n.add('en', en);

Vue.i18n.set('en');
Vue.i18n.fallback('th');