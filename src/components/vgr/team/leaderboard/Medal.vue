<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.medal.captionTeam') }}</v-card-title>
    <v-table density="compact" class="leaderboard">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.rank') }}</th>
        <th scope="col">{{ $t('global.nickname') }}</th>
        <th scope="col" class="">
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
          :class="[isAuthenticated && getAuthenticatedPlayer.team && getAuthenticatedPlayer.team.id === getTeamId(item) ? 'player--me' : 'player' ]">
        <td>{{ item.rankMedal }}</td>
        <td v-if="item.team">
          <team v-bind:team="item.team" v-bind:show-avatar="true"></team>
        </td>
        <td v-else>
          <team v-bind:team="item" v-bind:show-avatar="true"></team>
        </td>
        <td :data-header="$t('global.platinum')" class="right">{{ number(item.chartRank0) }}</td>
        <td :data-header="$t('global.gold')" class="right">{{ number(item.chartRank1) }}</td>
        <td :data-header="$t('global.silver')" class="right">{{ number(item.chartRank2) }}</td>
        <td :data-header="$t('global.bronze')" class="right">{{ number(item.chartRank3) }}</td>
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
