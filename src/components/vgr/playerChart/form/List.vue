<template>
  <div>
    <div v-for="(chart, index) in getCharts" :data-position="chart.position" :key="index"
         class="container">
      <player-chart-submit :key="chart.id" ref="playerChart" :chart="chart" :game="game"
                           :displayGroupName="displayGroupName"></player-chart-submit>
    </div>

    <div>
      <div class="d-flex justify-center ma-3">
        {{ $t('score.updated', getNbChartUpdated, {count: getNbChartUpdated}) }} /
        {{ $t('score.toUpdate', getNbChartToUpdate, {count :getNbChartToUpdate}) }}
      </div>

      <div class="d-flex justify-center ma-3">
        <v-btn v-on:click="submit">
          {{ $t('tag.submit') }}
        </v-btn>
      </div>
    </div>

    <div v-if="game.rules && game.rules.length > 0" style="margin-top:10px;padding:10px;border:1px solid">
      <h3>{{ $t('game.rules.specific') }}</h3>
      <div v-for="rule in game.rules" :data-position="rule.position" :key="rule.id" v-html="rule.text"/>
    </div>

  </div>
</template>

<script>
import PlayerChartSubmit from '@/components/vgr/playerChart/form/Submit.vue'
import {useScoreSubmitStore} from "@/store/score/submit";

export default {
  name: 'PlayerChartList',
  components: {PlayerChartSubmit},
  props: {
    'game': {
      type: Object,
      require: true,
    },
    'displayGroupName': {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  computed: {
    isInitialized() {
      return useScoreSubmitStore().getIsInitialized;
    },
    isLoading() {
      return useScoreSubmitStore().getIsLoading;
    },
    getCharts() {
      return useScoreSubmitStore().getCharts;
    },
    getNbChartToUpdate() {
      return useScoreSubmitStore().getNbChartToUpdate;
    },
    getNbChartUpdated() {
      return useScoreSubmitStore().getNbChartUpdated;
    },
  },
  methods: {
    submit: async function () {
      await useScoreSubmitStore().reset();
      let _this = this;
      for (const index in _this.$refs.playerChart) {
        await _this.$refs.playerChart[index].submit();
      }
      /*if (this.source === 'chart') {
        this.$store.dispatch('flashMessage/confirm', 'OK');
      }*/
    },
  },
};
</script>


<style scoped>
.container {
  + .container {
    //margin: 3rem 0;
    border-top: 1px dashed hsl(0, 0%, 53%);
  }
}
</style>