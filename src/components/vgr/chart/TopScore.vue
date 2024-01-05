<template>
  <div>
    <table class="top-score">
      <caption class="screen-reader-text">{{ $t('global.topScore') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('global.charts') }}</th>
        <th v-if="isAuthenticated" scope="col">{{ $t('global.myScore') }}</th>
        <th v-if="isAuthenticated" scope="col">{{ $t('global.myRank') }}</th>
        <th scope="col">{{ $t('global.topScore') }}</th>
        <th scope="col">{{ $t('player.pseudo') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="chart in charts" :data-position="chart.position" :key="chart.id">
        <td class="top-score__record">
          <chart v-bind:chart="chart"></chart>
        </td>
        <td v-if="isAuthenticated" :data-header="$t('global.myScore')">
                            <span v-if="chart.playerChartP != null">
                                <span v-for="lib in chart.playerChartP.libs" :data-position="lib.position"
                                      :key="lib.id">
                                    {{ lib.formatValue }}
                                </span>
                            </span>
          <span v-else>
                                {{ $t('global.noScore') }}
                            </span>
        </td>
        <td v-if="isAuthenticated" :data-header="$t('global.myRank')">
                            <span v-if="chart.playerChartP != null">
                                {{ chart.playerChartP.rank }}/{{ number(chart.nbPost) }}
                            </span>
        </td>
        <td v-if="chart.playerChart1 != null" :data-header="$t('global.topScore')">
                            <span v-for="lib in chart.playerChart1.libs" :data-position="lib.position"
                                  :key="lib.id">
                                {{ lib.formatValue }}
                            </span>
        </td>
        <td v-else>
          {{ $t('global.noScore') }}
        </td>
        <td v-if="chart.playerChart1 != null" :data-header="$t('player.pseudo')">
          <player v-if="chart.playerChart1.nbEqual === 1" v-bind:player="chart.playerChart1.player"></player>
          <span v-else>{{ chart.playerChart1.nbEqual }} {{ $t('global.players') }}</span>
        </td>
        <td v-else></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Chart from '@/components/vgr/chart/Chart.vue';
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'TopScore',
  props: ['charts'],
  components: {
    'player': Player,
    'chart': Chart,
  },
};
</script>
