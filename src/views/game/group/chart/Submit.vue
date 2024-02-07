<template>
  <div>
    <player-chart-list :game="getGame"></player-chart-list>
  </div>
</template>

<script>

import playerChartList from '@/components/vgr/playerChart/form/List.vue'
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import {useScoreSubmitStore} from "@/store/score/submit";

export default {
  name: 'ChartSubmit',
  components: {playerChartList},
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getChart() {
      return useAppStore().getChart;
    },
    getResourceUrl() {
      return '/api/charts/' + this.$route.params.idChart + '/form-data';
    },
  },
  data() {
    return {
    };
  },
  updated() {
    if (this.$route.name === 'ChartSubmit') {
      if (this.getChart.id != this.$route.params.idChart) {
        this.updateResource();
      }
    }
  },
  created() {
    useBreadcrumbsStore().setLevel(4);
    useBreadcrumbsStore().setItem4({text: this.$t('chart.updateScore')});
    this.updateResource();
  },
  methods: {
    updateResource() {
      this.axios.get(this.getResourceUrl)
          .then(response => {
            useScoreSubmitStore().setCharts(response.data['hydra:member']);
          })
    },
  }
};
</script>
