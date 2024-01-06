<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.gamePoints.captionTeam') }}</v-card-title>
    <v-table density="compact">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.team') }}</th>
        <th scope="col">{{ $t('global.gamePoints') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id">
        <td v-if="item.team">
          <team v-bind:team="item.team"></team>
        </td>
        <td v-else>
          <team v-bind:team="item"></team>
        </td>
        <td :data-header="$t('global.gamePoints')">{{ number(item.pointGame) }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Team from '@/components/vgr/team/Team.vue';
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'LeaderboardPoint',
  components: {
    'Team': Team,
  },
  data() {
    return {
      leaderboard: []
    };
  },
  created() {
    this.axios.get('/api/teams/ranking-point-game?maxTank=5', {useCache: true})
        .then(response => {
          this.leaderboard = response.data['hydra:member']
        })
  }
};
</script>
