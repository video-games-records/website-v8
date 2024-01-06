<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.cup.caption') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th scope="col">
          <span class="platinum" :title="$t('global.platinum')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.platinum') }}</span>
          </span>
        </th>
        <th scope="col">
          <span class="gold" :title="$t('global.gold')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.gold') }}</span>
          </span>
        </th>
        <th scope="col">
          <span class="silver" :title="$t('global.silver')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.silver') }}</span>
          </span>
        </th>
        <th scope="col">
          <span class="bronze" :title="$t('global.bronze')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.bronze') }}</span>
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankCup" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
        <td>{{ item.rankCup }}</td>
        <td>
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <td :data-header="$t('global.platinum')">{{ item.gameRank0 }}</td>
        <td :data-header="$t('global.gold')">{{ item.gameRank1 }}</td>
        <td :data-header="$t('global.silver')">{{ item.gameRank2 }}</td>
        <td :data-header="$t('global.bronze')">{{ item.gameRank3 }}</td>
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
  name: 'PlayerLeaderboardCup',
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
