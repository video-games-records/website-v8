<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import WatchLanguage from "@/mixins/WatchLanguage.vue";

export default {
  mixins: [WatchLanguage],
  name: 'ChartMain',
  components: {},
  data() {
    return {
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    getGroup() {
      return useAppStore().getGroup;
    },
    getChart() {
      return useAppStore().getChart;
    },
  },
  created() {
    this.load();
  },
  watch: {
    '$route.params.idChart' () {
      this.load();
    },
  },
  methods: {
    load() {
      useBreadcrumbsStore().setLevel(3);
      this.axios.get('/api/charts/' + this.$route.params.idChart)
          .then(response => {
            useAppStore().setChart(response.data);
            useBreadcrumbsStore().setItem3(
                { text: this.getChart.name, to: {name: 'ChartIndex',params: { idChart: this.getChart.id, slugChart: this.getChart.slug }}}
            );
            document.title = this.getChart.name + ' - ' + this.getGroup.name + ' - ' + this.getGame.name + ' - ' + import.meta.env.VITE_APP_TITLE;
          })
    },
  },
};
</script>
