<template>
  <v-sheet>
    <button v-if="isOpened === false" type="button"  @click="open" aria-expanded="false" :aria-controls="group.id">
      <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
        <use xlink:href="#arrow"/>
      </svg>
      {{ group.name }}
    </button>

    <button v-else type="button"  @click="close" aria-expanded="true" :aria-controls="group.id">
      <svg width="16" height="16" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
        <use xlink:href="#arrow"/>
      </svg>
      {{ group.name }}
    </button>

    <v-sheet v-if="isOpened">
    <v-sheet v-if="playerCharts.length > 0" class="d-flex flex-wrap">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="playerChart in playerCharts" :key="playerChart.id">
          <player-proof-player-chart v-bind:player-chart="playerChart" v-bind:manage="manage" />
        </v-col>
      </v-row>

    </v-sheet>
    <v-sheet v-else>
      <p>{{ $t('group.noScore') }}</p>
    </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
import PlayerProofPlayerChart from "@/components/vgr/player/proof/PlayerChart";
import {usePlayerProofStore} from "@/store/player/proof";

export default {
  name: 'PlayerProfileProofGroup',
  components: {
    PlayerProofPlayerChart,
  },
  props: {
    'group': {
      type: Object,
      require: true,
    },
    'idPlayer': {
      require: true,
    },
    'manage': {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  computed: {
    getLibChart() {
      if (localStorage.lang === 'fr') {
        return 'chart.libChartFr';
      }
      return 'chart.libChartEn';
    },
    isAllGroupOpened() {
      return usePlayerProofStore().getIsOpened;
    }
  },
  data() {
    return {
      isInitialized: false,
      isOpened: false,
      playerCharts: [],
    };
  },
  methods: {
    open() {
      if (this.isInitialized === false) {
        this.load();
      }
      this.isOpened = true;
    },
    close() {
      this.isOpened = false;
    },
    load() {
      this.axios.get(
          '/api/player_charts?groups[]=playerChart.read&groups[]=playerChart.status&groups[]=playerChartStatus.read' +
          '&groups[]=playerChart.chart&groups[]=chart.read.mini&groups[]=chart.group&groups[]=group.read.mini' +
          '&groups[]=playerChartLib.format&groups[]=playerChart.proof&groups[]=proof.read&groups[]=picture.read' +
          '&groups[]=video.read&order[' + this.getLibChart + ']=ASC&pagination=false&chart.group=' + this.group.id + '&player=' + this.idPlayer
      )
         .then(response => {
          this.playerCharts = response.data['hydra:member'];
           this.isInitialized = true;
        })
    }
  },
  watch: {
    isAllGroupOpened () {
      if (usePlayerProofStore().getIsOpened) {
        this.open();
      } else {
        this.close();
      }
    }
  },
};
</script>
