<template>
  <v-layout row>
    <v-flex xs12>
      <v-list two-line>
        <v-list-tile @click="toggleSound">
          <v-list-tile-action>
            <v-checkbox :input-value="$root.$children[0].playSound"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>เสียงเอฟเฟค</v-list-tile-title>
            <v-list-tile-sub-title>เล่นเสียงเอฟเฟคทุกครั้งที่สุ่ม</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile avatar :to="{path: '/settings/words'}">
          <v-list-tile-content>
            <v-list-tile-title>รายการคำศัพท์</v-list-tile-title>
            <v-list-tile-sub-title>เพิ่ม/ลบคำศัพท์ในเกม</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'settings',
  methods: {
    toggleSound(){
      this.$root.$children[0].playSound = !this.$root.$children[0].playSound;
      this.$root.$children[0].saveToLocal();
    }
  }
}
</script>
