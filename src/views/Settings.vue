<template>
  <v-layout row>
    <v-flex xs12>
      <v-list two-line>
        <v-list-tile @click="0">
          <v-list-tile-action>
            <v-checkbox v-model="$root.$children[0].playSound"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content @click="$root.$children[0].playSound = !$root.$children[0].playSound">
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
  name: 'settings'
}
</script>
