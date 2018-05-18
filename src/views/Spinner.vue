<template>
  <v-layout align-center justify-center>
    <div @click="spin" id="compass"><v-icon>keyboard_backspace</v-icon></div>
  </v-layout>
</template>

<script>
export default {
  name: 'spinner',
  methods: {
    spin(){
      document.getElementById("compass").style.transform = `rotate(${Math.random()*360*16}deg)`;
    }
  },
  mounted(){
    setTimeout(this.spin,1);
  }
}
</script>

<style lang="scss" scoped>
#compass{
  cursor: pointer;
  background-color: #ffeb3b;
  border-radius: 50%;
  width: 80vw;
  height: 80vw;
  text-align: center;
  transition: transform 2.5s ease-out;
  
  i {
    line-height: 80vw;
    font-size: 70vw;
    color: #212121;
  }
}

@media (orientation: landscape) {
  #compass {
    width: 60vh;
    height: 60vh;

    i {
      line-height: 60vh;
      font-size: 50vh;
    }
  }
}
</style>

