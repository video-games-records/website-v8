<template>
  <div>
    <h2>{{ $t('score.last.title') }}</h2>

    <player-chart-list
        v-bind:nb-day="7"
        v-bind:items-per-page="50">
    </player-chart-list>
  </div>
</template>

<script>

import PlayerChartList from '@/components/vgr/playerChart/List';

export default {
  name: 'PayerChartLast',
  components: {
    'player-chart-list': PlayerChartList,
  },
  data() {
    return {};
  },
  created() {
    document.title = this.$t('score.last.title') + ' - ' + import.meta.env.VITE_APP_TITLE;
  },
};
</script>
