/* eslint-disable vue/valid-template-root */
<template>
  <div>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <the-layout-drawer-list />
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Vue Vuetify Admin</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import TheLayoutDrawerList from './TheNavigationList.vue'

export default {
  name: 'layoutNav',
  components: {
    TheLayoutDrawerList
  },
  data: () => ({
    drawer: false
  })
}
</script>
