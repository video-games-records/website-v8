<template>
  <v-card>
    <v-card-title>{{ $t('leaderboard.recordPoints.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th v-if="showGamePoints" scope="col">{{ $t('global.gamePoints') }}</th>
        <th scope="col">{{ $t('global.recordPoints') }}</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointChart" :key="item.id" :class="[isAuthenticated && getPlayer.team && getPlayer.team.id === getTeamId(item) ? 'player--me' : 'player' ]">
        <td class="leaderboard-points-team__rank">{{ item.rankPointChart }}</td>
        <td v-if="item.team" class="leaderboard-points-team__nickname">
          <team v-bind:team="item.team" v-bind:show-avatar="true"></team>
        </td>
        <td v-else class="leaderboard-points-team__nickname">
          <team v-bind:team="item" v-bind:show-avatar="true"></team>
        </td>
        <td v-if="showGamePoints" :data-header="$t('global.gamePoints')">
          {{ item.pointGame | number }}
        </td>
        <td :data-header="$t('global.recordPoints')">
          {{ item.pointChart | number }}
        </td>
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
      <v-card-item>
        <leaderboard-player-point-chart v-bind:leaderboard=leaderboardPlayer></leaderboard-player-point-chart>
      </v-card-item>
    </v-card>
  </v-dialog>

</template>


<script>
import Team from '@/components/vgr/team/Team.vue';
import LeaderboardPlayerPointChart from '@/components/vgr/player/leaderboard/PointChart';
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'TeamLeaderboardPointChart',
  props: {
    'leaderboard': {
      require: true,
    },
    'callback': {
      require: true,
      type: String
    },
    'showGamePoints': {
      require: false,
      type: Boolean,
      default: false
    }
  },
  components: {Team, LeaderboardPlayerPointChart},
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
        return item.team.id;
      } else {
        return item.id;
      }
    },
  },
};
</script>
