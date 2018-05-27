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
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'settings',
  computed: {
    playSound() {
      return this.$store.state.playSound;
    }
  },
  methods: {
    toggleSound(){
      // this.$root.$children[0].playSound = !this.$root.$children[0].playSound;
      this.$store.commit('editState',[{name: 'playSound',value: !this.playSound}]);
      // this.$root.$children[0].saveToLocal();
      this.$store.commit('saveToLocal');
    }
  }
}
</script>
