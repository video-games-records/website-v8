<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.gamePoints.caption') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th scope="col">{{ $t('global.gamePoints') }}</th>
        <th scope="col">{{ $t('global.games') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === item.id ? 'player--me' : 'player' ]">
        <td>{{ item.rankPointGame }}</td>
        <td>
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <td :data-header="$t('global.gamePoints')" class="right">{{ number(item.pointGame) }}</td>
        <td :data-header="$t('global.gamesLowercase')" class="right">{{ number(item.nbGame) }}</td>
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
  name: 'PlayerLeaderboardPointGame',
  props: {
    'leaderboard': {
      require: true,
    }
  },
  components: {
    'player': Player,
    'country': Country,
  },
};
</script>
