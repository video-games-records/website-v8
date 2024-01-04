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
    getChart() {
      return useAppStore().getChart;
    },
    getPlayerChart() {
      return useAppStore().getPlayerChart;
    },
  },
  created() {
    useBreadcrumbsStore().setLevel(4);
    this.load();
  },
  updated() {
    if (this.$route.name === 'PlayerChartIndex') {
      useBreadcrumbsStore().setLevel(4);
    }
  },
  methods: {
    load() {
      this.axios.get('/api/player_charts/' + this.$route.params.idPc)
          .then(response => {
            useAppStore().setPlayerChart(response.data);
            useBreadcrumbsStore().setItem4(
                { text: this.getPlayerChart.player.pseudo}
            );
            //document.title = this.getPlayerChart.player.pseudo + ' - ' + this.getChart.name + ' - ' + this.getGroup.name + ' - ' + this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    },
  },
};
</script>
