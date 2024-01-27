<template>
  <v-card>
    <v-card-title class="bg-primary pa-1">{{ $t('leaderboard.medal.caption') }}</v-card-title>
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
      <tr v-for="item in leaderboard" :data-rank="item.rankMedal" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
        <td class="pl-2 center">{{ item.rankMedal }}</td>
        <td class="pa-0" v-if="item.player">
          <country v-bind:country="item.player.country"></country>
          <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
        </td>
        <td class="pa-0" v-else>
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <template v-if="this.$vuetify.display.mobile">
          <td class="pr-3 right">{{ number(item.chartRank0) }}#{{ number(item.chartRank1) }}#{{ number(item.chartRank2) }}#{{ number(item.chartRank3) }}</td>
        </template>
        <template v-else>
          <td class="pr-3 right">{{ number(item.chartRank0) }}</td>
          <td class="pr-3 right">{{ number(item.chartRank1) }}</td>
          <td class="pr-3 right">{{ number(item.chartRank2) }}</td>
          <td class="pr-3 right">{{ number(item.chartRank3) }}</td>
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
import Filters from "@/mixins/Filters.vue";
import Platinum from "@/components/vgr/tools/medal/Platinum.vue";
import Gold from "@/components/vgr/tools/medal/Gold.vue";
import Silver from "@/components/vgr/tools/medal/Silver.vue";
import Bronze from "@/components/vgr/tools/medal/Bronze.vue";
export default {
  mixins: [Security, Filters],
  name: 'PlayerLeaderboardMedal',
  props: {
    'leaderboard': {
      require: true,
    }
  },
  components: {Player, Country, Platinum, Gold, Silver, Bronze},
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
