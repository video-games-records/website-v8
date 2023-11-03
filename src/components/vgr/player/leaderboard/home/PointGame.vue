<template>
    <table class="leaderboard-points">
        <caption>{{ $t('leaderboard.gamePoints.caption') }}</caption>
        <thead>
            <tr>
                <th scope="col">{{ $t('global.member') }}</th>
                <th scope="col">{{ $t('global.gamePoints') }}</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="item in leaderboard" :data-rank="item.rankPointGame" :key="item.id">
                    <td>
                        <player v-bind:player="item"></player>
                    </td>
                    <td :data-header="$t('global.gamePoints')">{{ item.pointGame|number }}</td>
                </tr>
            </tbody>
    </table>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue'

export default {
  name: 'LeaderboardPoint',
  components: {
    'player': Player,
  },
  data() {
    return {
      leaderboard: [],
    };
  },
  created() {
    this.axios.get('/api/players/ranking-point-game?maxTank=5', {useCache: true})
      .then(response => {
        this.leaderboard = response.data['hydra:member']
      })
  }
};
</script>
