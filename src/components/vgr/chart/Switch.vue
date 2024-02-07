<template>
  <v-sheet>
    <div class="d-flex">
      <v-btn v-if="!isFirst" rounded="lg" icon="mdi-chevron-left" v-on:click="goToPrev()" />
      <v-select
          density="comfortable"
          :label="$t('aside.switch.chart')"
          v-model="chart"
          :items="this.charts"
          item-title="name"
          @update:modelValue="onChange()"
          return-object
      >
      </v-select>
      <v-btn v-if="!isLast" rounded="lg" icon="mdi-chevron-right" v-on:click="goToNext()" />
    </div>
  </v-sheet>
</template>

<script>
import {useAppStore} from "@/store/app";

export default {
  name: 'ChartSwitch',
  data() {
    return {
      charts: [],
    };
  },
  computed: {
    getGroup() {
      return useAppStore().getGroup;
    },
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
      this.axios.get('/api/groups/' + this.$route.params.idGroup  + '/charts?pagination=false&order[' + this.getLibChart + ']=ASC')
          .then(response => {
            this.charts = response.data['hydra:member']
          })
    },
  },
  created() {
    this.load();
  },
};
</script>