<template>
  <v-layout row>
    <v-flex xs12>
      <v-list two-line>
        <v-radio-group :input-value="lang" mandatory>

          <v-list-tile @click="changeLang('th')">
            <v-list-tile-action>
              <v-radio value="th"></v-radio>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{$t('lang.th')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="changeLang('en')">
            <v-list-tile-action>
              <v-radio value="en"></v-radio>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{$t('lang.en')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        
        </v-radio-group>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'languages',
  computed: {
    lang() {
      return this.$store.state.locale;
    }
  },
  methods: {
    changeLang(lang = 'th'){
      this.$i18n.set(lang);
      this.$store.commit('editState',[{name:'locale',value:lang}]);
      this.$store.commit('saveToLocal');
    }
  }
}
</script>
