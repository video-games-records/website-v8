<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon :disabled=false variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Video Games Records</v-app-bar-title>

      <app-bar />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" app>
      <navigation />
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center ma-5" style="min-height: 300px;">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import AppBar from "@/components/security/AppBar.vue";
import Navigation from "@/components/Navigation.vue";
export default {
  components: {AppBar, Navigation},
  data: () => ({
    drawer: true,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
