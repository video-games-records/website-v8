<template>
  <div>
    <h1>{{ $t('history.title') }}</h1>
    <v-progress-linear v-if="playerGames.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
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
      <tr v-for="playerGame in playerGames" :data-position="playerGame.position" :key="playerGame.id">
        <td class="hidden-md-and-down">
          <game-picture :game="playerGame.game"/>
        </td>
        <td class="pr-3">
          <game :game="playerGame.game">{{ game.name }}</game>
        </td>
        <td class="pr-3">
          <tools-date v-bind:date="playerGame.lastUpdate"
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
      playerGames: []
    };
  },
  created() {
    document.title = this.$t('history.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.axios.get('/api/player_games?pagination=1&order[lastUpdate]=DESC&groups[]=playerGame.game' +
        '&groups[]=game.read.mini&groups[]=playerGame.lastUpdate' +
        '&player=' + this.getAuthenticatedPlayer.id, {enableCache: true})
        .then(response => {
          this.playerGames = response.data['hydra:member']
        })
  },
}
</script>
