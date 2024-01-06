<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
export default {
  name: 'PlayerStatsMedalsByTime',
  props: ['idPlayer'],
  computed: {},
  data() {
    return {
      chartOptions: {
        title: {
          text: this.$t('global.medals'),
          zoomType: 'xy',
          panKey: 'ctrl'
        },
        colors: [
          '#b3e9ff', // $platinium
          '#ffd900', // $gold
          '#bfbfbf', // $silver
          '#cd8032'  // $bronze
        ],
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: this.$t('global.medalsNumber')
          }
        },
        plotOptions: {
          series: {
            pointInterval: 24 * 3600 * 1000 // one day
          }
        },
        series: [
          {
            name: this.$t('global.platinum'),
            data: []
          },
          {
            name: this.$t('global.gold'),
            data: []
          },
          {
            name: this.$t('global.silver'),
            data: []
          },
          {
            name: this.$t('global.bronze'),
            data: []
          }
        ]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/dwh_players/get-medals-by-time?idPlayer=' + this.$route.params.idPlayer, {useCache: true})
          .then(response => {
            this.chartOptions.series[0].data = response.data['hydra:member'][0];
            this.chartOptions.series[1].data = response.data['hydra:member'][1];
            this.chartOptions.series[2].data = response.data['hydra:member'][2];
            this.chartOptions.series[3].data = response.data['hydra:member'][3];
            let begin = response.data['hydra:member'][4][0];
            this.chartOptions.plotOptions.series.pointStart = Date.UTC(begin.substr(0, 4), begin.substr(5, 2) - 1, begin.substr(8, 2));
          })
    }
  },
};
</script>


