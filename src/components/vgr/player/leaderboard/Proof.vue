<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.proofs.caption') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th scope="col">{{ $t('global.proofs') }}</th>
        <th scope="col">{{ $t('global.scoreProven') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankProof" :key="item.id"
          :class="[isAuthenticated && this.getAuthenticatedPlayer.id === item.id ? 'player--me' : 'player' ]">
        <td>{{ item.rankProof }}</td>
        <td>
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <td :data-header="$t('global.proofsLowercase')" class="right">{{ item.nbChartProven | number }}</td>
        <td :data-header="$t('global.scoreProvenMobile')" class="right">{{ percentage(item) | number }} %</td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'PlayerLeaderboardProof',
  props: {
    'leaderboard': {
      require: true,
    },
  },
  components: {
    'player': Player,
    'country': Country,
  },
  methods: {
    percentage(item) {
      return Math.round(item.nbChartProven / item.nbChart * 10000) / 100;
    }
  },
};
</script>
