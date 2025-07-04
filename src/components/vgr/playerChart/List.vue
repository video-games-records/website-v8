<template>
  <div>
    <v-table class="responsive">
      <caption class="screen-reader-text">{{ $t('search.playerChart.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('global.score') }}</th>
        <th scope="col">
          <button v-if="activePagination" class="table-order" @click="orderBy('global.rank')">{{
              $t('global.rank')
            }}
          </button>
          <span v-else>{{ $t('global.rank') }}</span>
        </th>
        <th scope="col">
          <button v-if="activePagination" class="table-order" @click="orderBy('lastUpdate')">{{
              $t('score.lastUpdate')
            }}
          </button>
          <span v-else>{{ $t('score.lastUpdate') }}</span>
        </th>
        <th v-if="displayStatus" scope="col">{{ $t('global.status') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="playerChart in playerCharts" :data-position="playerChart.position" :key="playerChart.id">
        <td :data-label="$t('global.chart')" class="overflow-hidden">
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
          {{ $t('search.playerChart.on') }}
          <router-link :to="{ name: 'ChartIndex',
            params: {
                idChart: playerChart.chart.id,
                slugChart: playerChart.chart.slug,
                idGroup: playerChart.chart.group.id,
                slugGroup: playerChart.chart.group.slug,
                idGame: playerChart.chart.group.game.id,
                slugGame: playerChart.chart.group.game.slug
            }
            }">{{ playerChart.chart.group.game.name }} / {{ playerChart.chart.group.name }} / {{ playerChart.chart.name }}</router-link>
        </td>
        <td :data-label="$t('global.rank')">
          <span v-if="playerChart.rank">{{ playerChart.rank }}</span>
          <span v-else>{{ $t('search.playerChart.new') }}</span>
        </td>
        <td :data-label="$t('global.date')">
                        <span v-if="idPlayer == null">
                            {{ $t('global.by') }}
                            <player v-bind:player="playerChart.player"></player>
                            {{ $t('search.playerChart.on') }}
                            </span>
          <tools-date v-bind:date="playerChart.lastUpdate"
                      v-bind:options="{ year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }"></tools-date>
        </td>
        <td :data-label="$t('global.status')" v-if="displayStatus">
          <div>
            <button @click="showProof(playerChart)" :aria-labelledby="playerChart.id">
              <status v-bind:status=playerChart.status></status>
            </button>
            <v-tooltip activator="parent" location="start">{{ playerChart.status.name }}</v-tooltip>
          </div>
        </td>
      </tr>
      </tbody>
    </v-table>

    <v-pagination
        v-if="activePagination"
        :density="this.$vuetify.display.mobile ? 'compact' : 'default'"
        v-model="page"
        :length="length"
        total-visible=6
        @update:modelValue="updateResource()" />

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="d-flex justify-center">
          Proof
        </v-card-title>
        <v-card-item class="justify-center">
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
import ToolsDate from '@/components/tools/Date.vue';
import Player from '@/components/vgr/player/Player';
import Status from '@/components/vgr/playerChart/Status.vue';
import Proof from "@/components/vgr/playerChart/proof/Proof.vue";


export default {
  name: 'PlayerChartList',
  components: {
    'tools-date': ToolsDate,
    'player': Player,
    'status': Status,
    'proof': Proof,
  },
  props: {
    'idPlayer': {
      require: false,
    },
    'withProofPicture': {
      default: false,
      type: Boolean,
    },
    'withProofVideo': {
      default: false,
      type: Boolean,
    },
    'game': {
      type: String,
      require: false,
    },
    'activeOrderBy': {
      default: false,
      type: Boolean,
    },
    'activePagination': {
      default: true,
      type: Boolean,
    },
    'itemsPerPage': {
      default: 20,
      type: Number,
    },
    'nbDay': {
      type: Number,
      require: false,
    },
    'displayStatus': {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      page: 1,
      length: 1,
      playerCharts: [],
      resource_url: 'api/player_charts?groups[]=player-chart:read' +
          '&groups[]=player-chart:chart&groups[]=chart:read' +
          '&groups[]=chart:group&groups[]=group:read' +
          '&groups[]=group:game&groups[]=game:read' +
          '&groups[]=player-chart:player&groups[]=player:read' +
          '&groups[]=player-chart:proof&groups[]=proof:read' +
          '&groups[]=proof:picture&groups[]=picture:read' +
          '&groups[]=proof:video&groups[]=video:read' +
          '&groups[]=player-chart:status&groups[]=player-chart-status:read' +
          '&groups[]=player-chart:libs&groups[]=player-chart-lib:read',
      order: {
        column: 'lastUpdate',
        direction: 'DESC',
      },
      games: [],
      statuses: [],
      dialog: false,
      playerChart: null,
    };
  },
  computed: {
    getResourceUrl() {
      let url = this.resource_url;
      url = url + '&itemsPerPage=' + this.itemsPerPage;
      if (this.nbDay) {
        let date = new Date();
        date.setDate(date.getDate() - this.nbDay);
        url = url + '&lastUpdate[after]=' + date.toISOString();
      }
      if (this.idPlayer != null) {
        url = url + '&player=' + this.idPlayer;
      }
      if (this.withProofPicture === true) {
        url = url + '&exists[proof.picture]=true';
      }
      if (this.withProofVideo === true) {
        url = url + '&exists[proof.video]=true';
      }
      url = url + '&order[' + this.order.column + ']=' + this.order.direction;
      url = url + '&page=' + this.page;
      return url;
    },
    getLibGame() {
      if (this.$i18n.locale === 'fr') {
        return 'libGameFr';
      }
      return 'libGameEn';
    },
  },
  created() {
    if (this.idPlayer) {
      this.axios.get(
          '/api/games?groups[]=game:read&pagination=false&status=' + this.$GAME_STATUS_ACTIVE +
          '&playerGame.player=' + this.idPlayer + '&order[' + this.getLibGame + ']=ASC')
          .then(response => {
            this.games = response.data['hydra:member']
          });

      this.axios.get(
          '/api/player_chart_statuses')
          .then(response => {
            this.statuses = response.data['hydra:member']
          })
    }
    this.updateResource();
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            this.playerCharts = response.data['hydra:member'];
            this.length = Math.trunc((response.data['hydra:totalItems'] - 1) / this.itemsPerPage ) + 1;
          })
    },
    orderBy(column) {
      if (this.activeOrderBy === false) {
        return;
      }
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
      this.updateResource();
    },
    showProof(playerChart) {
      if (playerChart.proof === null) return;
      this.playerChart = playerChart;
      this.dialog = true;
    },
  },
};
</script>
