<template>
  <div>
    <group-switch v-if="canSwitchGroup"/>

    <chart-switch v-if="canSwitchChart"/>

    <maj-platform v-if="!this.$vuetify.display.mobile && hasRolePlayer && (getGame.platforms.length > 1)" :game="getGame"/>

    <game-forum-link v-if="!this.$vuetify.display.mobile" :game="getGame" />

    <game-rules-link v-if="!this.$vuetify.display.mobile" :game="getGame" />

    <game-serie-link v-if="!this.$vuetify.display.mobile" :game="getGame" />

    <!-- blocRight -->
    <Adsense
      v-if="!this.$vuetify.display.mobile"
      data-ad-client="ca-pub-1465216138455560"
      data-ad-slot="1120943067"
    />


    <v-card v-if="!this.$vuetify.display.mobile" class="ma-2">
      <v-card-title></v-card-title>
      <v-card-item>
        <v-img src="https://s3.eu-west-3.amazonaws.com/picture.video-games-records.com/partenariat/vgr/120-600_4.jpg" />
      </v-card-item>
    </v-card>

    <v-card v-if="!this.$vuetify.display.mobile" class="ma-2" variant="outlined">
      <v-card-title class="bg-primary">{{ $t('aside.donate.title') }}</v-card-title>
      <v-card-item class="d-flex justify-center">
        <span v-html="$t('aside.donate.message')" />
      </v-card-item>
      <v-card-actions>
        <v-btn href="https://streamlabs.com/videogamesrecords/tip" target="_blank">{{ $t('aside.donate.action') }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import GroupSwitch from '@/components/vgr/group/Switch.vue';
import ChartSwitch from '@/components/vgr/chart/Switch.vue';
import MajPlatform from '@/components/vgr/playerChart/form/MajPlatform.vue'
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import SerieCard from "@/components/vgr/serie/Card.vue";
import GameForumLink from "@/components/vgr/game/GameForumLink.vue";
import GameRulesLink from "@/components/vgr/game/GameRulesLink.vue";
import GameSerieLink from "@/components/vgr/game/GameSerieLink.vue";

export default {
  components: {GameSerieLink, GameRulesLink, GameForumLink, SerieCard, GroupSwitch, ChartSwitch, MajPlatform},
  mixins: [Security],
  name: 'GameAside',
  props: ['game'],
  data() {
    return {
      adsense: '',
    };
  },
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    canSwitchGroup() {
      const routes = ['GroupIndex', 'GroupSubmit', 'ChartIndex', 'ChartSubmit', 'PlayerChartIndex'];
      return routes.indexOf(this.$route.name) !== -1;
    },
    canSwitchChart() {
      const routes = ['ChartIndex', 'ChartSubmit', 'PlayerChartIndex'];
      return routes.indexOf(this.$route.name) !== -1;
    }
  },
};
</script>
