<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.gamePoints.caption') }}</v-card-title>
    <v-progress-linear v-if="leaderboard.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table density="compact">
      <thead>
        <tr>
          <th scope="col">{{ $t('global.member') }}</th>
          <th class="right" scope="col">{{ $t('global.gamePoints') }}</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id">
            <td class="pa-0">
              <player v-bind:player="item"></player>
            </td>
            <td class="pr-3 right">{{ number(item.pointGame) }}</td>
          </tr>
        </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue'
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'LeaderboardPoint',
  components: {
    'player': Player,
  },
  data() {
    return {
      leaderboard: [],
    };
  },
  created() {
    this.axios.get('/api/players/ranking-point-game?maxTank=5', {useCache: true})
      .then(response => {
        this.leaderboard = response.data['hydra:member']
      })
  }
};
</script>
