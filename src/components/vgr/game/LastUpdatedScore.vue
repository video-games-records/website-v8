<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('score.lastSubmit.default') }}</v-card-title>
    <v-table density="compact">
      <caption class="screen-reader-text">{{ $t('score.lastSubmit.default') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('global.game') }}</th>
        <th scope="col" class="hidden-sm-and-down">{{ $t('global.score') }}</th>
        <th scope="col" class="hidden-lg-and-down">{{ $t('score.lastUpdate') }}</th>
        <th scope="col">{{ $t('global.player') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in games" :data-position="game.position" :key="game.id">
        <td class="pr-3">
          <game :game="game">{{ game.name }}</game>
        </td>
        <td class="pr-3 hidden-sm-and-down">
          {{ game.lastScore.chart.name }}
        </td>
        <td class="pr-3 hidden-lg-and-down">
          <tools-date v-bind:date="game.lastUpdate"
                      v-bind:options="{ year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></tools-date>
        </td>
        <td class="pr-3">
          <player :player="game.lastScore.player">{{ game.lastScore.player.pseudo }}</player>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from "@/components/vgr/platform/List.vue";
import player from "@/components/vgr/player/Player.vue";
import status from "@/components/vgr/playerChart/Status.vue";
import chart from "@/components/vgr/chart/Chart.vue";
import ToolsDate from '@/components/tools/Date.vue';
import Game from "@/components/vgr/game/Game.vue";


export default {
  name: 'GameLast',
  components: {
    Game,
    ToolsDate,
    chart, status, player,
    PlatformList,
    GamePicture
  },
  data() {
    return {
      games: []
    };
  },
  created() {
    this.axios.get('/api/games?pagination=1&order[lastUpdate]=DESC&groups[]=game.read' +
        '&groups[]=lastScore.read&groups[]=playerChart.read&groups[]=playerChart.player&groups[]=playerChart.chart' +
        '&groups[]=player.read.mini&groups[]=chart.read.mini&itemsPerPage=5', {useCache: true})
        .then(response => {
          this.games = response.data['hydra:member']
        })
  }
};
</script>


