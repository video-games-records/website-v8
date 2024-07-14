<template>
  <div>
    <group-switch v-if="canSwitchGroup"></group-switch>

    <chart-switch v-if="canSwitchChart"></chart-switch>

    <maj-platform v-bind:game=getGame v-if="!this.$vuetify.display.mobile && hasRolePlayer && (getGame.platforms.length > 1)"></maj-platform>

    <v-card v-if="!this.$vuetify.display.mobile && getGame && getGame.forum" class="ma-2" variant="outlined">
      <v-card-title class="bg-primary">{{ $t('game.forum') }}</v-card-title>
      <v-card-item>
        <router-link :to="{ name: 'GameForumIndex' , params: { idForum: getGame.forum.id, slugForum: getGame.forum.slug }}">
          {{ getGame.forum.libForum }}
        </router-link>
      </v-card-item>
    </v-card>

    <v-card v-if="!this.$vuetify.display.mobile" class="ma-2" variant="outlined">
      <v-card-title class="bg-primary">{{ $t('game.rules.title') }}</v-card-title>
      <v-card-item>
        <div v-if="getGame.rules && getGame.rules.length > 0">
          <div v-for="rule in getGame.rules" :data-position="rule.position" :key="rule.id" v-html="rule.text" />
        </div>
        <div v-else>{{ $t('game.rules.none') }}</div>
        <router-link :to="{ name: 'Rules'}">{{ $t('game.rules.seeGeneral') }}</router-link>
      </v-card-item>
    </v-card>

    <v-card v-if="getGame.serie && !this.$vuetify.display.mobile" class="ma-2" variant="outlined">
      <v-card-title class="bg-primary">Série</v-card-title>
      <v-card-item class="d-flex justify-center">
        <serie-card :serie="getGame.serie" />
      </v-card-item>
    </v-card>


    <!-- blocRight -->
    <Adsense
        data-ad-client="ca-pub-1465216138455560"
        data-ad-slot="1120943067">
    </Adsense>


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

export default {
  mixins: [Security],
  name: 'GameAside',
  props: ['game'],
  components: {SerieCard, GroupSwitch, ChartSwitch, MajPlatform},
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
