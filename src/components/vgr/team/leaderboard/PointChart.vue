<template>
  <v-card>
    <v-card-title class="bg-primary pa-2">{{ $t('leaderboard.recordPoints.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th class="center" scope="col">#</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th class="right" v-if="showGamePoints" scope="col">{{ $t('global.gamePoints') }}</th>
        <th class="right" scope="col">{{ $t('global.recordPoints') }}</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankPointChart" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.team && getAuthenticatedPlayer.team.id === getTeamId(item) ? 'player--me' : 'player' ]">
        <td class="pl-2 center">{{ item.rankPointChart }}</td>
        <td class="pa-0" v-if="item.team">
          <team v-bind:team="item.team" v-bind:show-avatar="true"></team>
        </td>
        <td v-else class="pa-0">
          <team v-bind:team="item" v-bind:show-avatar="true"></team>
        </td>
        <td v-if="showGamePoints" class="pr-3 right">{{ number(item.pointGame) }}</td>
        <td class="pr-3 right">{{ number(item.pointChart) }}</td>
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
      <v-card-item :class="this.$vuetify.display.mobile ? 'pa-1 mb-5' : 'mb-5'">
        <leaderboard-player-point-chart
            v-bind:leaderboard=leaderboardPlayer
            :origin="getOrigin"
        ></leaderboard-player-point-chart>
      </v-card-item>
    </v-card>
  </v-dialog>

</template>


<script>
import Team from '@/components/vgr/team/Team.vue';
import LeaderboardPlayerPointChart from '@/components/vgr/player/leaderboard/PointChart';
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
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
  computed: {
    getOrigin() {
      let words = this.callback.split('/');
      return words[2];
    }
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
