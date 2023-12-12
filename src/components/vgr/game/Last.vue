<template>
  <div class="home-games__last">
    <h2>{{ $t('game.last.title') }}</h2>

    <div v-for="game in games" :data-position="game.position" :key="game.id" class="home-games__item">
      <game-picture v-bind:game="game"/>
      <platform-list v-bind:platforms="game.platforms" v-bind:multi="true"/>
    </div>

  </div>
</template>

<script>
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from "@/components/vgr/platform/List.vue";

export default {
  name: 'GameLast',
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
        '&groups[]=game.platforms&groups[]=platform.read&itemsPerPage=3&status=' +
        this.$GAME_STATUS_ACTIVE, {useCache: true})
        .then(response => {
          this.games = response.data['hydra:member']
        })
  }
};
</script>


