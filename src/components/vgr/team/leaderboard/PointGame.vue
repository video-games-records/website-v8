<template>
  <v-card>
    <v-card-title>{{ $t('leaderboard.gamePoints.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th scope="col">{{ $t('global.gamePoints') }}</th>
        <th scope="col">{{ $t('global.games') }}</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id">
        <td>{{ item.rankPointGame }}</td>
        <td v-if="item.team">
          <team v-bind:team="item.team" v-bind:show-avatar="showAvatar"></team>
        </td>
        <td v-else>
          <team v-bind:team="item" v-bind:show-avatar="showAvatar"></team>
        </td>
        <td :data-header="$t('global.gamePoints')">{{ item.pointGame | number }}</td>
        <td :data-header="$t('global.gamesLowercase')">{{ item.nbGame | number }}</td>
        <td>
          <v-btn @click="test(item)" icon="mdi-account-multiple"></v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import Team from '@/components/vgr/team/Team.vue';
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'LeaderboardPoint',
  props: {
    'leaderboard': {
      require: true,
    },
    'showAvatar': {
      default: true,
      type: Boolean,
    },
  },
  components: {Team},
  data() {
    return {
      leaderboardPlayer: null,
      dialog: false,
      team: {
        libTeam: '',
      },
    };
  },
  methods: {
    test(item) {
      alert('test');
      /*if (item.team) {
        this.team = item.team;
      } else {
        this.team = item;
      }
      this.dialog = true;
      if (this.$route.params.idGame) {
        this.leaderboardPlayer = GameApi.getPlayerRankingPoints(this.$route.params.idGame, {query: {'idTeam': this.team.id}})
            .then((response) => response);
      } else {
        this.leaderboardPlayer = PlayerApi.getRankingPointGame({query: {'idTeam': this.team.id}})
            .then((response) => response);
      }*/
    }
  },
};
</script>
