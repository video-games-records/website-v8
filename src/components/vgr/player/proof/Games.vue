<template>
  <h3 class="ma-2">{{ $t('proof.byGame') }}</h3>
  <v-table>
    <thead>
    <tr>
      <th>{{ $t('global.game') }}</th>
    </tr>
    </thead>
    <v-progress-linear v-if="playerGames.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
    <tbody>
    <tr v-for="playerGame in playerGames" :key="playerGame.id">
      <td class="hidden-md-and-down">
        <game-picture v-bind:game="playerGame.game"/>
      </td>
      <td>
        <router-link
            :to="{ name: getGameRoute, params: { idGame: playerGame.game.id, slugGame: playerGame.game.slug }}">
        {{
          playerGame.game.name
        }}
        </router-link>
        <platform-list v-bind:platforms="playerGame.game.platforms"></platform-list>
      </td>
      <td>
        <ul>
          <li v-if="isAccountRoute === false">
              <strong>{{ number(playerGame.game.nbChart) }}</strong>
              <span v-if="this.$vuetify.display.mobile">&nbsp; scores</span>
              <span v-else>{{ $t('game.score.total', playerGame.game.nbChart) }}</span>
          </li>
          <li v-for="item in playerGame.statuses" :key="item.id">
            <span :title="item.status.name" :class="item.status.class ">
                <span class="screen-reader-text">{{ item.status.name }}</span>
            </span>&nbsp;
            <span>
              <strong>{{ number(item['nb']) }}</strong> <span class="hidden-sm-and-down">{{ $t('score.status.' + item.status.class, item['nb']) }}</span>
            </span>
          </li>
        </ul>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
<script>

import Game from "@/components/vgr/game/Game";
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from "@/components/vgr/platform/List";
import Filters from "@/mixins/Filters.vue";

export default {
  mixins:[Filters],
  name: 'PlayerProofGames',
  components: {Game, GamePicture, PlatformList},
  props: {
    'idPlayer': {
      require: true,
    },
  },
  data() {
    return {
      playerGames: [],
      nbGame: 0,
    };
  },
  computed: {
    isAccountRoute() {
      return this.$route.name === 'ProofIndex';
    },
    getGameRoute() {
      if (this.isAccountRoute){
        return 'ProofGameProofs'
      } else {
        return 'PlayerGameProofs'
      }
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get('/api/players/' + this.idPlayer + '/game-stats')
          .then(response => {
            this.nbGame = response.data['hydra:totalItems'];
            this.playerGames= response.data['hydra:member'];
          });
    }
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
