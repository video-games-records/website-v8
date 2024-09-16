<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-center">
      <v-progress-circular indeterminate color="yellow-darken-2" />
    </div>
    <div v-else class="d-flex">
      <v-btn v-if="!isFirst" rounded="lg" icon="mdi-chevron-left" @click="goToPrev()" />
      <v-select
        v-model="chart"
        density="comfortable"
        :label="$t('aside.switch.chart')"
        :items="this.charts"
        item-title="name"
        return-object
        @update:model-value="onChange()"
      />
      <v-btn v-if="!isLast" rounded="lg" icon="mdi-chevron-right" @click="goToNext()" />
    </div>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  name: 'ChartSwitch',
  mixins: [WatchLanguage],
  data() {
    return {
      isLoading: true,
      charts: [],
    };
  },
  computed: {
    chart: {
      get: function () {
        return useAppStore().getChart;
      },
      set: function (group) {
        useAppStore().setChart(group);
      }
    },
    isFirst() {
      if (this.charts.length === 0) return false;
      return this.chart.id === this.charts[0].id;
    },
    isLast() {
      if (this.charts.length === 0) return false;
      return this.chart.id === this.charts[this.charts.length - 1].id;
    },
    getLibChart() {
      if (localStorage.lang === 'fr') {
        return 'libChartFr';
      }
      return 'libChartEn';
    },
  },
  created() {
    this.load();
  },
  methods: {
    onChange () {
      this.$router.push({ name: 'ChartIndex', params: {idChart : this.chart.id, slugChart: this.chart.slug}});
    },
    goToPrev() {
      this.goTo(this.charts[this.charts.map(g => g.id).indexOf(this.chart.id) - 1]);
    },
    goToNext() {
      this.goTo(this.charts[this.charts.map(g => g.id).indexOf(this.chart.id) + 1]);
    },
    goTo(chart) {
      this.$router.push({name: this.$route.name, params: {idChart: chart.id, slugChart: chart.slug}});
    },
    load() {
      this.isLoading = true;
      this.axios.get('/api/groups/' + this.$route.params.idGroup  + '/charts?pagination=false&order[' + this.getLibChart + ']=ASC')
          .then(response => {
            this.isLoading = false
            this.charts = response.data['hydra:member']
          })
    },
  },
};
</script>