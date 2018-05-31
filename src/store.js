import Vue from 'vue'
import Vuex from 'vuex'

import th from './translations/th'
import en from './translations/en'

Vue.use(Vuex)

const STORAGE_NAME = 'verbadverb'

/** Conversion
  * State <-- Data
  * Mutations := Sync Method / Just do it
  * Actions := Async Method / Call others actions or mutations
  * Getters <-- Computed
  */

export default new Vuex.Store({
  strict: true,
  state: {
    verbList: th['words.verb'],
    adverbList: th['words.adverb'],
    playSound: true,
    locale: (window.navigator.userLanguage || window.navigator.languages).includes("th") ? 'th' : 'en'
  },
  mutations: {
    saveToLocal(state, payload = {reset:false, onlyword:false}) {
      if (payload.reset) {
        let data = [];
        if(state.locale === 'th'){
          data = [
            th['words.verb'],
            th['words.adverb']
          ];
        }else{
          data = [
            en['words.verb'],
            en['words.adverb']
          ];
        }
        if (payload.onlyword) {
          data.push(state.playSound);
        }else{
          data.push(true);
        }

        data.push(state.locale)
        
        localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
      } else {
        localStorage.setItem(STORAGE_NAME, JSON.stringify([
          state.verbList,
          state.adverbList,
          state.playSound,
          state.locale
        ]));
      }
    },
    editState(state,payload=[]){
      for(let data in payload){
        let x = payload[data];
        state[x.name] = x.value;
      }
    }
  },
  actions: {
    loadFromLocal(context) {
      let data = JSON.parse(localStorage.getItem(STORAGE_NAME)) || "";
      if (data === "") {
        context.commit('saveToLocal',{reset: true});
      } else {
        context.commit('editState',[
          {name: 'verbList', value:data[0]},
          {name: 'adverbList', value: data[1]},
          {name: 'playSound', value: data[2]},
          {name: 'locale', value:data[3]}
        ]);
      }
    },
    resetWords(context) {
      context.commit('saveToLocal', { reset: true, onlyword: true });
      context.dispatch('loadFromLocal');
    }
  }
})