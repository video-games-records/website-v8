<template>
  <div>
    <h1 class="screen-reader-text">{{ getGame.name }}</h1>

    <div v-if="hasRolePlayer && getGame.id" class="d-flex justify-center ma-3">
      <v-btn >
        <router-link :to="{ name: 'GameSubmit', params: { idGame: getGame.id, slugGame: getGame.slug }}">
          {{ $t('group.updateScores') }}
        </router-link>
      </v-btn>
    </div>

    <table class="group-list">
      <caption class="screen-reader-text">{{ $t('global.charts') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('global.groups') }}</th>
        <th scope="col">{{ $t('global.charts') }}</th>
        <th scope="col">{{ $t('global.scores') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="group in groups" :key="group.id">
        <td>
          <group v-bind:group="group"></group>
        </td>
        <td :data-header="$t('global.charts')">{{ number(group.nbChart) }}</td>
        <td :data-header="$t('global.scores')">{{ number(group.nbPost) }}</td>
      </tr>
      </tbody>
    </table>

    <h2>{{ $t('global.rankings') }}</h2>

    <v-tabs v-model="tab" :direction="this.$vuetify.display.mobile ? 'vertical' : 'horizontal'" bg-color="primary">
      <v-tab value="leaderboard-player-point-chart">[{{ $t('global.player')}}] {{ $t('leaderboard.recordPoints.title') }}</v-tab>
      <v-tab value="leaderboard-player-medal">[{{ $t('global.player')}}] {{ $t('leaderboard.medal.title') }}</v-tab>
      <v-tab value="leaderboard-team-point-chart">[{{ $t('global.team')}}] {{ $t('leaderboard.recordPoints.title') }}</v-tab>
      <v-tab value="leaderboard-team-medal">[{{ $t('global.team')}}] {{ $t('leaderboard.medal.title') }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="leaderboard-player-point-chart">
         <leaderboard-player-point-chart v-bind:leaderboard=leaderboardPlayerPointChart></leaderboard-player-point-chart>
        </v-window-item>
        <v-window-item value="leaderboard-player-medal">
          <leaderboard-player-medal v-bind:leaderboard=leaderboardPlayerMedal></leaderboard-player-medal>
        </v-window-item>
        <v-window-item value="leaderboard-team-point-chart">
          <leaderboard-team-point-chart
              v-bind:leaderboard=leaderboardTeamPointChart
              :callback="'/api/games/' + this.$route.params.idGame + '/player-ranking-points?idTeam='">
          </leaderboard-team-point-chart>
        </v-window-item>
        <v-window-item value="leaderboard-team-medal">
          <leaderboard-team-medal
              v-bind:leaderboard=leaderboardTeamMedal
              :callback="'/api/games/' + this.$route.params.idGame + '/player-ranking-medals?idTeam='">
          </leaderboard-team-medal>
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>

<script>
import LeaderboardPlayerPointChart from '@/components/vgr/player/leaderboard/PointChart';
import LeaderboardPlayerMedal from '@/components/vgr/player/leaderboard/Medal';
import LeaderboardTeamPointChart from '@/components/vgr/team/leaderboard/PointChart';
import LeaderboardTeamMedal from '@/components/vgr/team/leaderboard/Medal';
import Group from '@/components/vgr/group/Group.vue'
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'GameIndex',
  components: {LeaderboardPlayerPointChart, LeaderboardPlayerMedal, LeaderboardTeamPointChart,LeaderboardTeamMedal, Group},
  data() {
    return {
      tab: null,
      groups: [],
      leaderboardPlayerPointChart: [],
      leaderboardPlayerMedal: [],
      leaderboardTeamPointChart: [],
      leaderboardTeamMedal: [],
    };
  },
  created() {
    this.load();
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getLibGroup() {
      if (localStorage.lang === 'fr') {
        return 'libGroupFr';
      }
      return 'libGroupEn';
    },
  },
  methods: {
    load() {
      let id = this.$route.params.idGame;
      this.axios.get('api/games/' + id + '/groups?pagination=false&order[' + this.getLibGroup + ']=ASC')
          .then(response => {
            this.groups = response.data['hydra:member']
          })
      this.axios.get('/api/games/' + id + '/player-ranking-points?maxRank=100')
          .then(response => {
            this.leaderboardPlayerPointChart = response.data['hydra:member']
          })
      this.axios.get('/api/games/' + id + '/player-ranking-medals?maxRank=100')
          .then(response => {
            this.leaderboardPlayerMedal = response.data['hydra:member']
          })
      this.axios.get('/api/games/' + id + '/team-ranking-points?maxRank=100')
          .then(response => {
            this.leaderboardTeamPointChart = response.data['hydra:member']
          })
      this.axios.get('/api/games/' + id + '/team-ranking-medals?maxRank=100')
          .then(response => {
            this.leaderboardTeamMedal = response.data['hydra:member']
          })
    }
  },
};
</script>
