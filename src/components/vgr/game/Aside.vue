<template>
  <div>
    <group-switch v-if="canSwitchGroup"></group-switch>
    <chart-switch v-if="canSwitchChart"></chart-switch>
    <maj-platform v-bind:game=getGame v-if="!this.$vuetify.display.mobile && hasRolePlayer && (getGame.platforms.length > 1)"></maj-platform>
    <v-card v-if="!this.$vuetify.display.mobile">
      <v-card-title>TEST</v-card-title>
      <v-card-item>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
      </v-card-item>
      <v-card-actions>
        <v-btn>Click me</v-btn>
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
      return useBreadcrumbsStore().getLevel > 1;
    },
    canSwitchChart() {
      return useBreadcrumbsStore().getLevel > 2;
    }
  },
};
</script>