<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      <h2 class="d-flex justify-center">{{ $t('leaderboard.gamePoints.title', [100]) }}</h2>
    </v-col>
    <v-col cols="12" class="px-5">
      <p>{{ $t('leaderboard.gamePoints.help') }}</p>
    </v-col>
    <v-col cols="12" md="6" lg="6" class="pa-1">
      <leaderboard-player v-bind:leaderboard=leaderboardPlayer></leaderboard-player>
    </v-col>
    <v-col cols="12" md="6" lg="6" class="pa-1">
      <leaderboard-team
          v-bind:leaderboard=leaderboardTeam
          callback="/api/players/ranking-point-game?idTeam=">
      </leaderboard-team>
    </v-col>
  </v-row>
</template>

<script>
import LeaderboardPlayer from '@/components/vgr/player/leaderboard/PointGame';
import LeaderboardTeam from '@/components/vgr/team/leaderboard/PointGame';

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
    this.axios.get('/api/players/ranking-point-game?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardPlayer = response.data['hydra:member']
        })
    this.axios.get('/api/teams/ranking-point-game?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardTeam = response.data['hydra:member']
        })
  },
};
</script>
