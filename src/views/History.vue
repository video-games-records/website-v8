<template>
  <div>
    <h1>{{ $t('history.title') }}</h1>
    <v-progress-linear v-if="games.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table density="compact">
      <caption class="screen-reader-text">{{ $t('score.lastSubmit.default') }}</caption>
      <thead>
      <tr>
        <th scope="col" class="hidden-md-and-down"></th>
        <th scope="col">{{ $t('global.game') }}</th>
        <th scope="col">{{ $t('score.lastUpdate') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in games" :data-position="game.position" :key="game.id">
        <td class="hidden-md-and-down">
          <game-picture :game="game"/>
        </td>
        <td class="pr-3">
          <game :game="game">{{ game.name }}</game>
        </td>
        <td class="pr-3">
          <tools-date v-bind:date="game.lastUpdate"
                      v-bind:options="{ year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></tools-date>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>

import Security from "@/mixins/Security.vue";
import Game from "@/components/vgr/game/Game.vue";
import GamePicture from "@/components/vgr/game/Picture.vue";
import ToolsDate from "@/components/tools/Date.vue";

export default {
  mixins: [Security],
  name: 'history',
  components: {
    ToolsDate, Game, GamePicture
  },
  data() {
    return {
      games: []
    };
  },
  created() {
    document.title = this.$t('history.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.axios.get('/api/games?pagination=1&order[lastUpdate]=DESC&groups[]=game.read' +
        '&groups[]=lastScore.read&groups[]=playerChart.read' +
        '&playerGame.player=' + this.getAuthenticatedPlayer.id, {useCache: true})
        .then(response => {
          this.games = response.data['hydra:member']
        })
  },
}
</script>
