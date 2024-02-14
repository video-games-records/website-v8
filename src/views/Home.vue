<template>
    <v-row>
      <v-col cols="12" md="6" lg="5">
        <game-last-updated-score />
      </v-col>
      <v-col cols="12" md="6" lg="7">
        <game-last-published />
      </v-col>
      <v-col cols="12" md="6" lg=4>
        <article-last-published />
      </v-col>
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
      <v-col cols="12" md="6" lg="2">
        <game-day />
      </v-col>
    </v-row>
</template>

<script>
import LeaderboardPlayerPoint from '@/components/vgr/player/leaderboard/home/PointGame';
import LeaderboardPlayerCup from '@/components/vgr/player/leaderboard/home/Cup';
import LeaderboardTeamPoint from '@/components/vgr/team/leaderboard/home/PointGame';
import LeaderboardTeamCup from '@/components/vgr/team/leaderboard/home/Cup';
import GameDay from "@/components/vgr/game/Day.vue";
import GameLastPublished from "@/components/vgr/game/LastPublished.vue";
import GameLastUpdatedScore from "@/components/vgr/game/LastUpdatedScore.vue";
import ArticleLastPublished from "@/components/article/LastPublished.vue";

export default {
  name: 'vgrHome',
  components: {
    ArticleLastPublished,
    GameLastPublished,
    GameLastUpdatedScore,
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
