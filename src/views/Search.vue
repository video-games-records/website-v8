<template>
  <v-sheet>
    <v-tabs v-model="tab" class="bg-primary">
      <v-tab value="games">{{ $t('global.games') }}</v-tab>
      <v-tab value="players">{{ $t('global.players') }}</v-tab>
    </v-tabs>

    <v-card-text class="pa-0">
      <v-window v-model="tab">
        <v-window-item value="games">
          <game-list v-bind:callback=getCallBackGame :display-nb="true" v-bind:display-charts="false"
                    v-bind:display-posts="false" v-bind:display-players="false" v-bind:active-order-by="false" />
        </v-window-item>

        <v-window-item value="players">
          <player-list v-bind:callback=getCallBackPlayer />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-sheet>
</template>

<script>
import GameList from '@/components/vgr/game/List.vue';
import PlayerList from '@/components/vgr/player/List.vue';

export default {
  name: 'search',
  components: {
    GameList, PlayerList
  },
  data() {
    return {
      tab: null,
      term: this.$route.query.term,
      games: null,
    };
  },
  computed: {
    getCallBackGame() {
      return '/api/games?pagination=false&status' + this.$GAME_STATUS_ACTIVE + '&groups[]=game.list&groups[]=game.platforms' +
          '&groups[]=platform.read&' + this.getLibGame + '=' + this.term + '&order[' + this.getLibGame + ']=ASC';
    },
    getCallBackPlayer() {
      return '/api/players?pagination=false&user.enabled1&groups[]=player.read&groups[]=player.pointChart' +
          '&groups[]=player.medal&groups[]=player.country&groups[]=country.read&pseudo=' + this.term + '&order[pseudo]=ASC';
    },
    getLibGame() {
      if (localStorage.lang === 'fr') {
        return 'libGameFr';
      }
      return 'libGameEn';
    },
  },
  created() {
    document.title = this.$t('search.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.search();
  },

  watch: {
    '$route'() {
      this.term = this.$route.query.term;
      this.search();
    }
  },
  methods: {
    search() {


    },
  },
}
</script>
