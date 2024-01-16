<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import Security from "@/mixins/Security.vue";

export default {
  mixins: [Security],
  name: 'AcountGameMain',
  components: {},
  data() {
    return {
      playerGame: {
        game: {
          name: '',
        }
      },
    };
  },
  created() {
    this.load();
  },
  watch: {
    '$route.params.idGame'() {
      this.load();
      this.$forceUpdate();
    }
  },
  methods: {
    load() {
      this.axios.get('' +
          '/api/player_games?groups[]=game.read.mini&groups[]=game.stats&groups[]=playerGame.game' +
          '&groups[]=playerGame.proof&groups[]=game.platforms&groups[]=platform.read&groups[]=playerGame.proof' +
          '&pagination=false&player=' + this.getAuthenticatedPlayer.id + '&game=' + this.$route.params.idGame
      )
          .then(response => {
            this.playerGame = response.data['hydra:member'][0]
          })
    }
  },
};
</script>
