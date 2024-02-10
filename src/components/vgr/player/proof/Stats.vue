<template>
  <v-sheet>
    <v-list density="compact">
      <v-list-item v-if="getTotal > 0" height="20">
        <strong>{{ number(getTotal) }}</strong> {{ $t('score.total', getTotal) }}
      </v-list-item>
      <v-list-item v-for="row in stats" :key="row.id">
        <span :title="row[0].name" :class="row[0].class ">
            <span class="screen-reader-text">{{ row[0].name }}</span>
        </span>&nbsp;
        <strong>{{ number(row['nb'] ) }}</strong> {{ $t('score.status.' + row[0].class, row['nb']) }}
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>

import Filters from "@/mixins/Filters.vue";

export default {
  mixins:[Filters],
  name: 'PlayerProofStats',
  components: {},
  props: {
    'idPlayer': {
      require: true,
    },
  },
  computed: {
    getTotal() {
      let total = 0;
      this.stats.forEach(function (element) {
        total = total + element['nb'];
      });
      return total;
    }
  },
  data() {
    return {
      stats: [],
      nbTotal: 0,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/players/' + this.idPlayer + '/player-chart-stats')
          .then(response => {
            this.stats = response.data['hydra:member']
          });
    },
  },
};
</script>

<style scoped>

</style>
