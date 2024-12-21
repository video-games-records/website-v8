<template xmlns="http://www.w3.org/1999/html">
  <div class="pa-0">
    <v-row>
      <v-col v-if="!this.$vuetify.display.mobile" cols="12">
        <breadcrumb />
      </v-col>
      <v-col v-if="getGame.isRank === false" cols="12">
        <v-alert :text="$t('game.unranked')" title="Infos" type="info" variant="tonal"></v-alert>
      </v-col>
      <v-col cols="12" order="2" lg="9" order-lg="1">
        <game-card :game="getGame" />
        <router-view />
        <br>
        <game-forum-link v-if="this.$vuetify.display.mobile" :game="getGame" />
        <game-rules-link v-if="this.$vuetify.display.mobile" :game="getGame" />
        <game-serie-link v-if="this.$vuetify.display.mobile" :game="getGame" />
        <template v-if="this.$vuetify.display.mobile">
          <br>
          <Adsense
            data-ad-client="ca-pub-1465216138455560"
            data-ad-slot="1120943067">
          </Adsense>
        </template>
      </v-col>
      <v-col cols="12" order="1" lg="3" order-lg="2">
        <game-aside />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GameCard from '@/components/vgr/game/Card.vue';
import GameAside from '@/components/vgr/game/Aside.vue';
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import Breadcrumb from "@/components/base/Breadcrumb.vue";
import WatchLanguage from "@/mixins/WatchLanguage.vue";
import GameForumLink from "@/components/vgr/game/GameForumLink.vue";
import GameRulesLink from "@/components/vgr/game/GameRulesLink.vue";
import GameSerieLink from "@/components/vgr/game/GameSerieLink.vue";

export default {
  mixins: [WatchLanguage],
  name: 'GameMain',
  components: {GameSerieLink, GameRulesLink, GameForumLink, Breadcrumb, GameCard, GameAside},
  data() {
    return {};
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
  },
  watch: {
    '$route.params.idGame' () {
      this.load();
      useBreadcrumbsStore().setLevel(1);
    },
  },
  created() {
    useBreadcrumbsStore().setLevel(1);
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/games/' + this.$route.params.idGame)
          .then(response => {
            if (response.data.status !== this.$GAME_STATUS_ACTIVE) {
              this.$router.push({name: 'not-found'});
            }
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
