<template>
  <v-card>
    <v-card-title class="bg-primary">{{ $t('leaderboard.cup.caption') }}</v-card-title>
    <v-table density="compact">
      <thead>
        <tr>
          <th scope="col">{{ $t('global.member') }}</th>
          <th class="right" scope="col">
            <span class="platinum" :title="$t('global.platinum')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#cup" />
              </svg>
              <span class="d-sr-only">{{ $t('global.platinum') }}</span>
            </span>
          </th>
          <th class="right" scope="col">
            <span class="gold" :title="$t('global.gold')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#cup" />
              </svg>
              <span class="d-sr-only">{{ $t('global.gold') }}</span>
            </span>
          </th>
          <th class="right" scope="col">
            <span class="silver" :title="$t('global.silver')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#cup" />
              </svg>
              <span class="d-sr-only">{{ $t('global.silver') }}</span>
            </span>
          </th>
          <th class="right" scope="col">
            <span class="bronze" :title="$t('global.bronze')">
              <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                <use xlink:href="#cup" />
              </svg>
              <span class="d-sr-only">{{ $t('global.bronze') }}</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in leaderboard" :data-rank="item.rankCup" :key="item.id">
          <td class="pa-0">
              <player v-bind:player="item"></player>
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
import Player from '@/components/vgr/player/Player.vue';

export default {
  name: 'LeaderboardCup',
  components: {
    'player': Player,
  },
  data() {
    return {
      leaderboard: []
    };
  },
  created() {
    this.axios.get('/api/players/ranking-cup?maxTank=5', {useCache: true})
      .then(response => {
        this.leaderboard = response.data['hydra:member']
      })
  }
};
</script>
