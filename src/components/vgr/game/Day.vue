<template>
  <v-card variant="outlined" v-if="game !== null">
    <v-card-title class="bg-primary">
      {{ $t('game.day') }}
    </v-card-title>
    <v-card-item>
      <game-picture v-bind:game="game"/>
      <platform-list :platforms="game.platforms" v-bind:multi="true"/>
    </v-card-item>
  </v-card>
</template>

<script>
import GamePicture from "@/components/vgr/game/Picture";
import PlatformList from "@/components/vgr/platform/List.vue";

export default {
  name: 'GameDay',
  components: {
    PlatformList,
    GamePicture
  },
  data() {
    return {
      game: null,
    };
  },
  computed: {
    now: function () {
      function pad(s) {
        return (s < 10) ? '0' + s : s;
      }

      let d = new Date();
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    }
  },
  created() {
    this.axios.get('/api/game_days?day[after]=' + this.now, {enableCache: true})
        .then(response => {
          if (response.data['hydra:totalItems'] >= 1) {
            this.game = response.data['hydra:member'][0].game;
          }
        })
  },
};
</script>
