<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {

  name: 'PlayerGameMain',
  components: {},
  data() {
    return {
      playerGame: {
        game: {
          id: null,
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
          '&pagination=false&player=' + this.$route.params.idPlayer + '&game=' + this.$route.params.idGame
      )
          .then(response => {
            this.playerGame = response.data['hydra:member'][0]
          })
    }
  },
};
</script>
