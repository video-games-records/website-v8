<template>
  <v-card>
    <v-card-title class="bg-primary pa-1">{{ $t('leaderboard.cup.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th class="center" scope="col">#</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th class="right" scope="col">
          <span class="platinum" :title="$t('global.platinum')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.platinum') }}</span>
          </span>
        </th>
        <th class="right" scope="col">
          <span class="gold" :title="$t('global.gold')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.gold') }}</span>
          </span>
        </th>
        <th class="right" scope="col">
          <span class="silver" :title="$t('global.silver')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.silver') }}</span>
          </span>
        </th>
        <th class="right" scope="col">
          <span class="bronze" :title="$t('global.bronze')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true"
                   focusable="false">
                  <use xlink:href="#cup"/>
              </svg>
              <span class="d-sr-only">{{ $t('global.bronze') }}</span>
          </span>
        </th>
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
        <td class="pr-3 right">{{ item.gameRank0 }}</td>
        <td class="pr-3 right">{{ item.gameRank1 }}</td>
        <td class="pr-3 right">{{ item.gameRank2 }}</td>
        <td class="pr-3 right">{{ item.gameRank3 }}</td>
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

export default {
  mixins: [Security],
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
