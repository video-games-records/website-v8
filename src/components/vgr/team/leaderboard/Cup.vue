<template>
  <v-card>
    <v-card-title class="bg-primary pa-1">{{ $t('leaderboard.cup.captionTeam') }}</v-card-title>
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
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankCup" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.team && getAuthenticatedPlayer.team.id === getTeamId(item) ? 'player--me' : 'player' ]">
        <td class="pl-2 center">{{ item.rankCup }}</td>
        <td class="pa-0">
          <team v-bind:team="item" v-bind:show-avatar="true"></team>
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
        <leaderboard-player-cup v-bind:leaderboard=leaderboardPlayer></leaderboard-player-cup>
      </v-card-item>
    </v-card>
  </v-dialog>

</template>



<script>
import Team from '@/components/vgr/team/Team.vue';
import LeaderboardPlayerCup from "@/components/vgr/player/leaderboard/Cup.vue";
import Security from "@/mixins/Security.vue";
import Platinum from "@/components/vgr/tools/cup/Platinum.vue";
import Silver from "@/components/vgr/tools/cup/Silver.vue";
import Bronze from "@/components/vgr/tools/cup/Bronze.vue";
import Gold from "@/components/vgr/tools/cup/Gold.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'TeamLeaderboardCup',
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
    LeaderboardPlayerCup,
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
