<template>
  <v-card variant="outlined">
    <v-card-title class="bg-primary">{{ $t('game.last.title') }}</v-card-title>
    <v-card-item>
      <v-progress-linear v-if="games.length === 0" indeterminate color="yellow-darken-2"></v-progress-linear>
      <v-row>
        <v-col cols="6" md="6" lg="3" v-for="game in games" :data-position="game.position" :key="game.id">
          <game-picture v-bind:game="game"/>
          <platform-list v-bind:platforms="game.platforms" v-bind:multi="true"/>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<script>
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from "@/components/vgr/platform/List.vue";

export default {
  name: 'GameLastPublished',
  components: {
    PlatformList,
    GamePicture
  },
  data() {
    return {
      games: []
    };
  },
  created() {
    this.axios.get('/api/games?pagination=1&order[publishedAt]=DESC&groups[]=game:read' +
        '&groups[]=game:platforms&groups[]=platform:read&itemsPerPage=4&status=' +
        this.$GAME_STATUS_ACTIVE, {enableCache: true})
        .then(response => {
          this.games = response.data['hydra:member']
        })
  }
};
</script>


