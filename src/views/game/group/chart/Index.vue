<template>
  <div>
    <h1 class="h2">{{ getChart.name }}</h1>

    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="leaderboard-player">{{ $t('leaderboard.player') }}</v-tab>
      <v-tab value="leaderboard-team">{{ $t('leaderboard.team') }}</v-tab>
    </v-tabs>

    <v-card-text class="pa-0">
      <v-window v-model="tab">
        <v-window-item value="leaderboard-player">
          <div v-if="hasRolePlayer && getGame.id" class="d-flex justify-center ma-3">
            <v-btn >
              <router-link :to="{ name: 'ChartSubmit', params: { idChart: getChart.id, slugChart: getChart.slug }}">
                {{ $t('chart.updateScore') }}
              </router-link>
            </v-btn>
          </div>

          <v-progress-linear v-if="isLoading" indeterminate color="yellow-darken-2"></v-progress-linear>
          <v-table density="compact" class="leaderboard">
            <caption class="screen-reader-text">{{ $t('leaderboard.player') }}</caption>
            <thead>
            <tr>
              <th class="center" scope="col">#</th>
              <th scope="col">{{ $t('global.nickname') }}</th>
              <th scope="col" class="hidden-sm-and-down"></th>
              <th scope="col" class="hidden-md-and-down">{{ $t('global.recordPoints') }}</th>
              <th scope="col" v-for="lib in getChart.libs" :data-position="lib.position" :key="lib.id">{{ lib.name }}</th>
              <th scope="col">{{ $t('global.status') }}</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="row in leaderboardPlayer" :data-rank="row[0].rank" :key="row.id"
                  :class="[isAuthenticated && row[0].player.id === getAuthenticatedPlayer.id ? 'player--me' : 'player' ]">
                <td class="pl-2 center">{{ row[0].rank }}</td>
                <td>
                  <country v-bind:country="row[0].player.country"></country>
                  <player v-bind:player="row[0].player" v-bind:show-avatar="showAvatar"></player>
                </td>
                <td class="hidden-sm-and-down">
                  <platform v-bind:platform="row[0].platform"></platform>
                </td>
                <td class="hidden-md-and-down">
                  {{ number(row[0].pointChart) }}
                </td>
                <td v-for="value in row.values" :data-position="value.position" :key="value.id"
                    class="chart-list__score">
                  <router-link :to="{ name: 'PlayerChartIndex', params: { idPc: row[0].id }}">
                    {{ value }}
                  </router-link>
                </td>
                <td>
                  <ul>
                    <li class="d-inline pa-1">
                      <button v-if="row[0].proof" type="button" @click="showProof(row[0])"
                              :aria-labelledby="row[0].id">
                        <v-icon v-if="row[0].proof.video">mdi-video-box</v-icon>
                        <status v-else v-bind:status=row[0].status></status>
                        <v-tooltip
                            activator="parent"
                            location="start"
                        >{{ row[0].status.name }}</v-tooltip>
                      </button>
                      <router-link v-else router-link :to="{ name: 'PlayerChartIndex', params: { idPc: row[0].id }}">
                        <button type="button" class="button-as-link" :aria-labelledby="row[0].id">
                          <status v-bind:status=row[0].status></status>
                          <v-tooltip
                              activator="parent"
                              location="start"
                          >{{ row[0].status.name }}</v-tooltip>
                        </button>
                      </router-link>
                    </li>
                    <li class="d-inline" v-if="!this.$vuetify.display.mobile">
                      <last-update class="d-inline"  v-bind:player-chart=row[0]></last-update>
                    </li>
                  </ul>
                 </td>
              </tr>
              <tr>
                <td colspan="6" class="text-center pa-1">{{ $t('score.off') }}
                </td>
              </tr>
              <tr v-for="row in leaderboardPlayerDisabled" :data-rank="row[0].rank" :key="row.id"
                  :class="[isAuthenticated && row[0].player.id === getAuthenticatedPlayer.id ? 'player--me' : 'player' ]">
                <td></td>
                <td>
                  <country v-bind:country="row[0].player.country"></country>
                  <player v-bind:player="row[0].player"></player>
                </td>
                <td class="hidden-md-and-down">
                  <platform v-bind:platform="row[0].platform"></platform>
                </td>
                <td class="hidden-md-and-down"></td>
                <td v-for="value in row.values" :data-position="value.position" :key="value.id"
                    class="chart-list__score">
                  <router-link :to="{ name: 'PlayerChartIndex', params: { idPc: row[0].id }}">
                    {{ value }}
                  </router-link>
                </td>
                <td>
                  <ul>
                    <li class="d-inline pa-1">
                      <button v-if="row[0].proof" type="button" @click="showProof(row[0])"
                              :aria-labelledby="row[0].id">
                        <v-icon v-if="row[0].proof.video">mdi-video-box</v-icon>
                        <status v-else v-bind:status=row[0].status></status>
                        <v-tooltip
                            activator="parent"
                            location="start"
                        >{{ row[0].status.name }}</v-tooltip>
                      </button>
                      <router-link v-else router-link :to="{ name: 'PlayerChartIndex', params: { idPc: row[0].id }}">
                        <button type="button" class="button-as-link" :aria-labelledby="row[0].id">
                          <status v-bind:status=row[0].status></status>
                          <v-tooltip
                              activator="parent"
                              location="start"
                          >{{ row[0].status.name }}</v-tooltip>
                        </button>
                      </router-link>
                    </li>
                    <li class="d-inline" v-if="!this.$vuetify.display.mobile">
                      <last-update class="d-inline"  v-bind:player-chart=row[0]></last-update>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </v-table>


          <div v-if="hasRolePlayer && getGame.id" class="d-flex justify-center ma-3">
            <v-btn >
              <router-link :to="{ name: 'ChartSubmit', params: { idChart: getChart.id, slugChart: getChart.slug }}">
                {{ $t('chart.updateScore') }}
              </router-link>
            </v-btn>
          </div>

        </v-window-item>
        <v-window-item value="leaderboard-team" class="ma-1">
          <leaderboard-team
              v-bind:leaderboard=leaderboardTeam
              :callback="'/api/charts/' + this.$route.params.idChart + '/player-ranking-points?idTeam='">
          </leaderboard-team>
        </v-window-item>

      </v-window>
    </v-card-text>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="d-flex justify-center">Proof</v-card-title>
        <v-card-item>
          <proof v-bind:player-chart="playerChart"></proof>
        </v-card-item>
        <v-card-actions>
          <v-btn
              :text="$t('dialog.close')"
              @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Status from '@/components/vgr/playerChart/Status.vue'
import LastUpdate from '@/components/vgr/playerChart/LastUpdate.vue';
import LeaderboardTeam from '@/components/vgr/team/leaderboard/PointChart';
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Platform from '@/components/vgr/platform/Platform.vue';
import Proof from "@/components/vgr/playerChart/proof/Proof.vue";
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import LeaderboardTeamPointChart from "@/components/vgr/team/leaderboard/PointChart.vue";
import LeaderboardTeamMedal from "@/components/vgr/team/leaderboard/Medal.vue";
import LeaderboardPlayerPointChart from "@/components/vgr/player/leaderboard/PointChart.vue";
import LeaderboardPlayerMedal from "@/components/vgr/player/leaderboard/Medal.vue";
import Filters from "@/mixins/Filters.vue";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  mixins: [Security, Filters],
  name: 'ChartIndex',
  props: {
    'showAvatar': {
      default: true,
      type: Boolean,
    },
  },
  components: {
    LeaderboardPlayerMedal, LeaderboardPlayerPointChart, LeaderboardTeamMedal, LeaderboardTeamPointChart,
    Status, LastUpdate, LeaderboardTeam, Player, Country, Platform, Proof},
  data() {
    return {
      tab: null,
      isLoading: false,
      leaderboardPlayer: [],
      leaderboardPlayerDisabled: [],
      leaderboardTeam: [],
      dialog: false,
      playerChart: null,
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
    getChart() {
      return useAppStore().getChart;
    },
  },
  created() {
    this.load();
  },
  updated() {
    if (this.$route.name === 'ChartIndex') {
      useBreadcrumbsStore().setLevel(3);
      if (this.getChart.id !== undefined && this.getChart.id !== parseInt(this.$route.params.idChart)) {
        this.load();
      }
    }
  },
  methods: {
    load() {

      let id = this.$route.params.idChart;
      this.isLoading = true;
      this.axios.get('/api/charts/' + id + '/player-ranking')
          .then(response => {
            this.isLoading = false;
            this.leaderboardPlayer = response.data['hydra:member']
          })
      this.axios.get('/api/charts/' + id + '/player-ranking-disabled')
          .then(response => {
            this.leaderboardPlayerDisabled = response.data['hydra:member']
          })
      this.axios.get('/api/charts/' + id + '/team-ranking-points')
          .then(response => {
            this.leaderboardTeam = response.data['hydra:member']
          })
    },
    showProof(playerChart) {
      this.playerChart = playerChart;
      this.dialog = true;
    },
  },
};
</script>
