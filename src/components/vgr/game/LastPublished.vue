<template>
  <v-card>
    <v-card-title>{{ $t('game.last.title') }}</v-card-title>
    <v-card-item>
      <v-row>
      <div v-for="game in games" :data-position="game.position" :key="game.id">
        <v-col cols="12">
          <game-picture v-bind:game="game"/>
          <platform-list v-bind:platforms="game.platforms" v-bind:multi="true"/>
        </v-col>
      </div>
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
    this.axios.get('/api/games?pagination=1&order[publishedAt]=DESC&groups[]=game.read.mini' +
        '&groups[]=game.platforms&groups[]=platform.read&itemsPerPage=4&status=' +
        this.$GAME_STATUS_ACTIVE, {useCache: true})
        .then(response => {
          this.games = response.data['hydra:member']
        })
  }
};
</script>


