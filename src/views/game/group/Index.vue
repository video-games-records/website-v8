<template>
  <div>
    <h1 class="h2">{{ getGroup.name }}</h1>

    <div v-if="hasRolePlayer && getGame.id" class="d-flex justify-center ma-3">
      <v-btn>
        <router-link :to="{ name: 'GroupSubmit', params: { idGroup: getGroup.id, slugGroup: getGroup.slug }}">
          {{ $t('group.updateScores') }}
        </router-link>
      </v-btn>
    </div>

    <v-tabs v-model="tab[0]" bg-color="primary">
      <v-tab value="charts">{{ $t('global.charts') }}</v-tab>
      <v-tab value="top-score">Top Score</v-tab>
    </v-tabs>

    <v-card-text class="pa-0 pt-2">
      <v-window v-model="tab[0]">
        <v-window-item value="charts">
          <v-progress-linear v-if="isLoading" indeterminate color="yellow-darken-2" />
          <v-table>
            <caption class="screen-reader-text">{{ $t('global.charts') }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ $t('global.charts') }}</th>
                <th scope="col">{{ $t('global.scores') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="chart in charts" :key="chart.id" :data-position="chart.position">
                <td>
                  <chart :chart="chart" /> <v-icon v-if="chart.isProofVideoOnly">mdi-video-check</v-icon>
                </td>
                <td :data-header="$t('global.scores')">{{ number(chart.nbPost) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-window-item>
        <v-window-item value="top-score">
          <top-score :charts="topScore"></top-score>
        </v-window-item>
      </v-window>
    </v-card-text>

    <div v-if="hasRolePlayer && getGame.id" class="d-flex justify-center ma-3">
      <v-btn >
        <router-link :to="{ name: 'GroupSubmit', params: { idGroup: getGroup.id, slugGroup: getGroup.slug }}">
          {{ $t('group.updateScores') }}
        </router-link>
      </v-btn>
    </div>

    <h2 class="pa-3">{{ $t('global.rankings') }}</h2>

    <v-tabs v-model="tab[1]" bg-color="primary">
      <v-tab value="leaderboard-player-point-chart">
        <span v-if="this.$vuetify.display.mobile"><v-icon>mdi-alpha-p-box</v-icon> / Pts</span>
        <span v-else>[{{ $t('global.player') }}] {{ $t('leaderboard.recordPoints.title') }}</span>
      </v-tab>
      <v-tab value="leaderboard-player-medal">
        <span v-if="this.$vuetify.display.mobile"><v-icon>mdi-alpha-p-box</v-icon> / <v-icon>mdi-medal</v-icon></span>
        <span v-else>[{{ $t('global.player') }}] {{ $t('leaderboard.medal.title') }}</span>
      </v-tab>
      <v-tab value="leaderboard-team-point-chart">
        <span v-if="this.$vuetify.display.mobile"><v-icon>mdi-alpha-t-box</v-icon> / Pts</span>
        <span v-else>[{{ $t('global.team') }}] {{ $t('leaderboard.recordPoints.title') }}</span>
      </v-tab>
      <v-tab value="leaderboard-team-medal">
        <span v-if="this.$vuetify.display.mobile"><v-icon>mdi-alpha-t-box</v-icon> / <v-icon>mdi-medal</v-icon></span>
        <span v-else>[{{ $t('global.team') }}] {{ $t('leaderboard.medal.title') }}</span>
      </v-tab>
    </v-tabs>

    <v-card-text class="pa-0 pt-2">
      <v-window v-model="tab[1]">
        <v-window-item value="leaderboard-player-point-chart">
          <leaderboard-player-point-chart :leaderboard="leaderboardPlayerPointChart" />
        </v-window-item>
        <v-window-item value="leaderboard-player-medal">
          <leaderboard-player-medal :leaderboard="leaderboardPlayerMedal" />
        </v-window-item>
        <v-window-item value="leaderboard-team-point-chart">
          <leaderboard-team-point-chart
            :leaderboard="leaderboardTeamPointChart"
            :callback="'/api/groups/' + this.$route.params.idGroup + '/player-ranking-points?idTeam='"
          />
        </v-window-item>
        <v-window-item value="leaderboard-team-medal">
          <leaderboard-team-medal
            :leaderboard="leaderboardTeamMedal"
            :callback="'/api/groups/' + this.$route.params.idGroup + '/player-ranking-medals?idTeam='"
          />
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
import TopScore from "../../../components/vgr/chart/TopScore";
import Chart from '@/components/vgr/chart/Chart.vue';
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import Filters from "@/mixins/Filters.vue";
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  name: 'GroupIndex',
  components: {
    TopScore, LeaderboardPlayerPointChart, LeaderboardPlayerMedal,
    LeaderboardTeamPointChart, LeaderboardTeamMedal,Chart,
  },
  mixins: [Security, Filters, WatchLanguage],
  data() {
    return {
      isLoading: false,
      tab: [],
      charts: [],
      leaderboardPlayerPointChart: [],
      leaderboardPlayerMedal: [],
      leaderboardTeamPointChart: [],
      leaderboardTeamMedal: [],
      topScore: [],
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
    getLibChart() {
      if (this.$i18n.locale === 'fr') {
        return 'libChartFr';
      }
      return 'libChartEn';
    },
  },
  created() {
    this.load();
  },
  updated() {
    if (this.$route.name  === 'GroupIndex') {
      if (this.getGroup.id !== undefined && this.getGroup.id !== parseInt(this.$route.params.idGroup)) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      let id = this.$route.params.idGroup;
      this.isLoading = true;
      this.axios.get('api/groups/' + id + '/charts?pagination=false&order[' + this.getLibChart + ']=ASC')
          .then(response => {
            this.isLoading = false;
            this.charts = response.data['hydra:member']
          })
      this.axios.get('/api/groups/' + id + '/player-ranking-points?maxRank=100')
          .then(response => {
            this.leaderboardPlayerPointChart = response.data['hydra:member']
          })
      this.axios.get('/api/groups/' + id + '/player-ranking-medals?maxRank=100')
          .then(response => {
            this.leaderboardPlayerMedal = response.data['hydra:member']
          })
      this.axios.get('/api/groups/' + id + '/team-ranking-points?maxRank=100')
          .then(response => {
            this.leaderboardTeamPointChart = response.data['hydra:member']
          })
      this.axios.get('/api/groups/' + id + '/team-ranking-medals?maxRank=100')
          .then(response => {
            this.leaderboardTeamMedal = response.data['hydra:member']
          })
      this.axios.get('/api/groups/' + id + '/top-score')
          .then(response => {
            this.topScore = response.data['hydra:member']
          })
    }
  },

};
</script>
