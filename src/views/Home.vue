<template>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <stats />
      </v-col>
      <v-col cols="12" md="6" lg="5">
        <game-last-updated-score />
      </v-col>
      <v-col cols="12" md="6" lg="7">
        <game-last-published />
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
      <v-col cols="12" md="6" lg="6">
        <home-message />
      </v-col>
      <v-col cols="12" md="6" lg=3>
        <article-last-published />
      </v-col>
      <v-col cols="12" md="6" lg=3>
        <topic-last />
      </v-col>
      <v-col cols="12" md="6" lg="2">
        <game-day />
      </v-col>
      <v-col cols="12" md="6" lg="2">
        <partner-list />
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
import HomeMessage from "@/components/page/HomeMessage.vue";
import Stats from "@/components/Stats.vue";
import PartnerList from "@/components/partner/List.vue";
import TopicLast from "@/components/forum/topic/Last.vue";

export default {
  name: 'vgrHome',
  components: {
    TopicLast,
    PartnerList,
    HomeMessage,
    ArticleLastPublished,
    GameLastPublished,
    GameLastUpdatedScore,
    GameDay,
    LeaderboardPlayerPoint,
    LeaderboardPlayerCup,
    LeaderboardTeamPoint,
    LeaderboardTeamCup,
    Stats
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
