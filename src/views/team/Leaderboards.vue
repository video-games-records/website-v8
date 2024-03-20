<template>
  <div>
    <h3 class="ma-2">{{ $t('leaderboard.recordPoints.title', [5]) }}</h3>
    <leaderboard-player-point-chart v-bind:leaderboard=leaderboardPointChart></leaderboard-player-point-chart>

    <h3 class="ma-2">{{ $t('leaderboard.gamePoints.title', [5]) }}</h3>
    <leaderboard-player-point-game v-bind:leaderboard=leaderboardPointGame></leaderboard-player-point-game>

    <h3 class="ma-2">{{ $t('leaderboard.medal.title', [5]) }}</h3>
    <leaderboard-player-medal v-bind:leaderboard=leaderboardMedal></leaderboard-player-medal>

    <h3 class="ma-2">{{ $t('leaderboard.cup.title', [5]) }}</h3>
    <leaderboard-player-cup v-bind:leaderboard=leaderboardCup></leaderboard-player-cup>

    <h3 class="ma-2">{{ $t('leaderboard.proofs.title', [5]) }}</h3>
    <leaderboard-player-proof v-bind:leaderboard=leaderboardProof></leaderboard-player-proof>

    <h3 class="ma-2">{{ $t('leaderboard.badges.title', [5]) }}</h3>
    <leaderboard-player-badge v-bind:leaderboard=leaderboardBadge></leaderboard-player-badge>
  </div>
</template>

<script>
import LeaderboardPlayerPointChart from '@/components/vgr/player/leaderboard/PointChart';
import LeaderboardPlayerPointGame from '@/components/vgr/player/leaderboard/PointGame';
import LeaderboardPlayerMedal from '@/components/vgr/player/leaderboard/Medal';
import LeaderboardPlayerCup from '@/components/vgr/player/leaderboard/Cup';
import LeaderboardPlayerProof from '@/components/vgr/player/leaderboard/Proof';
import LeaderboardPlayerBadge from '@/components/vgr/player/leaderboard/Badge';

export default {
  name: 'TeamLeaderBoards',
  components: {
    LeaderboardPlayerPointChart,
    LeaderboardPlayerPointGame,
    LeaderboardPlayerMedal,
    LeaderboardPlayerCup,
    LeaderboardPlayerProof,
    LeaderboardPlayerBadge
  },
  data() {
    return {
      leaderboardPointChart: [],
      leaderboardPointGame: [],
      leaderboardMedal:[],
      leaderboardCup: [],
      leaderboardProof: [],
      leaderboardBadge: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/players/ranking-point-chart?limit=5&idTeam=' + this.$route.params.idTeam)
          .then(response => {
            this.leaderboardPointChart = response.data['hydra:member'];
          });
      this.axios.get('/api/players/ranking-point-game?limit=5&idTeam=' + this.$route.params.idTeam)
          .then(response => {
            this.leaderboardPointGame = response.data['hydra:member'];
          });
      this.axios.get('/api/players/ranking-medal?limit=5&idTeam=' + this.$route.params.idTeam)
          .then(response => {
            this.leaderboardMedal = response.data['hydra:member'];
          });
      this.axios.get('/api/players/ranking-ranking-cup?limit=5&idTeam=' + this.$route.params.idTeam)
          .then(response => {
            this.leaderboardCup= response.data['hydra:member'];
          });
      this.axios.get('/api/players/ranking-proof?limit=5&idTeam=' + this.$route.params.idTeam)
          .then(response => {
            this.leaderboardProof = response.data['hydra:member'];
          });
      this.axios.get('/api/players/ranking-badge?limit=5&idTeam=' + this.$route.params.idTeam)
          .then(response => {
            this.leaderboardBadge = response.data['hydra:member'];
          })
    }
  }
};
</script>
