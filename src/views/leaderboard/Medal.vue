<template>
  <v-row>
    <v-col cols="12">
      <h2 class="d-flex justify-center">{{ $t('leaderboard.medal.title', [100]) }}</h2>
    </v-col>
    <v-col cols="12" md="6" lg="6">
      <leaderboard-player v-bind:leaderboard=leaderboardPlayer></leaderboard-player>
    </v-col>
    <v-col cols="12" md="6" lg="6">
      <leaderboard-team
          v-bind:leaderboard=leaderboardTeam
          callback="/api/players/ranking-medal?idTeam=">
      </leaderboard-team>
    </v-col>
  </v-row>
</template>

<script>
import LeaderboardPlayer from '@/components/vgr/player/leaderboard/Medal.vue';
import LeaderboardTeam from '@/components/vgr/team/leaderboard/Medal.vue';

export default {
  name: 'LeaderboardMedal',
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
    document.title = this.$t('leaderboard.medal.title', [100]) + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.axios.get('/api/players/ranking-medal?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardPlayer = response.data['hydra:member']
        })
    this.axios.get('/api/teams/ranking-medal?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardTeam = response.data['hydra:member']
        })
  },
};
</script>
