<template>
  <v-card>
    <v-card-title>{{ $t('leaderboard.recordPoints.caption') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th v-if="isGameRanking" scope="col">{{ $t('global.gamePoints') }}</th>
        <th scope="col">{{ $t('global.recordPoints') }}</th>
        <th scope="col">{{ $t('global.scores') }}</th>
        <th scope="col">{{ $t('global.proofs') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointChart" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
        <td>{{ getRank(item) }}</td>
        <td v-if="item.player">
          <country v-bind:country="item.player.country"></country>
          <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
        </td>
        <td v-else>
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <td v-if="isGameRanking" :data-header="$t('global.gamePoints')">
          {{ number(item.pointGame) }}
        </td>
        <td :data-header="$t('global.recordPoints')">
          {{ number(item.pointChart) }}
        </td>
        <td :data-header="$t('global.scoresLowercase')">
          {{ number(item.nbChart) }}
        </td>
        <td :data-header="$t('global.proofsLowercase')">
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



