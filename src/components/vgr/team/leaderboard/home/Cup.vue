<template>
  <v-card variant="outlined">
    <v-card-title>{{ $t('leaderboard.cup.captionTeam') }}</v-card-title>
    <v-progress-linear v-if="leaderboard.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <v-table density="compact">
      <thead>
      <tr>
        <th scope="col">{{ $t('global.team') }}</th>
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
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in leaderboard" :data-rank="item.rankCup" :key="item.id">
        <td class="pa-1">
          <team v-bind:team="item"></team>
        </td>
        <td class="pr-3 right">{{ item.gameRank0 }}</td>
        <td class="pr-3 right">{{ item.gameRank1 }}</td>
        <td class="pr-3 right">{{ item.gameRank2 }}</td>
        <td class="pr-3 right">{{ item.gameRank3 }}</td>
      </tr>
      </tbody>

    </v-table>
  </v-card>
</template>

<script>
import Team from '@/components/vgr/team/Team.vue';

export default {
  name: 'LeaderboardCup',
  components: {
    'team': Team,
  },
  data() {
    return {
      leaderboard: []
    };
  },
  created() {
    this.axios.get('/api/teams/ranking-cup?maxTank=5', {useCache: true})
        .then(response => {
          this.leaderboard = response.data['hydra:member']
        })
  }
};
</script>
