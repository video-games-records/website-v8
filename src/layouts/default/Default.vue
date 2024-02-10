<template>
  <v-app id="app" :full-height="true">
    <v-app-bar app color="primary" elevate-on-scroll>
      <v-app-bar-nav-icon :disabled=false variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <router-link v-bind:to="{name:'Home'}">VGR</router-link>
      </v-app-bar-title>

      <app-bar/>
    </v-app-bar>



    <v-navigation-drawer v-model="drawer" location="left">
      <navigation/>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center" style="min-height: 300px;">
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
            <router-view/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-main>

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


  </v-app>
  <flash-message/>
</template>

<script>
import AppBar from "@/components/security/AppBar.vue";
import Navigation from "@/components/Navigation.vue";
import FlashMessage from "@/components/base/FlashMessage.vue";

export default {
  components: {FlashMessage, AppBar, Navigation},
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
