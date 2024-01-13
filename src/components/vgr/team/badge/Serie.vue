<template>
  <v-sheet>
    <h3 class="h3">{{ $t('badge.type.serie') }}</h3>

    <div class="d-flex flex-wrap">
      <div v-for="item in badges" :data-position="item.position" :key="item['@id']" @click="showBadge(item.badge)" class="ma-1">
        <badge v-bind:badge="item.badge" v-bind:createdAt="item.createdAt"></badge>
      </div>
    </div>

    <v-dialog width="800" v-model="dialog">
      <v-card class="pa-3">
        <v-card-title>
          {{ $t('global.serieBadge') }}
        </v-card-title>
        <v-card-item>
          <v-row>
            <v-col cols="4">
              <serie-picture v-bind:serie="badge.serie"/>
            </v-col>
            <v-col cols="8">
              <team v-bind:team="team"/>
            </v-col>
            <v-col cols="12">
              <span class="h3">{{ $t('badge.history.title') }}</span>
            </v-col>
            <v-col cols="12">
              <ul>
                <li v-for="item in histo" :data-position="item.position" :key="item.id">
                  <span v-if="item.endedAt == null">
                    {{ $t('badge.history.earnedBy') }} <team v-bind:team="item.team">></team>
                    {{ $t('badge.history.since') }} <my-date v-bind:date="item.createdAt"
                                                             v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'numeric' }"></my-date>
                  </span>
                  <span v-else>
                    {{ $t('badge.history.earnedBy') }} <team v-bind:team="item.team">></team>
                    {{ $t('badge.history.between') }} <my-date v-bind:date="item.createdAt"
                                                               v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'numeric' }"></my-date>
                    {{ $t('badge.history.and') }} <my-date v-bind:date="item.endedAt"
                                                           v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'numeric' }"></my-date>
                  </span>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import Badge from '@/components/vgr/badge/Badge.vue';
import MyDate from "@/components/tools/Date";
import SeriePicture from "@/components/vgr/serie/Picture";
import Team from "@/components/vgr/team/Team.vue";
import Date from "@/mixins/Date.vue";
import Player from "@/components/vgr/player/Player.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins:[Date, Filters],
  name: 'TeamBadgeSerie',
  props: {
    'idTeam': {
      require: true,
    },
    'team': {
      require: true,
      type: Object,
    }
  },
  components: {
    Player,
    'my-date': MyDate,
    Badge,
    Team,
    SeriePicture
  },
  data() {
    return {
      dialog: false,
      badges: [],
      badge: {},
      histo: null,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get(
          '/api/team_badges?pagination=false&badge.type=Serie&order[mbOrder]=ASC'
          + '&team=' + this.idTeam + '&ended_at[after]=' + this.getNow
          + '&groups[]=teamBadge.read&groups[]=teamBadge.badge&groups[]=badge.read'
          + '&groups[]=badge.serie&groups[]=serie.read')
          .then(response => {
            this.badges = response.data['hydra:member'];
          })
    },
    showBadge(badge) {
      this.dialog = true;
      this.badge = badge;
      this.axios.get(
          '/api/team_badges?groups[]=teamBadge.read&groups[]=teamBadge.player&groups[]=team.read.mini'
          + '&pagination=false&badge=' + badge.id + '&order[createdAt]=ASC')
          .then(response => {
            this.histo = response.data['hydra:member'];
          });
    },
  },
};
</script>
