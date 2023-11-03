<template>
    <table class="leaderboard-cups">
        <caption>{{ $t('leaderboard.cup.caption') }}</caption>
        <thead>
            <tr>
                <th scope="col">{{ $t('global.member') }}</th>
                <th scope="col">
                    <span class="platinum" :title="$t('global.platinum')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.platinum') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="gold" :title="$t('global.gold')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.gold') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="silver" :title="$t('global.silver')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.silver') }}</span>
                    </span>
                </th>
                <th scope="col">
                    <span class="bronze" :title="$t('global.bronze')">
                        <svg width="20" height="20" viewBox="0 0 50 50" class="svg-sprite" aria-hidden="true" focusable="false">
                            <use xlink:href="#cup" />
                        </svg>
                        <span class="screen-reader-text">{{ $t('global.bronze') }}</span>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in leaderboard" :data-rank="item.rankCup" :key="item.id">
                <td>
                    <player v-bind:player="item"></player>
                </td>
                <td :data-header="$t('global.platinum')">{{ item.gameRank0 }}</td>
                <td :data-header="$t('global.gold')">{{ item.gameRank1 }}</td>
                <td :data-header="$t('global.silver')">{{ item.gameRank2 }}</td>
                <td :data-header="$t('global.bronze')">{{ item.gameRank3 }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';

export default {
  name: 'LeaderboardMedal',
  components: {
    'player': Player,
  },
  data() {
    return {
      leaderboard: []
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
