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
      document.getElementById("compass").style.transform = `rotate(${Math.random()*360*24-(360*12)}deg)`;
    }
  },
  mounted(){
    setTimeout(()=>{
      document.getElementById("compass").style.transition = "transform 1s ease-out";
      document.getElementById("compass").style.transform = `rotate(${Math.random()*360*2-360}deg)`;
      setTimeout(()=>{
        document.getElementById("compass").style.transition = "transform 2.5s ease-out";
      },1000);
    },1);
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

  -webkit-box-shadow: 0 0 5px -3px rgba(0,0,0,.2), 0 0 10px 1px rgba(0,0,0,.14), 0 0 14px 2px rgba(0,0,0,.12);
  box-shadow: 0 0 5px -3px rgba(0,0,0,.2), 0 0 10px 1px rgba(0,0,0,.14), 0 0 14px 2px rgba(0,0,0,.12);
  
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

