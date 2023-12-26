<template>
  <div>
    <h2>{{ $t('global.leaderboard') }}</h2>

    <v-table class="leaderboard">
      <caption class="screen-reader-text">{{ $t('leaderboard.recordPoints.caption') }}</caption>
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th scope="col">{{ $t('global.platformPoints') }}</th>
        <th scope="col">{{ $t('global.scores') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointPlatform" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.id === item.id ? 'player--me' : 'player' ]">
        <td>{{ item.rankPointPlatform }}</td>
        <td>
          <country v-bind:country="item.player.country"></country>
          <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
        </td>
        <td :data-header="$t('global.platformPoints')">
          {{ number(item.pointPlatform) }}
        </td>
        <td :data-header="$t('global.scoresLowercase')">
          {{ number(item.nbChart) }}
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";


export default {
  mixins: [Security, Filters],
  name: 'PlatformLeaderboard',
  components: {Country, Player},
  data() {
    return {
      leaderboard: [],
    };
  },
  created() {
    this.load();
  },
  watch: {
    '$route'() {
      this.load();
    }
  },
  methods: {
    load() {
      this.axios.get('/api/platforms/' + this.$route.params.id + '/player-ranking-point?maxRank=100')
          .then(response => {
            this.leaderboard = response.data['hydra:member']
          })
    },
  },
};
</script>
