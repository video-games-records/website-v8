<template>
  <div class="pa-2">
    <v-row>
      <v-col cols="12" class="d-flex justify-center ma-2">
        <v-btn @click="search()">{{ $t('search.advanced') }}</v-btn>
      </v-col>
      <v-col cols="12">
        <player-chart-list
            v-bind:id-player="this.$route.params.idPlayer"
            v-bind:display-status="true"
            v-bind:active-order-by="true"
        >
        </player-chart-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PlayerChartList from '@/components/vgr/playerChart/List';
import {useScoreSearchStore} from "@/store/score/search";

export default {
  name: 'PlayerCharts',
  components: {
    PlayerChartList,
  },
  data() {
    return {
      player: null,
    };
  },
  created() {
    this.load();
  },
  methods: {
    search() {
      useScoreSearchStore().pushPlayer(this.player);
      this.$router.push({name: 'PlayerChartSearch'});
    },
    load() {
      this.axios.get('/api/players/' + this.$route.params.idPlayer)
          .then(response => {
            this.player = response.data;
          })
    }
  },
};
</script>
