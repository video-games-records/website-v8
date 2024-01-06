<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.medal.caption') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th scope="col">
          <span class="platinum" :title="$t('global.platinum')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                  <use xlink:href="#medal" />
              </svg>
              <span class="screen-reader-text">{{ $t('global.platinum') }}</span>
          </span>
        </th>
        <th scope="col">
          <span class="gold" :title="$t('global.gold')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                  <use xlink:href="#medal" />
              </svg>
              <span class="screen-reader-text">{{ $t('global.gold') }}</span>
          </span>
        </th>
        <th scope="col">
          <span class="silver" :title="$t('global.silver')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                  <use xlink:href="#medal" />
              </svg>
              <span class="screen-reader-text">{{ $t('global.silver') }}</span>
          </span>
        </th>
        <th scope="col">
          <span class="bronze" :title="$t('global.bronze')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                  <use xlink:href="#medal" />
              </svg>
              <span class="screen-reader-text">{{ $t('global.bronze') }}</span>
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankMedal" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
        <td>{{ item.rankMedal }}</td>
        <td v-if="item.player">
          <country v-bind:country="item.player.country"></country>
          <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
        </td>
        <td v-else>
          <country v-bind:country="item.country"></country>
          <player v-bind:player="item" v-bind:show-avatar="true"></player>
        </td>
        <td :data-header="$t('global.platinum')" class="right">{{ number(item.chartRank0) }}</td>
        <td :data-header="$t('global.gold')" class="right">{{ number(item.chartRank1) }}</td>
        <td :data-header="$t('global.silver')" class="right">{{ number(item.chartRank2) }}</td>
        <td :data-header="$t('global.bronze')" class="right">{{ number(item.chartRank3) }}</td>
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
  name: 'PlayerLeaderboardMedal',
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
