<template>
  <div>
    <v-tabs v-model="tab" class="bg-primary">
      <v-tab value="games">{{ $t('global.games') }}</v-tab>
      <v-tab value="players">{{ $t('global.players') }}</v-tab>
      <v-tab value="teams">{{ $t('global.teams') }}</v-tab>
      <v-tab value="topics">{{ $t('global.topics') }}</v-tab>
    </v-tabs>

    <v-card-text class="pa-0">
      <v-window v-model="tab">
        <v-window-item value="games">
          <game-search-result v-bind:callback=getCallBackGame />
        </v-window-item>

        <v-window-item value="players">
          <player-search-result v-bind:callback=getCallBackPlayer />
        </v-window-item>

        <v-window-item value="teams">
          <team-search-result v-bind:callback=getCallBackTeam />
        </v-window-item>

        <v-window-item value="topics">
          <topic-search-result v-bind:callback=getCallBackTopic />
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>

<script>
import TeamSearchResult from "@/components/vgr/team/SearchResult.vue";
import PlayerSearchResult from "@/components/vgr/player/SearchResult.vue";
import GameSearchResult from "@/components/vgr/game/SearchResult.vue";
import TopicSearchResult from "@/components/forum/topic/SearchResult.vue";

export default {
  name: 'search',
  components: {
    GameSearchResult,
    PlayerSearchResult,
    TeamSearchResult,
    TopicSearchResult
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
      return '/api/games?itemsPerPage=100&status' + this.$GAME_STATUS_ACTIVE + '&groups[]=game.list&groups[]=game.platforms' +
          '&groups[]=platform.read&' + this.getLibGame + '=' + this.term + '&order[' + this.getLibGame + ']=ASC';
    },
    getCallBackPlayer() {
      return '/api/players?itemsPerPage=100&user.enabled=1&groups[]=player.read&groups[]=player.pointChart' +
          '&groups[]=player.medal&groups[]=player.country&groups[]=country.read&pseudo=' + this.term + '&order[pseudo]=ASC';
    },
    getCallBackTeam() {
      return '/api/teams?itemsPerPage=100&groups[]=team.read&groups[]=team.rank.pointChart' +
          '&groups[]=team.rank.medal&libTeam=' + this.term + '&order[libTeam]=ASC';
    },
    getCallBackTopic() {
      return '/api/forum_topics?itemsPerPage=100&libTopic=' + this.term;
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
  },

  watch: {
    '$route'() {
      this.term = this.$route.query.term;
    }
  },
}
</script>
