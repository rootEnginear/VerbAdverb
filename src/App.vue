<template>
  <v-app>
    <!-- Aside -->
    <v-navigation-drawer v-model="drawer" temporary absolute>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              VerbAdverb
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-0" dense>
        <v-list-tile active-class="yellow" v-for="item in items" :key="item.title" :to="item.action">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="yellow" @click="aboutDialog = true; drawer = false">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>เกี่ยวกับ "VerbAdverb"</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Nav -->
    <v-toolbar fixed color="yellow" app>
      <!-- Icon -->
      <v-toolbar-side-icon aria-label="open menu" v-if="this.$route.path != '/settings/words'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn v-else icon active-class :to="{path: '/settings'}">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- Name -->
      <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-btn v-if="this.$route.path == '/settings/words'" icon @click="restoreDialog = true">
        <v-icon>restore</v-icon>
      </v-btn>
      
    </v-toolbar>

    <!-- Content -->
    <v-content>
      <v-container class="pa-0" fluid fill-height>
        <router-view />
      </v-container>
    </v-content>

    <!-- About Dialog -->
    <v-dialog v-model="aboutDialog" width="80%">
      <v-card>
        <v-card-title class="headline">เกี่ยวกับ "VerbAdverb"</v-card-title>
        <v-card-text class="text-xs-center">
          VerbAdverb คือเกมสันทนาการหนึ่งที่ให้ผู้เล่นทำท่าตามที่จับฉลาดได้ ที่ทำก็ไม่มีหรอกอะไรขี้เกียจทำฉลาก<br>
          <i>เจอบัคไม่ต้องติดต่อมาหรอกไม่ทำแล้วค่ะ</i><br>
          เหงาโสดทักมา: <a style="color:black" target="_blank" href="mailto:moo_suthep@hotmail.com">@rootEnginear</a><br>
          <small>Copyright &copy; <span id="year">2018</span> Suthep Chanchuphol. All right reserved.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="yellow" @click.native="aboutDialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Restore Dialog -->
    <v-dialog v-model="restoreDialog" persistent width="80%">
      <v-card>
        <v-card-title class="headline">ต้องการรีเซ็ตคำหรือไม่?</v-card-title>
        <v-card-text>คำต่างๆ ที่คุณได้เพิ่มเข้าไปทีหลังจะ<span class="red--text">ถูกลบ</span>และรีเซ็ตเป็นคำเดิมเหมือนตอนแรก (ยังสามารถเพิ่มเข้าไปใหม่ได้อีกหลังรีเซ็ต)</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="ิblack" flat @click.native="restoreDialog = false">ยกเลิก</v-btn>
          <v-btn color="red" flat @click.native="resetWords()">รีเซ็ต</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// const STORAGE_NAME = 'verbadverb'

export default {
  name: 'app',
  data() {
    return {
      // verbList: ["นั่ง","นอน","กิน","ขี้","เดิน","วิ่ง","เลื้อย","เต้น","คลาน","ท่องสูตรคูณ","ปวดฟัน","ปวดท้อง","หัวเราะ","ยืน","โพสท่า"],
      // adverbList: ["แบบสวยๆ","แบบจริงจัง","อย่างเมามัน","แบบช้าๆ","ด้วยความรำคาญ","แบบนางสาวไทย","อย่างบ้าคลั่ง","แบบตื่นเต้นสุดๆ","เหมือนอยู่บนสาย 8","แบบโรคจิต"],
      // playSound: true,
      drawer: false,
      items: [
        {
          icon: "games",
          title: "เล่น",
          action: {path: "/"}
        },
        {
          icon: "refresh",
          title: "สปินเนอร์",
          action: {path: "/spinner"}
        },
        {
          icon: "settings",
          title: "ตั้งค่า",
          action: {path: "/settings"}
        }
      ],
      restoreDialog: false,
      aboutDialog: false
    }
  },
  created() {
    this.loadFromLocal();
  },
  methods: {
    saveToLocal(reset=false,onlyword=false){
      this.$store.commit('saveToLocal',{reset,onlyword});
      // if(reset){
      //   let data = [["นั่ง","นอน","กิน","ขี้","เดิน","วิ่ง","เลื้อย","เต้น","คลาน","ท่องสูตรคูณ","ปวดฟัน","ปวดท้อง","หัวเราะ","ยืน","โพสท่า"],["แบบสวยๆ","แบบจริงจัง","อย่างเมามัน","แบบช้าๆ","ด้วยความรำคาญ","แบบนางสาวไทย","อย่างบ้าคลั่ง","แบบตื่นเต้นสุดๆ","เหมือนอยู่บนสาย 8","แบบโรคจิต"],true];
      //   if(onlyword){
      //     data = [["นั่ง","นอน","กิน","ขี้","เดิน","วิ่ง","เลื้อย","เต้น","คลาน","ท่องสูตรคูณ","ปวดฟัน","ปวดท้อง","หัวเราะ","ยืน","โพสท่า"],["แบบสวยๆ","แบบจริงจัง","อย่างเมามัน","แบบช้าๆ","ด้วยความรำคาญ","แบบนางสาวไทย","อย่างบ้าคลั่ง","แบบตื่นเต้นสุดๆ","เหมือนอยู่บนสาย 8","แบบโรคจิต"],this.playSound];
      //   }
      //   localStorage.setItem(STORAGE_NAME,JSON.stringify(data));
      // }else{
      //   localStorage.setItem(STORAGE_NAME,JSON.stringify([this.verbList,this.adverbList,this.playSound]));
      // }
    },
    loadFromLocal(){
      this.$store.dispatch('loadFromLocal');
    //   let data = JSON.parse(localStorage.getItem(STORAGE_NAME)) || "";
    //   if(data === ""){
    //     this.saveToLocal(true);
    //   }else{
    //     this.verbList = data[0];
    //     this.adverbList = data[1];
    //     this.playSound = data[2];
    //   }
    },
    resetWords(){
      this.restoreDialog = false;
      this.$store.dispatch('resetWords');
    //   this.saveToLocal(true,true);
    //   this.loadFromLocal();
    }
  },
  mounted(){
    setTimeout(()=>{
      document.getElementById("year").innerText = new Date().getFullYear();
    },1);
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');

@font-face {
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 400;
  src: local('Kanit Regular'), local('Kanit-Regular'), url(https://fonts.gstatic.com/s/kanit/v3/nKKZ-Go6G5tXcraBGwCYdA.woff2) format('woff2');
  unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
}

* {
  font-family: 'Kanit', sans-serif;
}

.application.theme--light{
  background-color: #fff !important;
}
</style>
