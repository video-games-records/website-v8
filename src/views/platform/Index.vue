<template>
  <v-row>
    <v-col v-if="!this.$vuetify.display.mobile" cols="12" order="1">
      {{ getPlatform.libPlatform }}
    </v-col>
    <v-col cols="12" order="2" md="12" lg="3" order-lg="3">
      <v-sheet v-if="this.$vuetify.display.mobile">
        <v-select
            v-model="platform"
            :items="this.platforms"
            item-title="libPlatform"
            @update:modelValue="onChange()"
            return-object
        >
        </v-select>
      </v-sheet>
      <v-sheet v-else>
        <div class="d-flex justify-center">{{ $t('platform.choose') }}</div>
        <platform-list v-bind:platforms="platforms" :route=null></platform-list>
      </v-sheet>
    </v-col>
    <v-col cols="12" order="3" md="12" lg="9" order-lg="1">
      <v-tabs v-model="tab" class="bg-primary">
        <v-tab value="leaderboard">Leaderboard</v-tab>
        <v-tab value="games">Games</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="leaderboard">
            <v-table class="leaderboard">
              <caption class="screen-reader-text">{{ $t('leaderboard.recordPoints.caption') }}</caption>
              <thead>
              <tr>
                <th scope="col">{{ $t('global.rank') }}</th>
                <th scope="col">{{ $t('global.nickname') }}</th>
                <th scope="col">{{ $t('global.platformPoints') }}</th>
                <th scope="col">{{ $t('global.scores') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in leaderboard" :data-rank="item.rankPointPlatform" :key="item.id"
                  :class="[isAuthenticated && getAuthenticatedPlayer.id === item.id ? 'player--me' : 'player' ]">
                <td>{{ item.rankPointPlatform }}</td>
                <td>
                  <country v-bind:country="item.player.country"></country>
                  <player v-bind:player="item.player" v-bind:show-avatar="true"></player>
                </td>
                <td :data-header="$t('global.platformPoints')">
                  {{ number(item.pointPlatform) }}
                </td>
                <td :data-header="$t('global.scoresLowercase')">
                  {{ number(item.nbChart) }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-window-item>

          <v-window-item value="games">
            <gameList ref="gameList" v-bind:callback=getCallBack v-bind:display-platform="false" :display-nb="true"
                      v-bind:active-order-by="true"></gameList>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import GameList from '@/components/vgr/game/List.vue';
import Filters from "@/mixins/Filters.vue";
import Player from "@/components/vgr/player/Player.vue";
import Game from "@/components/vgr/game/Game.vue";
import SerieCard from "@/components/vgr/serie/Card.vue";
import PlatformList from "@/components/vgr/platform/List.vue";
import Country from "@/components/country/Country.vue";
import { useAppStore } from '@/store/app';
import Security from "@/mixins/Security.vue";

export default {
  mixins: [Filters, Security],
  name: 'PlatformIndex',
  components: {Country, PlatformList, SerieCard, Game, Player, GameList},
  data() {
    return {
      selected: null,
      tab: null,
      platform: {},
      platforms: [],
      leaderboard: []
    };
  },
  computed: {
    getCallBack() {
      return '/api/games?pagination=false&status' + this.$GAME_STATUS_ACTIVE + '&platforms=' + this.$route.params.id;
    },
    getPlatform() {
      return useAppStore().getPlatform;
    },
  },
  created() {
    this.load();

    this.axios.get('/api/platforms?pagination=false', {useCache: true})
        .then(response => {
          this.platforms = response.data['hydra:member']
        })
  },
  watch: {
    '$route.params.id' () {
      this.load();
    },
  },
  methods: {
    load() {
      document.title = this.getPlatform.libPlatform + ' - ' + import.meta.env.VITE_APP_TITLE;
      this.axios.get('/api/platforms/' + this.$route.params.id)
          .then(response => {
            this.platform = response.data;
            useAppStore().setPlatform(response.data);
          })
      this.axios.get('/api/platforms/' + this.$route.params.id + '/player-ranking-point?maxRank=100')
          .then(response => {
            this.leaderboard = response.data['hydra:member']
          })
    },
  }
};
</script>
