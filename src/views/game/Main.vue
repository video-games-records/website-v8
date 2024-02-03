<template>
  <v-sheet class="pa-0">
    <v-row>
      <v-col v-if="!this.$vuetify.display.mobile" cols="12">
        <breadcrumb />
      </v-col>
      <v-col cols="12" order="2" lg="9" order-lg="1">
        <game-card v-bind:game=getGame></game-card>
        <router-view></router-view>
      </v-col>
      <v-col cols="12" order="1" lg="3" order-lg="2">
        <game-aside />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import GameCard from '@/components/vgr/game/Card.vue';
import GameAside from '@/components/vgr/game/Aside.vue';
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import Breadcrumb from "@/components/base/Breadcrumb.vue";

export default {
  name: 'GameMain',
  components: {Breadcrumb, GameCard, GameAside},
  data() {
    return {};
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
  },
  created() {
    useBreadcrumbsStore().setLevel(1);
    this.load();
  },
  updated() {
    if (this.$route.name === 'GameIndex') {
      useBreadcrumbsStore().setLevel(1);
      if (this.getGame.id !== this.$route.params.idGame) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      this.axios.get('/api/games/' + this.$route.params.idGame)
          .then(response => {
            useAppStore().setGame(response.data);
            useBreadcrumbsStore().setItem1(
                { text: this.getGame.name, to: {name: 'GameIndex',params: { idGame: this.getGame.id, slugGame: this.getGame.slug }}}
            );
            document.title = this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    },
  },
};
</script>
