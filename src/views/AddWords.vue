<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card flat class="pa-4">
        <v-text-field v-model="word" label="คำศัพท์"></v-text-field>
        <v-layout>
          <v-flex xs6 class="pr-2">
            <v-btn @click="addWord(0)" block color="success">
              <v-icon>add</v-icon> &nbsp;เพิ่ม Verb
            </v-btn>
          </v-flex>
          <v-flex xs6 class="pl-2">
            <v-btn @click="addWord(1)" block color="info">
              <v-icon>add</v-icon> &nbsp;เพิ่ม Adverb
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <v-layout>
        <v-flex xs6>
          <v-divider />
          <v-list>
            <v-list-tile v-for="(word,index) in $root.$children[0].verbList" :key="index" dense>
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
            <v-list-tile v-for="(word,index) in $root.$children[0].adverbList" :key="index" dense>
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
      <v-btn flat color="yellow" @click.native="snackbar = false">ปิด</v-btn>
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
  methods: {
    removeWord(index,type){
      let list = [];
      if(type){
        list = this.$root.$children[0].adverbList;
      }else{
        list = this.$root.$children[0].verbList;
      }
      list.splice(index,1);
      this.$root.$children[0].saveToLocal();
    },
    addWord(type){
      if(this.word.trim() == ""){
        this.snackbarText = `กรุณากรอกคำศัพท์!`;
        this.snackbar = 1;
        return 0;
      }
      if(type){
        if(this.$root.$children[0].adverbList.indexOf(this.word.trim()) === -1){
          this.$root.$children[0].adverbList.push(this.word.trim());
        }else{
          this.snackbarText = `เกิดข้อผิดพลาด! มีคำว่า '${this.word}' อยู่แล้ว`;
          this.snackbar = 1;
          return 0;
        }
      }else{
        if(this.$root.$children[0].verbList.indexOf(this.word.trim()) === -1){
          this.$root.$children[0].verbList.push(this.word.trim());
        }else{
          this.snackbarText = `เกิดข้อผิดพลาด! มีคำว่า '${this.word}' อยู่แล้ว`;
          this.snackbar = 1;
          return 0;
        }
      }
      this.word = '';
      this.$root.$children[0].saveToLocal();
    }
  }
}
</script>
