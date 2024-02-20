<template>
  <div>
    <h1>{{ $t('search.advanced') }}</h1>

    <v-form @submit.prevent @submit="search()">
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <game-select-multiple />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <player-select-multiple />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <platform-select-multiple />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-text-field :label="$t('global.chart')" v-model="filter.libChart" />
        </v-col>
        <v-col cols="12" md="6" lg="4" class="d-flex">
          <v-select
              :label="$t('search.filter.rank')"
              v-model="filter.rank.operator"
              :items="this.items"
              item-value="value"
              item-title="title"
          ></v-select>
          <v-text-field :label="$t('search.filter.value')" v-model="filter.rank.value" />
        </v-col>
        <v-col cols="12" md="6" lg="4" class="d-flex">
          <v-select
              :label="$t('global.recordPoints')"
              v-model="filter.pointChart.operator"
              :items="this.items"
              item-value="value"
              item-title="title"
          ></v-select>
          <v-text-field :label="$t('search.filter.value')" v-model="filter.pointChart.value" />
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-checkbox  v-for="status in statuses" :key="status.id"
                      :label="status.name" :value="status.id" v-model="filter.statuses" />
        </v-col>
        <v-col cols="12" md="6" lg="4" >
          <v-checkbox :label="$t('search.filter.platinum')" v-model="filter.platinum" />
        </v-col>
        <v-col cols="12">
          <v-btn :disabled="!this.isSearchable" type="submit" class="mt-2">{{ $t('search.submit') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-sheet v-if="isLoading" class="d-flex justify-center">
      <v-progress-linear indeterminate color="yellow-darken-2"></v-progress-linear>
    </v-sheet>
    <table class="advanced-search-result">
      <caption class="screen-reader-text">{{ $t('search.playerChart.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('search.playerChart.score') }}</th>
        <th scope="col">
          <button class="table-order" @click="orderBy('rank')">{{ $t('search.playerChart.rank') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('pointChart')">{{ $t('global.points') }}</button>
        </th>
        <th scope="col">
          <button class="table-order" @click="orderBy('lastUpdate')">{{ $t('search.playerChart.lastUpdate') }}</button>
        </th>
        <th scope="col">{{ $t('search.playerChart.status') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="playerChart in playerCharts" :data-position="playerChart.position" :key="playerChart.id">
        <td :data-header="$t('global.chart')">
          <router-link :to="{
                            name: 'PlayerChartIndex',
                            params: {
                                slugGame: playerChart.chart.group.game.slug,
                                idGame: playerChart.chart.group.game.id,
                                slugGroup: playerChart.chart.group.slug,
                                idGroup: playerChart.chart.group.id,
                                slugChart: playerChart.chart.slug,
                                idChart: playerChart.chart.id,
                                idPc: playerChart.id }}">
                            <span v-for="lib in playerChart.libs" :data-position="lib.position" :key="lib.id">
                                {{ lib.formatValue }}
                            </span>
          </router-link>
          {{ $t('search.playerChart.onChart') }}
          <chart v-bind:chart="playerChart.chart"></chart>
        </td>
        <td class="advanced-search-result__rank" :data-header="$t('search.playerChart.rank')">
          <span v-if="playerChart.rank">{{ playerChart.rank }}</span>
          <span v-else>{{ $t('search.playerChart.new') }}</span>
        </td>
        <td class="advanced-search-result__points" :data-header="$t('global.points')">
          {{ playerChart.pointChart }}
        </td>
        <td class="advanced-search-result__date" :data-header="$t('global.date')">
                        <span>
                            {{ $t('search.playerChart.by') }}
                            <player v-bind:player="playerChart.player"></player>
                            {{ $t('search.playerChart.on') }}
                            </span>
          <tools-date v-bind:date="playerChart.lastUpdate"
                      v-bind:options="{ year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></tools-date>
        </td>
        <td>
          <div class="tooltip tooltip--top-right">
            <button v-if="playerChart.proof" type="button" class="button-as-link" @click="showProof(playerChart)"
                    :aria-labelledby="playerChart.id">
              <status v-bind:status=playerChart.status></status>
            </button>
            <button v-else type="button" class="button-as-link" :aria-labelledby="playerChart.status.id">
              <status v-bind:status=playerChart.status></status>
            </button>
            <div role="tooltip" :id="playerChart.status.id">{{ playerChart.status.name }}</div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <v-pagination
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()" />

  </div>
</template>

<script>
import ToolsDate from '@/components/tools/Date.vue';
import Player from '@/components/vgr/player/Player';
import Chart from '@/components/vgr/chart/Chart';
import Status from '@/components/vgr/playerChart/Status.vue';
import GameSelectMultiple from "@/components/vgr/advance-search/GameSelect.vue";
import PlayerSelectMultiple from "@/components/vgr/advance-search/PlayerSelect.vue";
import {useScoreSearchStore} from "@/store/score/search";
import PlatformSelectMultiple from "@/components/vgr/advance-search/PlatformSelect.vue";

export default {
  name: 'PlayerChartSearch',
  components: {
    PlatformSelectMultiple,
    PlayerSelectMultiple,
    GameSelectMultiple,
    'tools-date': ToolsDate,
    'player': Player,
    'chart': Chart,
    'status': Status
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      length: 1,
      itemsPerPage: 20,
      playerCharts: [],
      ressource_url: '',
      order: {
        column: 'lastUpdate',
        direction: 'DESC',
      },
      items: [
        {
          title: this.$t('search.filter.lt'),
          value: 'lt'
        },
        {
          title: this.$t('search.filter.gt'),
          value: 'gt'
        },
        {
          title: this.$t('search.filter.lte'),
          value: 'lte'
        },
        {
          title: this.$t('search.filter.gte'),
          value: 'gte'
        }
      ],
      statuses: [],
      filter: {
        libChart: '',
        statuses: [],
        platinum: false,
        rank: {
          operator: 'lt',
          value: null,
        },
        pointChart: {
          operator: 'lt',
          value: null,
        }
      },
      dialog: false,
      playerChart: null,
    };
  },

  computed: {
    isSearchable() {
      return (useScoreSearchStore().getGames.length > 0)
          || (useScoreSearchStore().getPlayers.length > 0)
          || (useScoreSearchStore().getPlatforms.length > 0)
          || (this.filter.libChart.length >= 3);
    },
    getLibChart() {
      if (localStorage.lang === 'fr') {
        return 'chart.libChartFr';
      }
      return 'chart.libChartEn';
    },
    getFilterGames() {
      let filter = '';
      useScoreSearchStore().getGames.forEach(function (game) {
        filter += '&chart.group.game[]=' + game.id;
      });
      return filter;
    },
    getFilterPlayers() {
      let filter = '';
      useScoreSearchStore().getPlayers.forEach(function (player) {
        filter += '&player[]=' + player.id;
      });
      return filter;
    },
    getFilterPlatforms() {
      let filter = '';
      useScoreSearchStore().getPlatforms.forEach(function (platform) {
        filter += '&chart.group.game.platforms[]=' + platform.id;
      });
      return filter;
    },
    getFilterStatuses() {
      let filter = '';
      this.filter.statuses.forEach(function (id) {
        filter += '&status[]=' + id;
      });
      return filter;
    },
    getResourceUrl() {
      let url = '/api/player_charts?groups[]=playerChart.player&groups[]=chart.read.mini&groups[]=group.read.mini' +
          '&groups[]=game.read.mini&groups[]=chart.group&groups[]=player.read.mini' +
          '&groups[]=group.game&groups[]=playerChartLib.format&groups[]=playerChart.proof' +
          '&groups[]=proof.read&groups[]=picture.read&groups[]=video.read' +
          '&groups[]=playerChart.read&groups[]=playerChart.status&groups[]=playerChartStatus.read' +
          '&groups[]=playerChart.chart' +
          this.getFilterGames + this.getFilterPlayers + this.getFilterPlatforms + this.getFilterStatuses;


      // libChart
      if (this.filter.libChart.length >= 3) {
       url = url + '&' + this.getLibChart + '=' + this.filter.libChart;
      }
      // Rank
      if (this.filter.rank.value) {
        url = url + '&rank[' + this.filter.rank.operator + ']=' + this.filter.rank.value;
      }
      // Point
      if (this.filter.pointChart.value) {
        url = url + '&pointChart[' + this.filter.pointChart.operator + ']=' + this.filter.pointChart.value;
      }
      // Platine
      if (this.filter.platinum) {
        url = url + '&rank=1&nbEqual=1&chart.nbPost[gt]=1';
      }
      // ORDER BY
      url = url + '&order[' + this.order.column + ']=' + this.order.direction;
      // Page
      url = url + '&page=' + this.page;
      return url;
    }
  },
  created() {
    document.title = this.$t('search.advanced') + ' - ' + import.meta.env.VITE_APP_TITLE;
    this.axios.get('/api/player_chart_statuses').then(response => {
      this.statuses = response.data['hydra:member'];
    })
  },
  methods: {

    search() {

      this.playerCharts = [];
      this.page = 1;
      this.updateResource();
    },
    updateResource() {
      this.isLoading = true;
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.playerCharts = response.data['hydra:member'];
            this.length = Math.trunc(response.data['hydra:totalItems'] / this.itemsPerPage - 1) + 1;
            this.isLoading = false;
          })
    },
    orderBy(column) {
      if (column !== this.order.column) {
        this.order.column = column;
        if (column === 'translations.name') {
          this.order.direction = 'ASC';
        } else {
          this.order.direction = 'ASC';
        }
      } else if (this.order.direction === 'ASC') {
        this.order.direction = 'DESC';
      } else {
        this.order.direction = 'ASC';
      }
      this.search();
    },
    showProof(playerChart) {
      this.playerChart = playerChart;
      this.dialog = true;
    },
  },
};
</script>
