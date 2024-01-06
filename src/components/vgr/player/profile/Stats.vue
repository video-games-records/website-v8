<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-table density="compact">
        <thead>
        <tr>
          <td></td>
          <th scope="col">{{ $t('global.cups') }}</th>
          <th scope="col">{{ $t('global.medals') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ $t('global.leaderboard') }} ({{ $t('leaderboard.on') }} {{ number(getNbPlayer) }})</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(player.rankCup) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(player.rankMedal) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.platinum') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(player.gameRank0) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(player.chartRank0) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.gold') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(player.gameRank1) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(player.chartRank1) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.silver') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(player.gameRank2) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(player.chartRank2) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.bronze') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(player.gameRank3) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(player.chartRank3) }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="12" lg="6">
      <v-table density="compact">
        <thead>
        <tr>
          <td></td>
          <th scope="col">{{ $t('global.gamePoints') }}</th>
          <th scope="col">{{ $t('global.recordPoints') }}</th>
          <th scope="col">{{ $t('global.badgePoints') }}</th>
          <th scope="col">{{ $t('global.proofs') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ $t('global.leaderboard') }} ({{ $t('on') }} {{ number(getNbPlayer) }})</th>
          <td :data-header="$t('global.gamePoints')">{{ number(player.rankPointGame) }}</td>
          <td :data-header="$t('global.recordPoints')">{{ number(player.rankPointChart) }}</td>
          <td :data-header="$t('global.badgePoints')">{{ number(player.rankBadge) }}</td>
          <td :data-header="$t('global.proofsLowercase')">{{ number(player.rankProof) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.points') }}</th>
          <td :data-header="$t('global.gamePoints')">{{ number(player.pointGame) }}</td>
          <td :data-header="$t('global.recordPoints')">{{ number(player.pointChart) }}</td>
          <td :data-header="$t('global.badgePoints')">{{ number(player.pointBadge) }}</td>
          <td :data-header="$t('global.proofsLowercase')">{{ number(player.nbChartProven) }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script>
import Filters from "@/mixins/Filters.vue";

export default {
  mixins:[Filters],
  name: 'PlayerProfileStats',
  props: ['player'],
  computed: {
    getNbPlayer() {
      //return this.$store.getters['stats/data'][0];
      return 0
    },
  },
};
</script>


