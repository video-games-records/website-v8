<template>
  <v-card>
    <v-card-title class="bg-primary pa-1">{{ $t('leaderboard.gamePoints.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th class="center" scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th class="right" scope="col">{{ $t('global.gamePoints') }}</th>
        <th class="right" v-if="!this.$vuetify.display.mobile" scope="col">{{ $t('global.games') }}</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.team && getAuthenticatedPlayer.team.id === getTeamId(item) ? 'player--me' : 'player' ]">
        <td class="center">{{ item.rankPointGame }}</td>
        <td v-if="item.team">
          <team v-bind:team="item.team" v-bind:show-avatar="true"></team>
        </td>
        <td v-else>
          <team v-bind:team="item" v-bind:show-avatar="true"></team>
        </td>
        <td class="right">{{ number(item.pointGame) }}</td>
        <td class="right" v-if="!this.$vuetify.display.mobile">{{ number(item.nbGame) }}</td>
        <td>
          <v-btn @click="openModal(item)" icon="mdi-account-multiple" size="x-small"></v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="d-flex justify-center">{{ team.libTeam }}</v-card-title>
      <v-card-item class="pa-1 mb-5">
        <leaderboard-player-point-game v-bind:leaderboard=leaderboardPlayer></leaderboard-player-point-game>
      </v-card-item>
    </v-card>
  </v-dialog>

</template>

<script>
import Team from '@/components/vgr/team/Team.vue';
import Security from "@/mixins/Security.vue";
import LeaderboardPlayerPointGame from '@/components/vgr/player/leaderboard/PointGame';
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'TeamLeaderboardPointGame',
  props: {
    'leaderboard': {
      require: true,
    },
    'callback': {
      require: true,
      type: String
    }
  },
  components: {Team, LeaderboardPlayerPointGame},
  data() {
    return {
      leaderboardPlayer: [],
      dialog: false,
      team: {
        libTeam: '',
      },
    };
  },
  methods: {
    openModal(item) {
      if (item.team) {
        this.team = item.team;
      } else {
        this.team = item;
      }

      this.axios.get(this.callback + this.team.id)
        .then(response => {
          this.leaderboardPlayer = response.data['hydra:member']
        })

      this.dialog = true;
    },
    getTeamId(item) {
      if (item.team) {
        return item.team.id ?? item.id;
      } else {
        return item.id;
      }
    },
  },
};
</script>
