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
              <player v-bind:player="player"/>
            </v-col>
            <v-col cols="12">
              <span class="h3">{{ $t('badge.history.title') }}</span>
            </v-col>
            <v-col cols="12">
              <ul>
                <li v-for="item in histo" :data-position="item.position" :key="item.id">
                  <span v-if="item.endedAt == null">
                    {{ $t('badge.history.earnedBy') }} <player
                      v-bind:player="item.player">></player>
                    {{ $t('badge.history.since') }} <my-date v-bind:date="item.createdAt"
                                                             v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'numeric' }"></my-date>
                  </span>
                  <span v-else>
                    {{ $t('badge.history.earnedBy') }} <player v-bind:player="item.player"></player>
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
import Player from "@/components/vgr/player/Player";
import SeriePicture from "@/components/vgr/serie/Picture";
import Filters from "@/mixins/Filters.vue";
import Date from "@/mixins/Date.vue";

export default {
  mixins:[Filters, Date],
  name: 'PlayerBadgeSerie',
  props: {
    'idPlayer': {
      require: true,
    },
    'player': {
      require: true,
      type: Object,
    },
  },
  components: {
    'my-date': MyDate,
    Badge, Player, SeriePicture
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
          '/api/player_badges?pagination=false&badge.type=Serie&order[mbOrder]=ASC'
          + '&player=' + this.idPlayer + '&endedAt[after]=' + this.getNow
          + '&groups[]=player-badge:read&groups[]=player-badge:badge&groups[]=badge:read'
          + '&groups[]=badge:serie&groups[]=serie:read')
          .then(response => {
            this.badges = response.data['hydra:member'];
          })
    },
    showBadge(badge) {
      this.dialog = true;
      this.badge = badge;
      this.axios.get(
          '/api/player_badges?groups[]=player-badge:read&groups[]=player-badge:player&groups[]=player:read'
          + '&pagination=false&badge=' + badge.id + '&order[createdAt]=ASC')
          .then(response => {
            this.histo = response.data['hydra:member'];
          });
    },
  },
};
</script>
