<template>
  <v-card>
    <v-card-title class="bg-primary pa-2">{{ $t('leaderboard.medal.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th class="center" scope="col">#</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <template v-if="this.$vuetify.display.mobile">
          <th class="right" scope="col">
            <platinum />#<gold />
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
          :class="[isAuthenticated && getAuthenticatedPlayer.team && getAuthenticatedPlayer.team.id === getTeamId(item) ? 'player--me' : 'player' ]">
        <td class="pl-2 center">{{ item.rankMedal }}</td>
        <td class="pa-0" v-if="item.team">
          <team v-bind:team="item.team" v-bind:show-avatar="true"></team>
        </td>
        <td v-else class="pa-0">
          <team v-bind:team="item" v-bind:show-avatar="true"></team>
        </td>
        <template v-if="this.$vuetify.display.mobile">
          <td class="pr-3 right">{{ number(item.chartRank0) }}#{{ number(item.chartRank1) }}</td>
        </template>
        <template v-else>
          <td class="pr-3 right">{{ number(item.chartRank0) }}</td>
          <td class="pr-3 right">{{ number(item.chartRank1) }}</td>
          <td class="pr-3 right">{{ number(item.chartRank2) }}</td>
          <td class="pr-3 right">{{ number(item.chartRank3) }}</td>
        </template>
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
        <leaderboard-player-medal v-bind:leaderboard=leaderboardPlayer></leaderboard-player-medal>
      </v-card-item>
    </v-card>
  </v-dialog>

</template>


<script>
import Team from '@/components/vgr/team/Team.vue';
import LeaderboardPlayerMedal from "@/components/vgr/player/leaderboard/Medal.vue";
import Security from "@/mixins/Security.vue";
import Filters from "@/mixins/Filters.vue";
import Platinum from "@/components/vgr/tools/medal/Platinum.vue";
import Silver from "@/components/vgr/tools/medal/Silver.vue";
import Bronze from "@/components/vgr/tools/medal/Bronze.vue";
import Gold from "@/components/vgr/tools/medal/Gold.vue";

export default {
  mixins: [Security, Filters],
  name: 'TeamLeaderboardMedal',
  props: {
    'leaderboard': {
      require: true,
    },
    'callback': {
      require: true,
      type: String
    }
  },
  components: {
    Gold, Bronze, Silver, Platinum,
    LeaderboardPlayerMedal,
    Team,
  },
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
