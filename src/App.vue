<template>
  <v-app>
    <!-- Aside -->
    <v-navigation-drawer v-model="drawer" temporary absolute>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              {{ $t('appname') }}
              <!-- VerbAdverb -->
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
            <v-list-tile-title>{{$t('menu.about')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Nav -->
    <v-toolbar fixed color="yellow" app>
      <!-- Icon -->
      <v-toolbar-side-icon aria-label="open menu" v-if="!this.$route.path.includes('settings/')" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn v-else icon active-class :to="{path: '/settings'}">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <!-- Name -->
      <v-toolbar-title>{{$t('routes')[+this.$route.name]}}</v-toolbar-title>

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
        <v-toolbar color="yellow">
          <v-toolbar-title>{{$t('about.title')}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="text-xs-center">
          <div v-html="$t('about.content')"></div>
          <small>Copyright &copy; <span id="year">2018</span> Suthep Chanchuphol. All right reserved.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="aboutDialog = false">{{$t('about.close')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Restore Dialog -->
    <v-dialog v-model="restoreDialog" persistent width="80%">
      <v-card>
        <v-toolbar color="red" dark>
          <v-toolbar-title>{{$t('restore.title')}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div v-html="$t('restore.content')"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="ิblack" flat @click.native="restoreDialog = false">{{$t('restore.discard')}}</v-btn>
          <v-btn color="red" flat @click.native="resetWords()">{{$t('restore.agree')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      drawer: false,
      restoreDialog: false,
      aboutDialog: false
    }
  },
  created() {
    this.loadFromLocal();
  },
  computed: {
    items(){
      return [
        {
          icon: "games",
          title: this.$t('menu.play'),
          action: {path: "/"}
        },
        {
          icon: "refresh",
          title: this.$t('menu.spinner'),
          action: {path: "/spinner"}
        },
        {
          icon: "settings",
          title: this.$t('menu.settings'),
          action: {path: "/settings"}
        }
      ]
    } 
  },
  methods: {
    saveToLocal(reset=false,onlyword=false){
      this.$store.commit('saveToLocal',{reset,onlyword});
    },
    loadFromLocal(){
      this.$store.dispatch('loadFromLocal');
    },
    resetWords(){
      this.restoreDialog = false;
      this.$store.dispatch('resetWords');
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
