<template>
  <v-card>
    <v-card-title class="bg-primary pa-1">{{ $t('leaderboard.cup.caption') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th class="center" scope="col">#</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <template v-if="this.$vuetify.display.mobile">
          <th class="right" scope="col">
            <platinum />#<gold />#<silver />#<bronze />
          </th>
        </template>
        <template v-else>
          <th class="right" scope="col">
            <platinum />
          </th>
          <th class="right" scope="col">
            <gold />
          </th>
          <th class="right" scope="col">
            <silver />
          </th>
          <th class="right" scope="col">
            <bronze />
          </th>
        </template>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankCup" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
        <td class="pl-2 center">{{ item.rankCup }}</td>
        <td class="pa-0">
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <template v-if="this.$vuetify.display.mobile">
          <td class="pr-3 right">{{ number(item.gameRank0) }}#{{ number(item.gameRank1) }}#{{ number(item.gameRank2) }}#{{ number(item.gameRank3) }}</td>
        </template>
        <template v-else>
          <td class="pr-3 right">{{ number(item.gameRank0) }}</td>
          <td class="pr-3 right">{{ number(item.gameRank1) }}</td>
          <td class="pr-3 right">{{ number(item.gameRank2) }}</td>
          <td class="pr-3 right">{{ number(item.gameRank3) }}</td>
        </template>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Security from "@/mixins/Security.vue";
import Platinum from "@/components/vgr/tools/cup/Platinum.vue";
import Silver from "@/components/vgr/tools/cup/Silver.vue";
import Bronze from "@/components/vgr/tools/cup/Bronze.vue";
import Gold from "@/components/vgr/tools/cup/Gold.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'PlayerLeaderboardCup',
  props: {
    'leaderboard': {
      require: true,
    }
  },
  components: {
    Gold, Bronze, Silver, Platinum,
    'player': Player,
    'country': Country,
  },
  methods: {
    getPlayerId(item) {
      if (item.player) {
        return item.player.id;
      } else {
        return item.id;
      }
    },
  },
};
</script>
