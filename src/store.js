import Vue from 'vue'
import Vuex from 'vuex'

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
    verbList: ["นั่ง", "นอน", "กิน", "ขี้", "เดิน", "วิ่ง", "เลื้อย", "เต้น", "คลาน", "ท่องสูตรคูณ", "ปวดฟัน", "ปวดท้อง", "หัวเราะ", "ยืน", "โพสท่า"],
    adverbList: ["แบบสวยๆ", "แบบจริงจัง", "อย่างเมามัน", "แบบช้าๆ", "ด้วยความรำคาญ", "แบบนางสาวไทย", "อย่างบ้าคลั่ง", "แบบตื่นเต้นสุดๆ", "เหมือนอยู่บนสาย 8", "แบบโรคจิต"],
    playSound: true
  },
  mutations: {
    saveToLocal(state, payload = {reset:false, onlyword:false}) {
      if (payload.reset) {
        let data = [
          ["นั่ง", "นอน", "กิน", "ขี้", "เดิน", "วิ่ง", "เลื้อย", "เต้น", "คลาน", "ท่องสูตรคูณ", "ปวดฟัน", "ปวดท้อง", "หัวเราะ", "ยืน", "โพสท่า"],
          ["แบบสวยๆ", "แบบจริงจัง", "อย่างเมามัน", "แบบช้าๆ", "ด้วยความรำคาญ", "แบบนางสาวไทย", "อย่างบ้าคลั่ง", "แบบตื่นเต้นสุดๆ", "เหมือนอยู่บนสาย 8", "แบบโรคจิต"], true
        ];
        if (payload.onlyword) {
          data = [
            ["นั่ง", "นอน", "กิน", "ขี้", "เดิน", "วิ่ง", "เลื้อย", "เต้น", "คลาน", "ท่องสูตรคูณ", "ปวดฟัน", "ปวดท้อง", "หัวเราะ", "ยืน", "โพสท่า"],
            ["แบบสวยๆ", "แบบจริงจัง", "อย่างเมามัน", "แบบช้าๆ", "ด้วยความรำคาญ", "แบบนางสาวไทย", "อย่างบ้าคลั่ง", "แบบตื่นเต้นสุดๆ", "เหมือนอยู่บนสาย 8", "แบบโรคจิต"], state.playSound
          ];
        }
        localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
      } else {
        localStorage.setItem(STORAGE_NAME, JSON.stringify([state.verbList, state.adverbList, state.playSound]));
      }
    },
    editState(state,payload=[]){
      for(let data in payload){
        let x = payload[data];
        // debugger;
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
          {name:'verbList', value:data[0]},
          {name: 'adverbList',value: data[1]},
          {name: 'playSound',value: data[2]}
          // state.verbList = data[0];
          // state.adverbList = data[1];
          // state.playSound = data[2];
        ]);
      }
    },
    resetWords(context) {
      context.commit('saveToLocal', { reset: true, onlyword: true });
      context.dispatch('loadFromLocal');
    }
  }
})