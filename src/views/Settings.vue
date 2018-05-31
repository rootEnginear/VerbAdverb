<template>
  <v-layout row>
    <v-flex xs12>
      <v-list two-line>

        <v-list-tile @click="toggleSound">
          <v-list-tile-action>
            <v-checkbox :input-value="playSound"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('settings.soundTitle')}}</v-list-tile-title>
            <v-list-tile-sub-title>{{$t('settings.soundDesc')}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile avatar :to="{path: '/settings/words'}">
          <v-list-tile-content>
            <v-list-tile-title>{{$t('settings.wordTitle')}}</v-list-tile-title>
            <v-list-tile-sub-title>{{$t('settings.wordDesc')}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile avatar :to="{path: '/settings/language'}">
          <v-list-tile-content>
            <v-list-tile-title>{{$t('settings.langTitle')}}</v-list-tile-title>
            <v-list-tile-sub-title>{{$t('settings.langDesc')}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="resetDialog = true">
          <v-list-tile-content>
            <v-list-tile-title>{{$t('settings.resetTitle')}}</v-list-tile-title>
            <v-list-tile-sub-title>{{$t('settings.resetDesc')}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-flex>

    <!-- Restore Dialog -->
    <v-dialog v-model="resetDialog" persistent width="80%">
      <v-card>
        <v-toolbar color="red" dark>
          <v-toolbar-title>{{$t('reset.title')}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div v-html="$t('reset.content')"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="ิblack" flat @click.native="resetDialog = false">{{$t('reset.discard')}}</v-btn>
          <v-btn color="red" flat @click.native="factoryReset()">{{$t('reset.agree')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'settings',
  data(){
    return {
      resetDialog: false
    }
  },
  computed: {
    playSound() {
      return this.$store.state.playSound;
    }
  },
  methods: {
    toggleSound(){
      this.$store.commit('editState',[{name: 'playSound',value: !this.playSound}]);
      this.$store.commit('saveToLocal');
    },
    factoryReset(){
      this.resetDialog = false;
      let lang = (window.navigator.userLanguage || window.navigator.languages).includes("th") ? 'th' : 'en';
      this.$i18n.set(lang);
      this.$store.commit('editState',[{name: 'locale',value: lang}]);

      this.$store.commit('saveToLocal', { reset: true, onlyword: false });
      this.$store.dispatch('loadFromLocal');
    }
  }
}
</script>
