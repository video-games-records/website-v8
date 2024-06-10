<template>
  <v-row>
    <v-col cols="12">
      <v-select
        v-model="serie"
        :items="this.series"
        item-title="name"
        @update:modelValue="onChange()"
        return-object
      >
      </v-select>
    </v-col>
    <v-col cols="12" v-if="!this.$vuetify.display.mobile">
      <serie-card :serie=this.serie></serie-card>
    </v-col>
    <v-col>
      <v-tabs v-model="tab" class="bg-primary">
        <v-tab value="leaderboard">Leaderboard</v-tab>
        <v-tab value="games">Games</v-tab>
        <v-tab value="description">Description</v-tab>
      </v-tabs>

      <v-card-text class="pa-0">
        <v-window v-model="tab">
          <v-window-item value="leaderboard">
            <v-table>
              <caption class="screen-reader-text">{{ $t('leaderboard.recordPoints.caption') }}</caption>
              <thead>
              <tr>
                <th class="center" scope="col">#</th>
                <th scope="col">{{ $t('global.nickname') }}</th>
                <th class="right" scope="col">{{ $t('global.points') }}</th>
                <th class="right" scope="col">{{ $t('global.scores') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in leaderboard" :data-rank="item.rankPointChart" :key="item.id"
                  :class="[isAuthenticated && getAuthenticatedPlayer.id === getPlayerId(item) ? 'player--me' : 'player' ]">
                <td class="pl-2 center">{{ item.rankPointChart }}</td>
                <td class="pa-0">
                  <country v-bind:country="item.player.country"></country>
                  <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
                </td>
                <td class="pr-3 right">
                  {{ number(item.pointChart) }}
                </td>
                <td class="pr-3 right">
                  {{ number(item.nbChart) }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="games">
            <v-table>
              <caption class="screen-reader-text">{{ $t('game.list.caption') }}</caption>
              <thead>
              <tr>
                <th scope="col">{{ $t('global.game') }}</th>
                <th scope="col">{{ $t('global.platforms') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in this.games" :data-position="item.position" :key="item.id">
                <td>
                  <game v-bind:game="item"></game>
                </td>
                <td>
                  <platform-list v-bind:platforms="item.platforms"></platform-list>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="description">
            <v-sheet v-html="this.serie.description" class="pa-4 ckeditor"></v-sheet>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import Country from '@/components/country/Country.vue';
import Security from "@/mixins/Security.vue";
import Game from '@/components/vgr/game/Game.vue';
import PlatformList from '@/components/vgr/platform/List.vue';
import {useAppStore} from "@/store/app";
import SerieCard from "@/components/vgr/serie/Card.vue";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins: [Security, Filters],
  name: 'SerieIndex',
  components: {SerieCard, Country, Player, Game, PlatformList},
  data() {
    return {
      selected: null,
      tab: null,
      serie: {
        id: null,
        slug: '',
        name: '',
      },
      leaderboard: [],
      series: [],
      games: []
    };
  },
  created() {
    this.load();
    this.axios.get('/api/series?pagination=false&order[libSerie]=ASC&status=ACTIVE')
        .then(response => {
          this.series = response.data['hydra:member']
        })
  },
  watch: {
    '$route'() {
      if (this.$route.params.id !== undefined) {
        this.load();
      }
    }
  },
  methods: {
    load() {
      // Serie
      this.axios.get('/api/series/' + this.$route.params.id)
          .then(response => {
            this.serie = response.data;
            document.title = this.serie.name + ' - ' + import.meta.env.VITE_APP_TITLE;
            useAppStore().setSerie(response.data);
          })
      // leaderboard
      this.axios.get('/api/series/' + this.$route.params.id + '/player-ranking-points?maxRank=100')
          .then(response => {
            this.leaderboard = response.data['hydra:member']
          })
      // games
      this.axios.get('/api/games?serie=' + this.$route.params.id + '&status=ACTIVE&groups[]=game.read&groups[]=game.platforms&groups[]=platform.read')
          .then(response => {
            this.games = response.data['hydra:member']
          })
    },
    getPlayerId(item) {
      if (item.player) {
        return item.player.id;
      } else {
        return item.id;
      }
    },
    onChange () {
      this.$router.push({ name: 'SerieIndex', params: {id : this.serie.id, slugSerie: this.serie.slug}});
    },
  },
};
</script>
