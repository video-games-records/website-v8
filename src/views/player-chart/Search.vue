<template>
  <div>
    <h1>{{ $t('search.advanced') }}</h1>

    <form @submit.prevent @submit="search()">
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <game-select-multiple />
        </v-col>
      </v-row>

    </form>

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

  </div>
</template>

<script>
import ToolsDate from '@/components/tools/Date.vue';
import Player from '@/components/vgr/player/Player';
import Chart from '@/components/vgr/chart/Chart';
import Status from '@/components/vgr/playerChart/Status.vue';
import GameSelectMultiple from "@/components/vgr/advance-search/GameSelect.vue";

export default {
  name: 'PlayerChartSearch',
  components: {
    GameSelectMultiple,
    'tools-date': ToolsDate,
    'player': Player,
    'chart': Chart,
    'status': Status
  },
  props: {
    'activeOrderBy': {
      default: false,
      type: Boolean,
    },
    'activeFilter': {
      default: false,
      type: Boolean,
    },
    'itemsPerPage': {
      default: 20,
      type: Number,
    },
  },
  data() {
    return {
      playerCharts: [],
      ressource_url: '',
      order: {
        column: 'lastUpdate',
        direction: 'DESC',
      },
      statuses: [],
      filter: {
        players: [],
        games: [],
        platforms: [],
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
    getLibChart() {
      if (localStorage.lang === 'fr') {
        return 'chart.libChartFr';
      }
      return 'chart.libChartEn';
    },
  },
  created() {
    document.title = this.$t('search.advanced') + ' - ' + import.meta.env.VITE_APP_TITLE;
    /*PlayerChartStatusApi.getList().then(statuses => {
      this.statuses = statuses;
    });*/
  },
  methods: {
    isSearchable() {
      if (!this.$refs.players) return false;
      return (this.$refs.players.data.length > 0)
          || (this.$refs.games.data.length > 0)
          || (this.$refs.platforms.data.length > 0)
          || (this.filter.libChart.length >= 3);
    },
    search() {
      let params = {
        query: {
          groups: [
            'playerChart.player', 'chart.read.mini', 'group.read.mini',
            'game.read.mini', 'chart.group', 'player.read.mini', 'group.game', 'playerChartLib.format',
            'playerChart.proof', 'proof.read', 'picture.read', 'video.read', 'playerChart.read',
            'playerChart.chart', 'playerChart.status', 'playerChartStatus.read'
          ],
          //'player': this.$refs.players.getIds(),
          //'chart.group.game': this.$refs.games.getIds(),
          //'chart.group.game.platforms': this.$refs.platforms.getIds(),
          'status': this.filter.statuses,
        }
      };
      if (this.filter.libChart.length >= 3) {
        params.query[this.getLibChart] = this.filter.libChart;
      }
      // players
      //let queryString = utils.getQueryString(params.query);
      let queryString = '';
      if (this.filter.platinum) {
        queryString = queryString + '&rank=1&nbEqual=1&chart.nbPost[gt]=1';
      }
      if (this.filter.rank.value) {
        queryString = queryString + '&rank[' + this.filter.rank.operator + ']=' + this.filter.rank.value;
      }
      if (this.filter.pointChart.value) {
        queryString = queryString + '&pointChart[' + this.filter.pointChart.operator + ']=' + this.filter.pointChart.value;
      }
      queryString = queryString + '&itemsPerPage=' + this.itemsPerPage;
      queryString = queryString + '&order[' + this.order.column + ']=' + this.order.direction;
      this.ressource_url = 'api/player_charts' + queryString;
    },
    updateResource(data) {
      this.playerCharts = data
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
