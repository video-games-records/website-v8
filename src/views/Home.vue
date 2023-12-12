<template>

    <v-row>
      <v-col cols="12" md="6" lg="3">
        <leaderboard-player-point></leaderboard-player-point>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <leaderboard-player-cup></leaderboard-player-cup>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <leaderboard-team-point></leaderboard-team-point>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <leaderboard-team-cup></leaderboard-team-cup>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <game-day />
      </v-col>
      <game-last />
    </v-row>


</template>

<script>
import LeaderboardPlayerPoint from '@/components/vgr/player/leaderboard/home/PointGame';
import LeaderboardPlayerCup from '@/components/vgr/player/leaderboard/home/Cup';
import LeaderboardTeamPoint from '@/components/vgr/team/leaderboard/home/PointGame';
import LeaderboardTeamCup from '@/components/vgr/team/leaderboard/home/Cup';
import GameDay from "@/components/vgr/game/Day.vue";
import GameLast from "@/components/vgr/game/Last.vue";

export default {
  name: 'vgrHome',
  components: {
    GameLast,
    GameDay,
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
