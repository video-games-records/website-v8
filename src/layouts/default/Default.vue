<template>
  <v-layout class="rounded rounded-md">

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
          <v-sheet :class="this.$vuetify.display.mobile ? 'ma-1' : 'ma-5'">
            <router-view />
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-footer class="bg-grey-lighten-1">
          <v-row justify="center" no-gutters>
            <v-btn
                v-for="link in links"
                :key="link"
                color="white"
                variant="text"
                class="mx-2"
                rounded="xl"
            >
              {{ link }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12">
              &copy; 2003-{{ new Date().getFullYear() }} — <strong>Video Games Records</strong>
            </v-col>
          </v-row>
        </v-footer>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
  <flash-message />
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import FlashMessage from "@/components/base/FlashMessage.vue";
export default {
  components: {FlashMessage, Navigation},
  data: () => ({
    drawer: true,
    group: null,
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
  }),
  created() {
    if (this.$vuetify.display.mobile) {
      this.drawer = false;
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
