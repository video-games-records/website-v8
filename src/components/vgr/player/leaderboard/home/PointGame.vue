<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.gamePoints.caption') }}</v-card-title>
    <v-table density="compact">
      <thead>
        <tr>
          <th scope="col">{{ $t('global.member') }}</th>
          <th scope="col">{{ $t('global.gamePoints') }}</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id">
            <td>
              <player v-bind:player="item"></player>
            </td>
            <td :data-header="$t('global.gamePoints')" class="right">{{ number(item.pointGame) }}</td>
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
