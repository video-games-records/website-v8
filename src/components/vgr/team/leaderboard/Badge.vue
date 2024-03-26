<template>
  <v-card>
    <v-card-title class="bg-primary pa-2">{{ $t('leaderboard.badges.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th class="center" scope="col">#</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th class="right" scope="col">{{ $t('global.badgePoints') }}</th>
        <th class="right" scope="col">{{ $t('badge.type.master') }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankBadge" :key="item.id"
          :class="[isAuthenticated && getAuthenticatedPlayer.team && getAuthenticatedPlayer.team.id === item.id ? 'player--me' : 'player' ]">
        <td class="pl-2 center">{{ item.rankBadge }}</td>
        <td class="pa-0">
          <team v-bind:team="item" v-bind:show-avatar="true"></team>
        </td>
        <td class="pr-3 right">{{ number(item.pointBadge) }}</td>
        <td class="pr-3 right">{{ number(item.nbMasterBadge) }}</td>
        <td>
          <v-btn @click="openModal(item)" icon="mdi-account-multiple" size="x-small"></v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-dialog v-model="dialog">
    <v-card class="pa-5">
      <v-card-title class="d-flex justify-center">{{ team.libTeam }}</v-card-title>
      <v-card-item :class="this.$vuetify.display.mobile ? 'pa-1 mb-5' : 'mb-5'">
        <leaderboard-player-badge
            v-bind:leaderboard=leaderboardPlayer
        ></leaderboard-player-badge>
      </v-card-item>
    </v-card>
  </v-dialog>

</template>


<script>
import Team from '@/components/vgr/team/Team.vue';
import Security from "@/mixins/Security.vue";
import LeaderboardPlayerBadge from "@/components/vgr/player/leaderboard/Badge.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'LeaderboardMedal',
  components: { LeaderboardPlayerBadge, Team},
  props: {
    'leaderboard': {
      require: true,
    },
    'callback': {
      require: true,
      type: String
    },
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
      this.team = item;

      this.axios.get(this.callback + this.team.id)
          .then(response => {
            this.leaderboardPlayer = response.data['hydra:member']
          })

      this.dialog = true;
    },
  },
};
</script>
