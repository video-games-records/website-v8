<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
export default {
  name: 'PlayerStatsPositions',
  props: ['idPlayer'],
  computed: {},
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column',
          zoomType: 'xy',
          panKey: 'ctrl'
        },
        title: {
          text: this.$t('global.positions')
        },
        colors: [
          '#e06500',
        ],
        xAxis: {
          categories: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30+'
          ]
        },
        yAxis: {
          min: 0,
          title: {
            text: this.$t('global.total')
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: 'gray'
            }
          }
        },
        series: [{
          name: this.$t('global.positions'),
          data: []
        }]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/dwh_players/get-positions?idPlayer=' + this.$route.params.idPlayer, {useCache: true})
          .then(response => {
            this.chartOptions.series[0].data = response.data['hydra:member'];
          })
    }
  },
};
</script>
