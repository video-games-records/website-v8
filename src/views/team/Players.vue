<template>
  <div class="d-flex flex-wrap">
    <div v-for="player in players" :data-position="player.position" :key="player.id" class="ma-4">
      <avatar size="100px" v-bind:player="player"/>
      <router-link :to="{ name: 'PlayerIndex', params: { idPlayer: player.id, slugPlayer: player.slug }}" :title="player.pseudo" class="d-flex justify-center">{{ player.pseudo }}</router-link>
    </div>
  </div>
</template>

<script>
import Player from '@/components/vgr/player/Player.vue';
import avatar from "@/components/vgr/player/Avatar.vue";

export default {
  name: 'TeamPlayers',
  components: {
    avatar,
    Player
  },
  data() {
    return {
      players: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios.get(
          '/api/teams/' + this.$route.params.idTeam + '/players')
          .then(response => {
            this.players = response.data['hydra:member'];
          })
    }
  }
};
</script>
