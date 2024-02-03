<template>
  <v-card>
    <v-card-title class="bg-primary pa-1">{{ $t('leaderboard.recordPoints.caption') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th class="center" scope="col">#</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th class="right" v-if="isGameRanking" scope="col">{{ $t('global.gamePoints') }}</th>
        <th class="right" scope="col">{{ $t('global.recordPoints') }}</th>
        <th class="right hidden-md-and-down" v-if="origin !== 'charts'" scope="col">{{ $t('global.scores') }}</th>
        <th class="right hidden-md-and-down" v-if="origin !== 'charts'" scope="col">{{ $t('global.proofs') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointChart" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
        <td class="pl-2 center">{{ getRank(item) }}</td>
        <td class="pa-0" v-if="item.player">
          <country v-bind:country="item.player.country"></country>
          <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
        </td>
        <td class="pa-0" v-else>
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <td class="pr-3 right" v-if="isGameRanking">
          {{ number(item.pointGame) }}
        </td>
        <td class="pr-3 right">
          {{ number(item.pointChart) }}
        </td>
        <td v-if="origin !== 'charts'" class="pr-3 right hidden-md-and-down">
          {{ number(item.nbChart) }}
        </td>
        <td v-if="origin !== 'charts'" class="pr-3 right hidden-md-and-down">
          {{ number(item.nbChartProven) }}
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'PlayerLeaderboardPointChart',
  props: {
    'leaderboard': {
      require: true,
    },
    'origin': {
      require: true,
      type: String,
      default: 'default'
    }
  },
  components: {
    'player': Player,
    'country': Country,
  },
  methods: {
    getRank(item) {
      if (item.rankPointChart !== undefined) {
        return item.rankPointChart;
      } else {
        return item.rank;
      }
    },
    getPlayerId(item) {
      if (item.player) {
        return item.player.id;
      } else {
        return item.id;
      }
    },
  },
  computed: {
    isGameRanking() {
      return this.$route.name === 'GameIndex';
    },
  },
};
</script>



