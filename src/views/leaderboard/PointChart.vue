<template>
  <v-row>
    <v-col cols="12">
      <h2 class="d-flex justify-center">{{ $t('leaderboard.recordPoints.title', [100]) }}</h2>

      <p>{{ $t('leaderboard.recordPoints.help') }}</p>
    </v-col>
    <v-col cols="12" md="6" lg="6">
      <leaderboard-player v-bind:leaderboard=leaderboardPlayer></leaderboard-player>
    </v-col>
    <v-col cols="12" md="6" lg="6">
      <leaderboard-team
          v-bind:leaderboard=leaderboardTeam
          callback="/api/players/ranking-point-chart?idTeam=">
      </leaderboard-team>
    </v-col>
  </v-row>
</template>

<script>
import LeaderboardPlayer from '@/components/vgr/player/leaderboard/PointChart';
import LeaderboardTeam from '@/components/vgr/team/leaderboard/PointChart';

export default {
  name: 'LeaderboardPointGame',
  components: {
    'leaderboard-player': LeaderboardPlayer,
    'leaderboard-team': LeaderboardTeam,
  },
  data() {
    return {
      leaderboardPlayer: [],
      leaderboardTeam: [],
    };
  },
  created() {
    document.title = this.$t('leaderboard.gamePoints.title', [100]) + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.axios.get('/api/players/ranking-point-chart?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardPlayer = response.data['hydra:member']
        })
    this.axios.get('/api/teams/ranking-point-chart?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardTeam = response.data['hydra:member']
        })
  },
};
</script>
