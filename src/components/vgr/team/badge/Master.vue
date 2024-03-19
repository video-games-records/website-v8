<template>
  <div>
    <h3>{{ $t('badge.type.master') }}</h3>

    <div class="d-flex flex-wrap">
      <div v-for="item in badges" :data-position="item.position" :key="item['@id']" @click="showBadge(item.badge)" class="ma-1">
        <badge v-bind:badge="item.badge" v-bind:createdAt="item.createdAt"></badge>
      </div>
    </div>


    <v-dialog width="800" v-model="dialog">
      <v-card class="pa-3">
        <v-card-title>
          {{ $t('global.masterBadge') }} <game v-bind:game="teamGame.game" v-bind:show-link="false"></game>
        </v-card-title>
        <v-card-item>
          <v-row>
            <v-col cols="4">
              <game-picture v-bind:game="teamGame.game"/>
            </v-col>
            <v-col cols="8">
              <p>{{ $t('badge.gives') }}
                <team v-bind:team="team"/>
              </p>
              <ul>
                <li><strong>{{ number(badge.value) }}</strong> {{ $t('global.badgePoints') }}</li>
                <li><strong>{{ teamGame.pointGame }}</strong> {{ $t('global.gamePoints') }}</li>
                <li><strong>{{ teamGame.pointChart }}</strong> {{ $t('global.recordPoints') }}</li>
              </ul>
            </v-col>
            <v-col cols="12">
              <platform-list v-if="teamGame.game.id" v-bind:platforms="teamGame.game.platforms"></platform-list>
            </v-col>
            <v-col cols="12">
              <span class="h3">{{ $t('badge.history.title') }}</span>
            </v-col>
            <v-col cols="12">
              <ul>
                <li v-for="item in histo" :data-position="item.position" :key="item.id">
                  <span v-if="item.endedAt == null">
                    {{ $t('badge.history.earnedBy') }} <team v-bind:team="item.team"></team>
                    {{ $t('badge.history.since') }} <my-date v-bind:date="item.createdAt"
                                                             v-bind:options="{ month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute:'numeric' }"></my-date>
                  </span>
                  <span v-else>
                    {{ $t('badge.history.earnedBy') }} <team v-bind:team="item.team"></team>
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
  </div>
</template>

<script>
import Badge from '@/components/vgr/badge/Badge';
import MyDate from "@/components/tools/Date";
import Team from "@/components/vgr/team/Team";
import Game from "@/components/vgr/game/Game";
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from '@/components/vgr/platform/List';
import Date from "@/mixins/Date.vue";
import Filters from "@/mixins/Filters.vue";


export default {
  mixins:[Date, Filters],
  name: 'TeamBadgeMaster',
  props: {
    'idTeam': {
      require: true,
    },
    'team': {
      require: true,
      type: Object,
    },
  },
  components: {
    'my-date': MyDate,
    Badge,
    Team,
    Game,
    GamePicture,
    PlatformList
  },
  data() {
    return {
      dialog: false,
      badge: {},
      badges: [],
      teamGame: {
        game: {
          id: null,
          slug: ''
        },
      },
      histo: null,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get(
          '/api/team_badges?pagination=false&badge.type=Master&order[mbOrder]=ASC'
          + '&team=' + this.idTeam + '&ended_at[after]=' + this.getNow)
          .then(response => {
            this.badges = response.data['hydra:member'];
          })
    },
    showBadge(badge) {
      this.dialog = true;
      this.badge = badge;
      this.axios.get(
          '/api/team_badges?groups[]=teamBadge.read&groups[]=teamBadge.team&groups[]=team.read.mini'
          + '&pagination=false&badge=' + badge.id + '&order[createdAt]=ASC')
          .then(response => {
            this.histo = response.data['hydra:member'];
          });

      this.axios.get(
          '/api/team_games?groups[]=teamGame.pointChart&groups[]=teamGame.game&groups[]=game.read.mini'
          + '&groups[]=game.platforms&groups[]=platform.read'
          + '&pagination=false&game.badge=' + badge.id + '&team=' + this.idTeam)
          .then(response => {
            this.teamGame = response.data['hydra:member'][0];
          });
    },
  },
};
</script>