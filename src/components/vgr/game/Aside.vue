<template>
  <div>
    <group-switch v-if="canSwitchGroup"></group-switch>

    <chart-switch v-if="canSwitchChart"></chart-switch>

    <maj-platform v-bind:game=getGame v-if="!this.$vuetify.display.mobile && hasRolePlayer && (getGame.platforms.length > 1)"></maj-platform>

    <v-card v-if="!this.$vuetify.display.mobile" class="ma-2">
      <v-card-title>{{ $t('game.rules.title') }}</v-card-title>
      <v-card-item>
        <div v-if="getGame.rules && getGame.rules.length > 0">
          <div v-for="rule in getGame.rules" :data-position="rule.position" :key="rule.id" v-html="rule.text" />
        </div>
        <div v-else>{{ $t('game.rules.none') }}</div>
        <router-link :to="{ name: 'Rules'}">{{ $t('game.rules.seeGeneral') }}</router-link>
      </v-card-item>
    </v-card>

    <v-card v-if="getGame.serie && !this.$vuetify.display.mobile" class="ma-2 bg-orange-lighten-2">
      <v-card-title>Série</v-card-title>
      <v-card-item class="d-flex justify-center">
        <serie-card :serie="getGame.serie" />
      </v-card-item>
    </v-card>

    <v-card v-if="!this.$vuetify.display.mobile" class="ma-2">
      <v-card-title></v-card-title>
      <v-card-item>
        <v-img src="https://s3.eu-west-3.amazonaws.com/picture.video-games-records.com/partenariat/vgr/120-600_4.jpg" />
      </v-card-item>
    </v-card>

    <v-card v-if="!this.$vuetify.display.mobile" class="ma-2">
      <v-card-title>Help us</v-card-title>
      <v-card-item class="d-flex justify-center">
        Dear players, Let's shape the future of Video Games Records together by contributing today. <br />
        Every donation, no matter the size, makes a significant impact.<br />
        Join us in this exciting venture and invest in the continuity of our community by making a donation now.<br />
        Thank you for your generosity!
      </v-card-item>
      <v-card-actions>
        <v-btn href="https://streamlabs.com/videogamesrecords/tip" target="_blank">Make a donation</v-btn>
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
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";
import SerieCard from "@/components/vgr/serie/Card.vue";

export default {
  mixins: [Security],
  name: 'GameAside',
  props: ['game'],
  components: {SerieCard, GroupSwitch, ChartSwitch, MajPlatform},
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
