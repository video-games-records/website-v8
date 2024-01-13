<template>
  <v-sheet>
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
  </v-sheet>
</template>

<script>
import PlayerChartList from '@/components/vgr/playerChart/List';

export default {
  name: 'PlayerGames',
  components: {
    PlayerChartList,
  },
  data() {
    return {};
  },
  methods: {
    search() {
      /*let data = [this.$parent.player];
      this.$store.dispatch('playerChartSearch/setPlayers', data);
      this.$router.push({name: 'PlayerChartSearch'});*/
    },
  },
};
</script>
