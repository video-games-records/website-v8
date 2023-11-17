<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <leaderboard-player-point></leaderboard-player-point>
      </v-col>
      <v-col cols="12" md="4" lg="3">
        <leaderboard-player-cup></leaderboard-player-cup>
      </v-col>
      <v-col cols="12" md="4" lg="3">
        <leaderboard-team-point></leaderboard-team-point>
      </v-col>
      <v-col cols="12" md="4" lg="3">
        <leaderboard-team-cup></leaderboard-team-cup>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import LeaderboardPlayerPoint from '@/components/vgr/player/leaderboard/home/PointGame';
import LeaderboardPlayerCup from '@/components/vgr/player/leaderboard/home/Cup';
import LeaderboardTeamPoint from '@/components/vgr/team/leaderboard/home/PointGame';
import LeaderboardTeamCup from '@/components/vgr/team/leaderboard/home/Cup';

export default {
  name: 'vgrHome',
  components: {
    LeaderboardPlayerPoint,
    LeaderboardPlayerCup,
    LeaderboardTeamPoint,
    LeaderboardTeamCup
  },
  data() {
    return {
    };
  },
  created() {
    document.title = "Video Games Records";
  },
}
</script>
