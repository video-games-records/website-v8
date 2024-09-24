<template>
  <v-card variant="outlined">
    <v-card-title class="bg-primary">
      <router-link :to="{ name: 'LeaderboardPointGame' }">{{ $t('leaderboard.gamePoints.captionTeam') }}</router-link>
    </v-card-title>
    <v-progress-linear v-if="leaderboard.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.team') }}</th>
        <th class="right" scope="col">{{ $t('global.gamePoints') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id">
        <td class="pa-1">
          <team v-bind:team="item"></team>
        </td>
        <td class="pr-3 right">{{ number(item.pointGame) }}</td>
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
    this.axios.get('/api/teams/ranking-point-game?maxTank=5', {enableCache: true})
        .then(response => {
          this.leaderboard = response.data['hydra:member']
        })
  }
};
</script>
