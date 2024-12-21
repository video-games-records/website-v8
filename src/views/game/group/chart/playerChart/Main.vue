<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  name: 'PlayerChartMain',
  components: {},
  data() {
    return {
      playerChart: {},
    };
  },
  computed: {
    getPlayerChart() {
      return useAppStore().getPlayerChart;
    },
  },
  watch: {
    '$route.params.idPc' () {
      this.load();
    },
  },
  created() {
    useBreadcrumbsStore().setLevel(4);
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/player_charts/' + this.$route.params.idPc)
          .then(response => {
            useAppStore().setPlayerChart(response.data);
            useBreadcrumbsStore().setItem4(
                { text: this.getPlayerChart.player.pseudo}
            );
          })
    },
  },
};
</script>
