<template>
  <v-list v-model:opened="open">
    <v-list-item :to="{ name: 'Home'}" title="Video Games Records" subtitle="Home"></v-list-item>
    <v-divider></v-divider>
    <v-list-group value="Games">
      <template v-slot:activator="{ props }">
        <v-list-item
            v-bind="props"
            prepend-icon="mdi-gamepad-variant"
            :title="$t('menu.games')"
        ></v-list-item>
      </template>
      <v-list-item :to="{ name: 'GameListByLetter', params: { letter: getLetter }}" :title="$t('menu.game.alpha')"></v-list-item>
      <v-list-item :to="{ name: 'PlatformIndex', params: { id: getPlatform.id, slugPlatform: getPlatform.slug}}">{{ $t('menu.game.platform') }}</v-list-item>
      <v-list-item :to="{ name: 'SerieIndex', params: { id: getSerie.id, slugSerie: getSerie.slug}}">{{ $t('menu.game.serie') }}</v-list-item>
      <v-list-item :to="{ name: 'GameNext'}" :title="$t('menu.game.next')"></v-list-item>
      <v-list-item :to="{ name: 'GameLast'}" :title="$t('menu.game.last')"></v-list-item>
    </v-list-group>
    <v-list-item :to="{ name: 'PlayerList'}" :title="$t('menu.players')" prepend-icon="mdi-ghost-outline"></v-list-item>
    <v-list-item :to="{ name: 'TeamList'}" :title="$t('menu.teams')" prepend-icon="mdi-star-face"></v-list-item>
    <v-list-item :to="{ name: 'ForumHome'}" :title="$t('menu.forum')" prepend-icon="mdi-forum"></v-list-item>
    <v-list-group value="Rankings">
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          prepend-icon="mdi-medal"
          :title="$t('menu.rankings')"
      ></v-list-item>
    </template>
    <v-list-item :to="{ name: 'LeaderboardPointGame'}" :title="$t('menu.ranking.pointGame')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardCup'}" :title="$t('menu.ranking.cups')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardPointChart'}" :title="$t('menu.ranking.pointChart')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardMedal'}" :title="$t('menu.ranking.medals')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardBadge'}" :title="$t('menu.ranking.badge')"></v-list-item>
    <v-list-item :to="{ name: 'LeaderboardProof'}" :title="$t('menu.ranking.proof')"></v-list-item>
    </v-list-group>

    <v-list-group value="TheSite">
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          prepend-icon="mdi-information"
          :title="$t('menu.site')"
      ></v-list-item>
    </template>
    <v-list-item :to="{ name: 'Rules'}" :title="$t('menu.rules')"></v-list-item>
    <v-list-item :to="{ name: 'Faq'}" :title="$t('menu.faq')"></v-list-item>
    <v-list-item :to="{ name: 'Credits'}" :title="$t('menu.credits')"></v-list-item>
    <v-list-item :to="{ name: 'Donations'}" :title="$t('menu.donations')"></v-list-item>
    <v-list-item :to="{ name: 'Recruitment'}" :title="$t('menu.recruitments')"></v-list-item>
    <v-list-item :to="{ name: 'TheVgrTeam'}" :title="$t('menu.staff')"></v-list-item>
    </v-list-group>
    <v-list-item :to="{ name: 'PlayerChartSearch'}" :title="$t('menu.searchScore')" prepend-icon="mdi-magnify"></v-list-item>
    <v-list-item :href="getYoutubeUrl" :title="$t('menu.video')" prepend-icon="mdi-video"></v-list-item>
  </v-list>
</template>


<script>
import { useAppStore } from '@/store/app';
export default {
  data: () => ({
    open: [],
  }),
  computed: {
    getLetter() {
      return useAppStore().getLetter;
    },
    getPlatform() {
      return useAppStore().getPlatform;
    },
    getSerie() {
      return useAppStore().getSerie;
    },
    getYoutubeUrl() {
      return import.meta.env.VITE_VGR_YOUTUBE_URL;
    },
  },
}
</script>