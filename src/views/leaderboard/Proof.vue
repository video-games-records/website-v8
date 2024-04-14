<template>
  <v-row>
    <v-col cols="12">
      <h2 class="d-flex justify-center">{{ $t('leaderboard.proofs.title', [100]) }}</h2>
    </v-col>
    <v-col cols="12">
      <leaderboard-player v-bind:leaderboard=leaderboardPlayer></leaderboard-player>
    </v-col>
  </v-row>
</template>

<script>

import LeaderboardPlayer from '@/components/vgr/player/leaderboard/Proof';

export default {
  name: 'LeaderboardProof',
  components: { LeaderboardPlayer},
  data() {
    return {
      leaderboardPlayer: []
    }
  },
  created() {
    document.title = this.$t('leaderboard.proofs.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.axios.get('/api/players/ranking-proof?maxRank=100', {enableCache: true})
        .then(response => {
          this.leaderboardPlayer = response.data['hydra:member']
        })
  },
};
</script>
