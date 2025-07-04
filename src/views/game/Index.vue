<template>
  <div>
    <h1 class="screen-reader-text">{{ getGame.name }}</h1>

    <div v-if="hasRolePlayer && getGame.id && !this.$vuetify.display.mobile" class="d-flex justify-center ma-3">
      <v-btn>
        <router-link :to="{ name: 'GameSubmit', params: { idGame: getGame.id, slugGame: getGame.slug }}">
          {{ $t('group.updateScores') }}
        </router-link>
      </v-btn>
    </div>

    <v-table>
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
            <group :group="group"></group>
          </td>
          <td :data-header="$t('global.charts')">{{ number(group.nbChart) }}</td>
          <td :data-header="$t('global.scores')">{{ number(group.nbPost) }}</td>
        </tr>
      </tbody>
    </v-table>

    <h2 class="pa-3">{{ $t('global.rankings') }}</h2>

    <v-tabs v-model="tab" bg-color="primary">
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
      <v-window v-model="tab">
        <v-window-item value="leaderboard-player-point-chart">
          <leaderboard-player-point-chart :leaderboard="leaderboardPlayerPointChart" />
        </v-window-item>
        <v-window-item value="leaderboard-player-medal">
          <leaderboard-player-medal :leaderboard="leaderboardPlayerMedal" />
        </v-window-item>
        <v-window-item value="leaderboard-team-point-chart">
          <leaderboard-team-point-chart
            :leaderboard="leaderboardTeamPointChart"
            :callback="'/api/games/' + this.$route.params.idGame + '/player-ranking-points?idTeam='"
          />
        </v-window-item>
        <v-window-item value="leaderboard-team-medal">
          <leaderboard-team-medal
            :leaderboard="leaderboardTeamMedal"
            :callback="'/api/games/' + this.$route.params.idGame + '/player-ranking-medals?idTeam='"
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
import Group from '@/components/vgr/group/Group.vue'
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import Filters from "@/mixins/Filters.vue";
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  name: 'GameIndex',
  components: {LeaderboardPlayerPointChart, LeaderboardPlayerMedal, LeaderboardTeamPointChart,LeaderboardTeamMedal, Group},
  mixins: [Security, Filters, WatchLanguage],
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
  created() {
    this.load();
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
