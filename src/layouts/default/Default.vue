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

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <v-row>
        <!--<v-col v-if="!this.$vuetify.display.mobile" cols="12">
          <div id="header" role="banner" class="site-header">
            <div class="site-header__logo">
              <a href="/fr/" class="router-link-exact-active router-link-active" aria-current="page">
                <img src="/img/logo.3122c306.svg" width="600" height="72" alt="Video Games Records">
              </a>
            </div>
          </div>
        </v-col>-->
        <v-col cols="12">
          <v-sheet class="ma-5">
            <router-view />
          </v-sheet>
        </v-col>
      </v-row>
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
