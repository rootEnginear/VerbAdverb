<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card flat class="pa-4">
        <v-text-field v-model="word" :label="$t('words.txttitle')"></v-text-field>
        <v-layout>
          <v-flex xs6 class="pr-2">
            <v-btn @click="addWord(0)" block color="success">
              <v-icon>add</v-icon> &nbsp;{{$t('words.addverb')}}
            </v-btn>
          </v-flex>
          <v-flex xs6 class="pl-2">
            <v-btn @click="addWord(1)" block color="info">
              <v-icon>add</v-icon> &nbsp;{{$t('words.addadv')}}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-layout>
        <v-flex xs6>
          <v-divider />
          <v-list>
            <v-list-tile v-for="(word,index) in verbList" :key="index" dense>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{word}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon @click="removeWord(index,0)">remove_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex xs6>
          <v-divider />
          <v-list>
            <v-list-tile v-for="(word,index) in adverbList" :key="index" dense>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{word}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon @click="removeWord(index,1)">remove_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-snackbar :timeout="4000" bottom v-model="snackbar">
      {{snackbarText}}
      <v-btn flat color="yellow" @click.native="snackbar = false">{{$t('words.dissnack')}}</v-btn>
    </v-snackbar>
    
  </v-layout>
</template>

<script>
export default {
  name: 'settings',
  data(){
    return {
      word: '',
      snackbar: false,
      snackbarText: ''
    }
  },
  computed: {
    verbList() {
      return this.$store.state.verbList;
    },
    adverbList() {
      return this.$store.state.adverbList;
    }
  },
  methods: {
    hardCopy(data){
      return JSON.parse(JSON.stringify(data));
    },
    removeWord(index,type){
      let list = [];
      if(type){
        list = this.hardCopy(this.adverbList);
      }else{
        list = this.hardCopy(this.verbList);
      }
      list.splice(index,1);
      if(type){
        this.$store.commit('editState',[{name:'adverbList',value:list}]);
      }else{
        this.$store.commit('editState',[{name:'verbList',value:list}]);
      }
      this.$store.commit('saveToLocal');
    },
    addWord(type){
      if(this.word.trim() == ""){
        this.snackbarText = this.$t('words.txtblankerror');
        this.snackbar = 1;
        return 0;
      }
      if(type){
        if(this.adverbList.indexOf(this.word.trim()) === -1){
          let list = this.hardCopy(this.adverbList);
          list.push(this.word.trim());
          this.$store.commit('editState',[{name:'adverbList',value:list}]);
        }else{
          this.snackbarText = this.$t('words.dupworderror',{word:this.word});
          this.snackbar = 1;
          return 0;
        }
      }else{
        if(this.verbList.indexOf(this.word.trim()) === -1){
          let list = this.hardCopy(this.verbList);
          list.push(this.word.trim());
          this.$store.commit('editState',[{name:'verbList',value:list}]);
        }else{
          this.snackbarText = this.$t('words.dupworderror',{word:this.word});
          this.snackbar = 1;
          return 0;
        }
      }
      this.word = '';
      this.$store.commit('saveToLocal');
    }
  }
}
</script>
