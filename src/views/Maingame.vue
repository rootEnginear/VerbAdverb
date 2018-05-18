<template>
  <v-layout align-center justify-center>
    <v-flex xs12 class="text-xs-center">
      <span class="display-4">{{verbText}}</span>
      <br><br>
      <span class="display-2">{{adverbText}}</span>
      <br><br><br><br>
      <v-btn ref="randBtn" :disabled="randomInProgress" color="yellow text--black" @click.native="randText">&emsp;&emsp;<v-icon>refresh</v-icon> &nbsp;{{btnText}}&emsp;&emsp;</v-btn>
    </v-flex>
    <audio ref="sound" preload src="./audio/roll.wav"></audio>
  </v-layout>
</template>

<script>
export default {
  name: 'minigame',
  data(){
    return {
      verbText: "???",
      adverbText: "???",
      randomInProgress: false
    }
  },
  computed: {
    btnText() {
      const texts = ['คลิ๊กกกกกกกกกกซ์','จิ้มมมมมมมมมม','สุ่มมมมมมมมมม','สุ่มวนไปค่ะ','สุ่มซิจ๊ะ รออะไร'];
      return texts[Math.floor(Math.random() * texts.length)];
    }
  },
  methods: {
    randText(){
      this.randomInProgress = true;
      // Sound
      if(this.$root.$children[0].playSound){
        let sound = this.$refs.sound;
  
        sound.currentTime = 0;
        sound.play();
      }
      let verbList = this.$root.$children[0].verbList;
      let adverbList = this.$root.$children[0].adverbList
      // Randomizer
      let randomVerb = setInterval(()=>{
        this.verbText = verbList[Math.floor(Math.random() * verbList.length)];
        this.adverbText = adverbList[Math.floor(Math.random() * adverbList.length)];
      },Math.random()*50+51);
      // Stop random
      setTimeout(()=>{
        // Stop random
        clearInterval(randomVerb);
      },2500);
      // Stop sound
      setTimeout(()=>{
        // Stop sound
        this.randomInProgress = false;
      },4000);
    }
  }
}
</script>
