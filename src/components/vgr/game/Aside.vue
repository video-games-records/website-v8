<template>
  <v-sheet>
    <group-switch v-if="canSwitchGroup"></group-switch>
    <chart-switch v-if="canSwitchChart"></chart-switch>
    <maj-platform v-bind:game=getGame v-if="!this.$vuetify.display.mobile && hasRolePlayer && (getGame.platforms.length > 1)"></maj-platform>
    <v-card v-if="!this.$vuetify.display.mobile" class="ma-1">
      <v-card-title>{{ $t('game.rules.title') }}</v-card-title>
      <v-card-item>
        <div v-if="getGame.rules && getGame.rules.length > 0">
          <div v-for="rule in getGame.rules" :data-position="rule.position" :key="rule.id" v-html="rule.text" />
        </div>
        <div v-else>{{ $t('game.rules.none') }}</div>
        <router-link :to="{ name: 'Rules'}">{{ $t('game.rules.seeGeneral') }}</router-link>
      </v-card-item>
    </v-card>
    <v-card v-if="!this.$vuetify.display.mobile" class="ma-1">
      <v-card-title>TEST</v-card-title>
      <v-card-item>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
      </v-card-item>
      <v-card-actions>
        <v-btn>Click me</v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import GroupSwitch from '@/components/vgr/group/Switch.vue';
import ChartSwitch from '@/components/vgr/chart/Switch.vue';

import MajPlatform from '@/components/vgr/playerChart/form/MajPlatform.vue'
import Security from "@/mixins/Security.vue";
import {useAppStore} from "@/store/app";
import {useBreadcrumbsStore} from "@/store/base/breadcrumbs";

export default {
  mixins: [Security],
  name: 'GameAside',
  props: ['game'],
  components: {GroupSwitch, ChartSwitch, MajPlatform},
  computed: {
    getGame() {
      return useAppStore().getGame;
    },
    canSwitchGroup() {
      const routes = ['GroupIndex', 'GroupSubmit', 'ChartIndex', 'ChartSubmit'];
      return routes.indexOf(this.$route.name) !== -1;
    },
    canSwitchChart() {
      const routes = ['ChartIndex', 'ChartSubmit'];
      return routes.indexOf(this.$route.name) !== -1;
    }
  },
};
</script>
