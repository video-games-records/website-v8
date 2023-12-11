<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon :disabled=false variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Video Games Records</v-app-bar-title>

      <login v-if="!this.isAuthenticated" />
      <logout v-if="this.isAuthenticated" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" app>
      <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="List Item 1"></v-list-item>
      <v-list-item link title="List Item 2"></v-list-item>
      <v-list-item link title="List Item 3"></v-list-item>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import Login from "@/components/security/Login.vue";
import Logout from "@/components/security/Logout.vue";
import Security from "@/mixins/Security.vue";
export default {
  components: {Login, Logout},
  mixins: [Security],
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
