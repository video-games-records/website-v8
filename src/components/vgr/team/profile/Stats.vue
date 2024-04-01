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
          <th scope="row">{{ $t('global.leaderboard') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(team.rankCup) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(team.rankMedal) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.platinum') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(team.gameRank0) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(team.chartRank0) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.gold') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(team.gameRank1) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(team.chartRank1) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.silver') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(team.gameRank2) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(team.chartRank2) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.bronze') }}</th>
          <td :data-header="$t('global.cupsLowercase')">{{ number(team.gameRank3) }}</td>
          <td :data-header="$t('global.medalsLowercase')">{{ number(team.chartRank3) }}</td>
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
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ $t('global.leaderboard') }}</th>
          <td :data-header="$t('global.gamePoints')">{{ number(team.rankPointGame) }}</td>
          <td :data-header="$t('global.recordPoints')">{{ number(team.rankPointChart) }}</td>
          <td :data-header="$t('global.badgePoints')">{{ number(team.rankBadge) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t('global.points') }}</th>
          <td :data-header="$t('global.gamePoints')">{{ number(team.pointGame) }}</td>
          <td :data-header="$t('global.recordPoints')">{{ number(team.pointChart) }}</td>
          <td :data-header="$t('global.badgePoints')">{{ number(team.pointBadge) }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script>
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Filters],
  name: 'TeamProfileStats',
  props: ['team'],
};
</script>


