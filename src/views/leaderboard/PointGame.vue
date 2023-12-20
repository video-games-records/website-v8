<template>
    <v-row>
      <v-col cols="12">
        <h2 class="d-flex justify-center">{{ $t('leaderboard.gamePoints.title', [100]) }}</h2>

        <p>{{ $t('leaderboard.gamePoints.help') }}</p>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <leaderboard-player v-bind:leaderboard=leaderboardPlayer></leaderboard-player>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <leaderboard-team v-bind:leaderboard=leaderboardTeam></leaderboard-team>
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
    this.axios.get('/api/players/ranking-point-game?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardPlayer = response.data['hydra:member']
        })
    this.axios.get('/api/teams/ranking-point-game?maxRank=100', {useCache: true})
        .then(response => {
          this.leaderboardTeam = response.data['hydra:member']
        })
  },
  computed: {
    title() {
      //return this.$i18n.t('leaderboard.gamePoints.title', [100]) + ' - ' + process.env.VUE_APP_TITLE;
    },
  },
  watch: {
    getLanguage() {
      this.loadData();
    },
  },
  methods: {
    loadData() {
      /*this.setBreadcrumbOnlyItem1(
          {text: this.$i18n.t('leaderboard.gamePoints.title', [100])}
      );*/
    },
  },
};
</script>
