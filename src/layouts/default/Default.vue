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


    <v-container class="fill-height" fluid>
      <v-responsive class="fill-height">
        <v-main>
          <router-view/>
        </v-main>
      </v-responsive>
    </v-container>



    <v-footer class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters>
        <ul class="d-flex" style="list-style-type: none">
          <li class="ma-2">
            <a href="https://video-games-records.myspreadshop.fr/" target="_blank">
              <svg width="24" height="24" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#shop" />
              </svg>
              <div class="hidden-md-and-down">{{ $t('aside.shop') }}</div>
            </a>
          </li>
          <li class="ma-2">
            <a href="https://discord.com/invite/nYsRzsZ" target="_blank">
              <svg width="24" height="24" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#social-discord" />
              </svg>
              <div class="hidden-md-and-down"><span class="screen-reader-text">VGR {{ $t('aside.on') }}</span> Discord</div>
            </a>
          </li>
          <li class="ma-2">
            <a href="https://www.twitch.tv/videogamesrecords/" target="_blank">
              <svg width="24" height="24" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#social-twitch" />
              </svg>
              <div class="hidden-md-and-down"><span class="screen-reader-text">VGR {{ $t('aside.on') }}</span> Twitch</div>
            </a>
          </li>
          <li class="ma-2">
            <a href="https://www.youtube.com/channel/UC_b4IOPqkN9uOsk-vktl8eA" target="_blank">
              <svg width="24" height="24" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#social-youtube" />
              </svg>
              <div class="hidden-md-and-down"><span class="screen-reader-text">VGR {{ $t('aside.on') }}</span> Youtube</div>
            </a>
          </li>
          <li class="ma-2">
            <a href="https://steamcommunity.com/groups/vgrr" target="_blank">
              <svg width="24" height="24" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#social-steam" />
              </svg>
              <div class="hidden-md-and-down"><span class="screen-reader-text">VGR {{ $t('aside.on') }}</span> Steam</div>
            </a>
          </li>
          <li class="ma-2">
            <a href="https://twitter.com/VGRecords" target="_blank">
              <svg width="24" height="24" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#social-twitter" />
              </svg>
              <div class="hidden-md-and-down"><span class="screen-reader-text">VGR {{ $t('aside.on') }}</span> Twitter</div>
            </a>
          </li>
          <li class="ma-2">
            <a href="https://www.linkedin.com/company/video-games-records/" target="_blank">
              <svg width="24" height="24" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#social-linkedin" />
              </svg>
              <div class="hidden-md-and-down"><span class="screen-reader-text">VGR {{ $t('aside.on') }}</span> LinkedIn</div>
            </a>
          </li>
        </ul>

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
